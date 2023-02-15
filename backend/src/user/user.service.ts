import { Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async signUp(signUpUserDto: SignUpUserDto): Promise<{ result: boolean }> {
        //const { userName, userEmail, userPwd } = signUpUserDto;
        signUpUserDto.signDate = new Date();
        const signedUser = new this.userModel(signUpUserDto);
        await signedUser.save();

        return {
            result: true,
        };
    }
}
