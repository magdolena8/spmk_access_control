import { Controller, Post, Body, Header, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDeviceResDto } from './dto/register-device.res.dto';
import { RegisterDeviceReqDto } from './dto/register-device.req.dto';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/v1/devices-registration')
  async registerDevice(
    @Body() registerDeviceReqDto: RegisterDeviceReqDto,
  ): Promise<RegisterDeviceResDto> {
    console.log(registerDeviceReqDto);
    return await this.authService.registerDevice(registerDeviceReqDto);
  }

  @Post('/oauth/token')
  @Header('Authorization', 'Bearer qweqweqweqweqwe')
  auth(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    console.log(req);

    res.send({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      refresh_token: 'refreshTokenData',
      expires_in: 1711100337,
    });
  }
}
