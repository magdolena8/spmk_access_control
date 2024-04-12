import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuthTokenResDto } from './dto/oauth-token.res.dto';
import { DeviceService } from 'src/device/device.service';
import { OAuthTokenReqDto } from './dto/oauth-token.req.dto copy';
import { v4 as uuidv4 } from 'uuid';
import { AuthConfigDocument } from './schemas/auth-config.schema';
import { AuthConfigRepository } from './auth-config.repository';
import { JwtService } from '@nestjs/jwt';
import { DeviceDocument } from 'src/device/schemas/device.schema';

@Injectable()
export class AuthService {
  public static authConfig: AuthConfigDocument;
  constructor(
    private readonly deviceService: DeviceService,
    private readonly authConfigRepository: AuthConfigRepository,
    private readonly jwtService: JwtService,
  ) {}
  async onModuleInit() {
    AuthService.authConfig = await this.getGlobalAuthConfig();
  }

  async getGlobalAuthConfig() {
    return await this.authConfigRepository.findOne({});
  }
  async setGlobalAuthConfig(config: {
    accessToken: string;
    refreshToken: string;
  }) {
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

  // async registerDevice(
  //   registerDeviceReqDto: RegisterDeviceReqDto,
  // ): Promise<RegisterDeviceResDto> {
  //   const response = await Promise.resolve(
  //     new RegisterDeviceResDto({
  //       id: registerDeviceReqDto.deviceId,
  //       // id: 'ec44b5c3-734a-4266-a231-a652b04bb079',
  //       login: 'login',
  //       is_success: true,
  //       status: DeviceRegistrationStatus.SUCCESS,
  //       name: registerDeviceReqDto.name,
  //       password: 'password',
  //     }),
  //   );
  //   return response;
  // }

  async auth(OAuthTokenDto: OAuthTokenReqDto): Promise<OAuthTokenResDto> {
    const device = await this.validateDeviceCredentials(
      OAuthTokenDto.username,
      OAuthTokenDto.password,
    );
    if (!device) {
      if (
        await this.validateGlobalCredentials(
          OAuthTokenDto.username,
          OAuthTokenDto.password,
        )
      ) {
        const globalTokens = await this.generateGlobalTokensPair();
        const updatedGlobalConfig = await this.setGlobalAuthConfig({
          accessToken: globalTokens.access_token,
          refreshToken: globalTokens.refresh_token,
        });
        return {
          access_token: updatedGlobalConfig.accessToken,
          refresh_token: updatedGlobalConfig.refreshToken,
          expires_in: globalTokens.expires_in,
        };
      }
    }
    const deviceTokens = await this.generateDeviceTokensPair(device.id);
    const updatedDeviceConfig = await this.deviceService.setTokens(
      device._id.toString(),
      deviceTokens.access_token,
      deviceTokens.refresh_token,
      deviceTokens.expires_in,
    );
    return {
      access_token: updatedDeviceConfig.accessToken,
      refresh_token: updatedDeviceConfig.refreshToken,
      expires_in: deviceTokens.expires_in,
    };
  }

  async refreshToken(refreshToken: string): Promise<OAuthTokenResDto> {
    // const currentAuthConfig = await this.getGlobalAuthConfig();
    const device = await this.deviceService.findDevice({
      refreshToken: refreshToken,
    });
    if (!device)
      throw new UnauthorizedException({ message: 'Invalid refresh token' });
    if (device.refreshToken === refreshToken) {
      const newTokens = await this.generateDeviceTokensPair(device.id);
      await this.deviceService.setTokens(
        device._id.toString(),
        newTokens.access_token,
        newTokens.refresh_token,
        newTokens.expires_in,
      );
      return newTokens;
    } else
      throw new UnauthorizedException({ message: 'Ivnalid refresh token' });
  }

  async validateDeviceCredentials(
    login: string,
    password: string,
  ): Promise<DeviceDocument> {
    // TODO: megrate credentials to mongo
    console.log(login, password);

    const device = await this.deviceService.findDevice({
      login: login,
      password: password,
    });
    return device ? device : null;
  }

  async validateGlobalCredentials(login: string, password: string) {
    return (
      login === process.env.CLOUD_LOGIN &&
      password === process.env.CLOUD_PASSWORD
    );
  }

  async generateDeviceTokensPair(deviceId: string): Promise<OAuthTokenResDto> {
    return {
      access_token: await this.jwtService.signAsync({
        deviceIds: deviceId,
      }),
      refresh_token: uuidv4(),
      expires_in: 60,
    };
  }

  async generateGlobalTokensPair(): Promise<OAuthTokenResDto> {
    return {
      access_token: await this.jwtService.signAsync({
        globaluath: true,
      }),
      refresh_token: uuidv4(),
      expires_in: 60,
    };
  }

  async createAuthConfig(login: string, password: string) {
    const authConfig = await this.authConfigRepository.findOne({});
    if (authConfig)
      throw new Error('WARNGIN createAuthConfig: auth config already exists');
    return await this.authConfigRepository.create({
      login: login,
      password: password,
    });
  }
}
