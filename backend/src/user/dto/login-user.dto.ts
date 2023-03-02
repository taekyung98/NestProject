import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {

    @ApiProperty({ description: '아이디' })
    @IsEmail()
    userEmail: string;

    @IsString()
    userPwd: string;

}
