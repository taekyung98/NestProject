import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'userEmail',
      passwordField: 'userPwd',
    });
  }

  async validate(userEmail: string, userPwd: string): Promise<any> {
    try {
      if (userEmail === '' || userPwd === '') {
        throw new UnauthorizedException(
            '아이디 혹은 비밀번호를 입력하여 주세요.',
        );
      }
      const user = await this.userService.validateUser(userEmail, userPwd);
      if (user === null) {
        throw new BadRequestException('아이디 혹은 비밀번호가 틀렸습니다.');
      }
      return user;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
