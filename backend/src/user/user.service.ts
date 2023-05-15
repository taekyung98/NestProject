import {BadRequestException, Injectable} from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto'
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService) {}

    private hashingPassword = (userPwd: string) => {
        return crypto
            .createHash('sha512')
            .update(userPwd)
            .digest('hex')
            .toString();
    };


    async signUp(signUpUserDto: SignUpUserDto): Promise<{ result: boolean }> {
        const { userEmail,userId, userPwd } = signUpUserDto;

        const emailRegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*$/;
        if (userEmail.trim().length === 0 || !emailRegExp.test(userEmail)) {
            throw new BadRequestException('유효하지 않는 이메일 주소입니다.');
        }

        const pwdRegex =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if (!pwdRegex.test(userPwd)) {
            throw new BadRequestException(
                '8~16자의 영문, 숫자, 특수문자 모두 조합한 형식으로 입력해주세요.',
            );
        }

        signUpUserDto.userPwd = this.hashingPassword(userPwd);
        signUpUserDto.signDate = new Date();
        const signedUser = new this.userModel(signUpUserDto);
        await signedUser.save();

        return {
            result: true,
        };
    }

    async validateUser(userId, userPwd) {
        const pwd = this.hashingPassword(userPwd);
        const user = this.userModel.findOne({ userId, userPwd: pwd }).lean();
        if(user){
            return user;
        }else{
            throw new BadRequestException('아이디 혹은 비밀번호가 틀렸습니다.');
        }
        return null;
    }

    async getByUser({ userId }: { userId: string }) {
        return this.userModel.findOne({ userId }).lean();
    }

    async sign(payload: any) {
        try {
            const token = this.jwtService.sign(payload);
            return token;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async login(payload){
        const token = this.jwtService.sign(payload);
        return {
            accessToken: token,
            path:'/',
            maxAge: Number('300') *
                1000,
        }
    }

}
