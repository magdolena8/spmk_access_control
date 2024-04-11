import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyRequest } from 'fastify';
import { GrantType, OAuthTokenReqDto } from './dto/oauth-token.req.dto copy';
import { OAuthTokenResDto } from './dto/oauth-token.res.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/oauth/token') //login
  async auth(
    @Req() req: FastifyRequest,
    @Body() OAuthTokenDto: OAuthTokenReqDto,
  ): Promise<OAuthTokenResDto> {
    console.log(OAuthTokenDto);
    if (OAuthTokenDto.grant_type == GrantType.password)
      return await this.authService.auth(OAuthTokenDto);
    if (OAuthTokenDto.grant_type == GrantType.refresh_token)
      return await this.authService.refreshToken(OAuthTokenDto.refresh_token);
  }
}
