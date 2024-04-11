import { Injectable } from '@nestjs/common';
import { ConfigureDeviceReqDto } from './dto/configure-device.req.dto';
import { DeviceRepository } from './device.repository';
import { DeviceDocument } from './schemas/device.schema';
import { v4 as uuidv4 } from 'uuid';
import { RegisterDeviceReqDto } from './dto/register-device.req.dto';
import {
  RegisterDeviceResDto,
  DeviceRegistrationStatus,
} from './dto/register-device.res.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async configureDevice(
    deviceId: string,
    configureDeviceReqDto: ConfigureDeviceReqDto,
  ) {
    console.log(
      `configureDeviceReqDto.accessPointsConfiguration[0].id: ${configureDeviceReqDto.accessPointsConfiguration[0].id}`,
    );
    return await this.deviceRepository.findOneAndUpdate(
      { id: deviceId },
      {
        ...configureDeviceReqDto,
      },
    );
  }

  async registerDevice(
    registerDeviceReqDto: RegisterDeviceReqDto,
  ): Promise<RegisterDeviceResDto> {
    const newCredentials = await this.generateDeviceCredentials();
    const newDevice = await this.deviceRepository.create({
      login: newCredentials.login,
      password: newCredentials.password,
      id: registerDeviceReqDto.deviceId,
      name: registerDeviceReqDto.name,
    });
    const response = await Promise.resolve(
      new RegisterDeviceResDto({
        id: newDevice.id,
        login: newDevice.login,
        is_success: true,
        status: DeviceRegistrationStatus.SUCCESS,
        name: newDevice.name,
        password: newDevice.password,
      }),
    );
    return response;
  }

  async generateDeviceCredentials() {
    return { login: uuidv4(), password: uuidv4() };
  }

  // async registerDevice(registerDeviceReqDto: RegisterDeviceReqDto) {
  //   return await this.deviceRepository.create({
  //     ...configureDeviceReqDto,
  //     accessToken: null,
  //     refreshToken: null,
  //     expiresIn: null,
  //   });
  // }

  async setTokens(
    deviceId: string,
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ): Promise<DeviceDocument> {
    return await this.deviceRepository.findOneAndUpdate(
      { _id: deviceId },
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
      },
    );
  }

  async findDevice(
    query: FilterQuery<DeviceDocument>,
  ): Promise<DeviceDocument> {
    return await this.deviceRepository.findOne(query);
  }
}
