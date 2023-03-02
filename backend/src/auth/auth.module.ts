import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/jwtConstants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../user/local.strategy';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
  ],
})
export class AuthModule {}
