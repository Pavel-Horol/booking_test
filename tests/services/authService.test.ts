import bcrypt from 'bcrypt';
import prisma from '../../src/database';
import tokenService from '../../src/services/tokenService';
import authService from '../../src/services/authService';

jest.mock('../../src/database');
jest.mock('bcrypt');
jest.mock('../../src/services/tokenService');
jest.mock('../../src/services/authService');


describe('AuthService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should return accessToken if credentials are correct', async () => {
            const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };

            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (tokenService.generate as jest.Mock).mockReturnValue('mockedAccessToken');

            const result = await authService.login('testuser', 'password');

            expect(result).toEqual({ accessToken: 'mockedAccessToken' });
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: 'testuser' } });
            expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
            expect(tokenService.generate).toHaveBeenCalledWith({ id: 1 });
        });

        it('should throw an error if user does not exist', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(authService.login('testuser', 'password')).rejects.toThrow('User does not exist');
        });
    });

    describe('registration', () => {
        it('should create a new user and return accessToken', async () => {
            const mockNewUser = { id: 2, username: 'newuser', password: 'hashedpassword' };

            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
            (prisma.user.create as jest.Mock).mockResolvedValue(mockNewUser);
            (tokenService.generate as jest.Mock).mockReturnValue('mockedAccessToken');

            const result = await authService.registration('newuser', 'password');

            expect(result).toEqual({ accessToken: 'mockedAccessToken' });
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: 'newuser' } });
            expect(bcrypt.hash).toHaveBeenCalledWith('password', 12);
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: { username: 'newuser', password: 'hashedpassword' },
            });
            expect(tokenService.generate).toHaveBeenCalledWith({ id: 2 });
        });

        it('should throw an error if user already exists', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, username: 'existinguser' });

            await expect(authService.registration('existinguser', 'password')).rejects.toThrow('User already exists');
        });
    });
});
