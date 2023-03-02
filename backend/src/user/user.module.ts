import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {jwtConstants} from "@src/utils/jwtConstants";
import {LocalStrategy} from "@src/user/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "@src/user/jwt.strategy";
const IS_DEV = process.env.NODE_ENV === 'development';

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '300s' },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: IS_DEV ? '.env.dev' : '.env',
        }),
        PassportModule.register({defaultStrategy:'jwt'})
    ],
    controllers: [UserController],
    providers: [UserService,LocalStrategy,JwtStrategy],
    exports : [ PassportModule, UserService]
})
export class UserModule {}
