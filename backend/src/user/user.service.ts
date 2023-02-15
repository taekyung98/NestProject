import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { throws } from 'assert';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async signUp(signUpUserDto: SignUpUserDto): Promise<{ result: boolean }> {
        const { userName, userEmail, userPwd } = signUpUserDto;

        const emailRegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*$/;
        if (userEmail.trim().length === 0 || !emailRegExp.test(userEmail)) {
            throw new BadRequestException('유효하지 않는 이메일 주소입니다.');
            console.log(BadRequestException);
        }

        signUpUserDto.signDate = new Date();
        const signedUser = new this.userModel(signUpUserDto);
        await signedUser.save();

        return {
            result: true,
        };
    }
}