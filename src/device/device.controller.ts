import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ConfigureDeviceReqDto } from './dto/configure-device.req.dto';
import { RegisterDeviceReqDto } from './dto/register-device.req.dto';
import { RegisterDeviceResDto } from './dto/register-device.res.dto';
import { JwtGuard } from 'src/auth/guard/jwt.gurad';
import { Device } from './decorators/device.decorator';
import { JWTPayload } from './decorators/jwt-payload.decorator copy';
import { JwtPayload } from 'src/common/classes/jwt-payload.class';

@Controller()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('/api/v1/devices-sync/configuration')
  @UseGuards(JwtGuard)
  async configureDevice(
    @Body() configureDeviceReqDto: ConfigureDeviceReqDto,
    @Device() device: string,
    @JWTPayload() jwtPayload: JwtPayload,
  ) {
    console.log(`Device: ${JSON.stringify(device)}`);
    console.log(`jwtPayload: ${JSON.stringify(jwtPayload)}`);

    return await this.deviceService.configureDevice(
      device,
      configureDeviceReqDto,
    );
  }

  @Post('api/v1/devices-registration')
  async registerDevice(
    @Body() registerDeviceReqDto: RegisterDeviceReqDto,
  ): Promise<RegisterDeviceResDto> {
    console.log(registerDeviceReqDto);
    return await this.deviceService.registerDevice(registerDeviceReqDto);
  }

  @Get('//api/v1/devices')
  async findDevices() {
    return [];
  }
}
