import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDeviceResDto } from './dto/register-device.res.dto';
import { RegisterDeviceReqDto } from './dto/register-device.req.dto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { OAuthTokenReqDto } from './dto/oauth-token.req.dto copy';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('api/v1/devices-registration')
  async registerDevice(
    @Body() registerDeviceReqDto: RegisterDeviceReqDto,
  ): Promise<RegisterDeviceResDto> {
    console.log(registerDeviceReqDto);
    return await this.authService.registerDevice(registerDeviceReqDto);
  }

  @Post('/oauth/token') //login
  // @UseGuards(JwtGuard)
  async auth(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Body() OAuthTokenDto: OAuthTokenReqDto,
  ) {
    console.log(OAuthTokenDto);
    await this.authService.auth(OAuthTokenDto);
    res.send({
      // access_token:
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      access_token: await this.jwtService.signAsync({ deviceId: '123123123' }),
      refresh_token: 'refreshTokenData',
      expires_in: 1714799178,
    });
    // const accessToken = await this.jwtService.signAsync({ ...payload });
  }
}
