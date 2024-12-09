import * as jwt from 'jsonwebtoken'

class TokenService {
    private secret: string =  process.env.JWT_ACCESS_SECRET!   

    generate(payload: any) {
        const accessToken = jwt.sign(
            payload,
            this.secret,
            {expiresIn: process.env.JWT_ACCESS_EXPIRES!}
        )
        return accessToken
    }

    validate(token: string) {
        try{
            return jwt.verify(token, this.secret, {ignoreExpiration: false}) as jwt.JwtPayload
        } catch (e){
            console.log(e)
            return null
        }
    }
}

export default new TokenService ()