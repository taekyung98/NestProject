import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "@src/user/entities/user.entity";
import {Model} from "mongoose";

@Injectable()
export class AuthService {
    constructor(

    ) {}
/*
    private hashingPassword = (userPwd: string) => {
        return crypto
            .createHash('sha512')
            .update(userPwd)
            .digest('hex')
            .toString();
    };

    async validateUser(userEmail: string, userPwd: string): Promise<any> {
        const user = await this.userService.getByUser({userEmail});
        if (user && user.userPwd === userPwd) {
            const { userPwd, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any){
        const payload = { username: user.username, sub:user.userEmail}
        return{
            access_token: this.jwtService.sign(payload)
        }
    }*/

}