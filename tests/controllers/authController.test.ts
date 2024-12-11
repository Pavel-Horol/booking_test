import request from 'supertest';
import express from 'express';
import router from '../../src/routes/authRouter';
import authService from '../../src/services/authService';

// Mock authService
jest.mock('../services/authService');

const app = express();
app.use(express.json());
app.use('/auth', router);

describe('AuthController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /auth/login', () => {
        it('should return accessToken on successful login', async () => {
            (authService.login as jest.Mock).mockResolvedValue({
                accessToken: 'mockedAccessToken',
            });

            const response = await request(app)
                .post('/auth/login')
                .send({ username: 'testuser', password: 'testpassword' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ accessToken: 'mockedAccessToken' });
            expect(authService.login).toHaveBeenCalledWith('testuser', 'testpassword');
        });

        it('should return 400 if user does not exist', async () => {
            (authService.login as jest.Mock).mockRejectedValue({
                status: 400,
                message: 'User does not exist',
            });

            const response = await request(app)
                .post('/auth/login')
                .send({ username: 'testuser', password: 'testpassword' });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'User does not exist');
        });
    });

    describe('POST /auth/registration', () => {
        it('should return accessToken on successful registration', async () => {
            (authService.registration as jest.Mock).mockResolvedValue({
                accessToken: 'mockedAccessToken',
            });

            const response = await request(app)
                .post('/auth/registration')
                .send({ username: 'newuser', password: 'newpassword' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ accessToken: 'mockedAccessToken' });
            expect(authService.registration).toHaveBeenCalledWith('newuser', 'newpassword');
        });

        it('should return 400 if user already exists', async () => {
            (authService.registration as jest.Mock).mockRejectedValue({
                status: 400,
                message: 'User already exists',
            });

            const response = await request(app)
                .post('/auth/registration')
                .send({ username: 'existinguser', password: 'password' });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'User already exists');
        });
    });
});
