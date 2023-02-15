import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
    @ApiProperty({ description: '회원이름' })
    @IsString()
    userName: string;

    @ApiProperty({ description: '아이디' })
    @IsEmail()
    userEmail: string;

    @IsString()
    userPwd: string;

    @IsOptional()
    signDate: Date;
}
