import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: headerExtractor,
      ignoreExpiration: configService.getOrThrow('IGNORE_EXPIRATION'),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}

const headerExtractor = function (request: Request) {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cookieExtractor = function (req) {
  let accessToken = null;
  if (req && req.cookies) {
    accessToken = req.cookies['accessToken'];
  }
  return accessToken;
};
