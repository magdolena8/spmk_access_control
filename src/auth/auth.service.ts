import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDeviceReqDto } from './dto/register-device.req.dto';
import {
  DeviceRegistrationStatus,
  RegisterDeviceResDto,
} from './dto/register-device.res.dto';
import { OAuthTokenResDto } from './dto/oauth-token.res.dto';
import { DeviceService } from 'src/device/device.service';
import { OAuthTokenReqDto } from './dto/oauth-token.req.dto copy';
import { v4 as uuidv4 } from 'uuid';
import { AuthConfigDocument } from './schemas/auth-config.schema';
import { AuthConfigRepository } from './auth-config.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  public static authConfig: AuthConfigDocument;
  constructor(
    private readonly deviceService: DeviceService,
    private readonly authConfigRepository: AuthConfigRepository,
    private readonly jwtService: JwtService,
  ) {}
  async onModuleInit() {
    AuthService.authConfig = await this.getAuthConfig();
  }

  async getAuthConfig() {
    return await this.authConfigRepository.findOne({});
  }
  async setAuthConfig(config: { accessToken: string; refreshToken: string }) {
    try {
      const updatedConfig = await this.authConfigRepository.findOneAndUpdate(
        {},
        { accessToken: config.accessToken, refreshToken: config.refreshToken },
      );
      AuthService.authConfig = updatedConfig;
      return AuthService.authConfig;
    } catch (err) {
      console.log(`ERROR: AuthService.SetAuthConfig: ${err}`);
    }
  }

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
    const tokens = await this.generateTokensPair();
    const updatedConfig = await this.setAuthConfig({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
    return {
      access_token: updatedConfig.accessToken,
      refresh_token: updatedConfig.refreshToken,
      expires_in: tokens.expires_in,
    };
  }

  async refreshToken(refreshToken: string): Promise<OAuthTokenResDto> {
    const currentAuthConfig = await this.getAuthConfig();
    if (currentAuthConfig.refreshToken === refreshToken) {
      const newTokens = await this.generateTokensPair();
      await this.setAuthConfig({
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token,
      });
      return newTokens;
    } else
      throw new UnauthorizedException({ message: 'Ivnalid refresh token' });
  }

  async validateCredentials(login: string, password: string) {
    //TODO: megrate credentials to mongo
    if (
      login === process.env.CLOUD_LOGIN &&
      password === process.env.CLOUD_PASSWORD
    ) {
      return true;
    } else throw new UnauthorizedException({ message: 'Inavlid credentials' });
  }

  async generateTokensPair(): Promise<OAuthTokenResDto> {
    return {
      access_token: await this.jwtService.signAsync({
        deviceIds: '123123',
      }),
      refresh_token: uuidv4(),
      expires_in: 60,
    };
  }
}
