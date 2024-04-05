import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDeviceReqDto } from './dto/register-device.req.dto';
import {
  DeviceRegistrationStatus,
  RegisterDeviceResDto,
} from './dto/register-device.res.dto';
import { OAuthTokenResDto } from './dto/oauth-token.res.dto';
import { DeviceService } from 'src/device/device.service';
import { OAuthTokenReqDto } from './dto/oauth-token.req.dto copy';

@Injectable()
export class AuthService {
  constructor(private readonly deviceService: DeviceService) {}
  async registerDevice(
    registerDeviceReqDto: RegisterDeviceReqDto,
  ): Promise<RegisterDeviceResDto> {
    console.log(registerDeviceReqDto);
    const response = await Promise.resolve(
      new RegisterDeviceResDto({
        // id: registerDeviceReqDto.deviceId,
        id: 'ec44b5c3-734a-4266-a231-a652b04bb079',
        login: 'login',
        is_success: true,
        status: DeviceRegistrationStatus.SUCCESS,
        name: 'name',
        password: 'password',
      }),
    );
    return response;
  }

  async auth(OAuthTokenDto: OAuthTokenReqDto): Promise<OAuthTokenResDto> {
    await this.validateCredentials(
      OAuthTokenDto.username,
      OAuthTokenDto.password,
    );
    // await generaTokens();
    // await this.deviceService.setTokens();
    return;
  }

  async validateCredentials(login: string, password: string) {
    console.log(login, password);

    if (
      login === process.env.CLOUD_LOGIN &&
      password === process.env.CLOUD_PASSWORD
    ) {
      return true;
    } else throw new UnauthorizedException({ message: 'Inavlid credentials' });
  }
}
