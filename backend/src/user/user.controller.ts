import {Body, Controller, Get, Post, Req, Request, Res, UseGuards} from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UserService } from './user.service';
import {LoginUserDto} from "@src/user/dto/login-user.dto";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "@src/user/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/sign-up')
    async signUp(@Body() signUpUserDto: SignUpUserDto) {
        return await this.userService.signUp(signUpUserDto);

    }

    //passport-local strategy 채택
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login (@Body() loginUserDto: LoginUserDto, @Res() res){
        const {userPwd, userId, ...payload} = loginUserDto
        const { accessToken } = await this.userService.login(payload);
        return res.json({
            result: true,
            token: accessToken,
            ...payload
        })
    }


    @Get('/verify')
    @UseGuards(JwtAuthGuard)
    async verify(@Req() req, @Body() loginUserDto: LoginUserDto) {
        const {userPwd, ...payload} = loginUserDto
        const token = this.userService.sign(payload);
        return {
            result: true,
            token,
        };
    }

}
