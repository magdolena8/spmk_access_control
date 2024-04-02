import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDeviceReqDto } from './dto/register-device.req.dto';
import {
  DeviceRegistrationStatus,
  RegisterDeviceResDto,
} from './dto/register-device.res.dto';

@Injectable()
export class AuthService {
  async registerDevice(
    registerDeviceReqDto: RegisterDeviceReqDto,
  ): Promise<RegisterDeviceResDto> {
    console.log(registerDeviceReqDto);
    const response = await Promise.resolve(
      new RegisterDeviceResDto({
        id: registerDeviceReqDto.deviceId,
        login: '',
        is_success: true,
        status: DeviceRegistrationStatus.SUCCESS,
        name: 'name',
        password: 'password',
      }),
    );
    return response;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
