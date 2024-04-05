import { Injectable } from '@nestjs/common';
import { ConfigureDeviceReqDto } from './dto/configure-device.req.dto';
import { DeviceRepository } from './device.repository';
import { DeviceDocument } from './schemas/device.schema';
import { RegisterDeviceReqDto } from 'src/auth/dto/register-device.req.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async configureDevice(configureDeviceReqDto: ConfigureDeviceReqDto) {
    console.log(configureDeviceReqDto.accessPointsConfiguration[0].id);
    return await this.deviceRepository.create({
      ...configureDeviceReqDto,
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
    });
  }

  async registerDevice(registerDeviceReqDto: RegisterDeviceReqDto) {
    // return await this.deviceRepository.create({
    //   ...configureDeviceReqDto,
    //   accessToken: null,
    //   refreshToken: null,
    //   expiresIn: null,
    // });
  }

  async setTokens(
    deviceId: string,
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ): Promise<DeviceDocument> {
    await this.deviceRepository.findOneAndUpdate(
      { _id: deviceId },
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
      },
    );
    return;
  }
}
