import prisma from "../database"
import { ApiError } from "../exceptions/errorApi"
import bcrypt from 'bcrypt'
import tokenService from "./tokenService"

class AuthService {
    private async findUser(username: string) {
        const user = await prisma.user.findUnique({
            where: {username}
        })
        if (!user) return null
        return user
    }    

    async login(username: string, password: string) {
        const user = await this.findUser(username)
        if(!user) throw ApiError.BadRequest("User does not exist")
            
        const isPasswordMatch = bcrypt.compare(password, user.password)
        if (!isPasswordMatch) throw ApiError.BadRequest("Password incorrect!")
            
        const accessToken = tokenService.generate({id: user.id})
        return accessToken
    }

    async registration(username: string, password: string) {
        const user = await this.findUser(username)
        if(user) throw ApiError.BadRequest("User already exist")
            
        const hashedPassword = await  bcrypt.hash(password, 12)
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })     
        const accessToken = tokenService.generate({id: newUser.id})
        return accessToken
    }

}

export default new AuthService ()