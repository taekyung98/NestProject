import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import {jwtConstants} from "@src/utils/jwtConstants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }
  /**
   * user token 정보 인증 (DB)
   * @param payload
   */
  async validate(payload: any) {
    const { userId } = payload;
    const user = await this.userService.getByUser({ userId });
    if (user === null) throw new Error(`존재하지 않는 사용자입니다.`);
    return user;
  }
}
