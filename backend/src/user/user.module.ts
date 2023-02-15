import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
const IS_DEV = process.env.NODE_ENV === 'development';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: IS_DEV ? '.env.dev' : '.env',
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
