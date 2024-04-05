import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ConfigureDeviceReqDto } from './dto/configure-device.req.dto';

@Controller()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('/api/v1/devices-sync/configuration')
  async configureDevice(@Body() configureDeviceReqDto: ConfigureDeviceReqDto) {
    return await this.deviceService.configureDevice(configureDeviceReqDto);
  }

  // @Get('//api/v1/access/points') //точки доступа контроллера
  //[
  // {
  //   "enabled": true,
  //   "id": "52e1f1be-e901-41b1-b288-b2cd739de39f",
  //   "name": "\u0411\u043e\u0440\u043e\u0432\u043b\u044f\u043d\u044b \u041e\u0414\u041a\u0411",
  //            Боровляны ОДКБ
  //   "number": 1,
  //   "type": "DOOR"
  // }
  //]
  async findAccessPoint() {
    return [
      {
        enabled: true,
        name: 'Проход 1',
        id: '2f01991e-069f-4bde-9183-ffca5b608f98',
        type: 'DOOR',
        number: 1,
      },
    ];
  }

  @Get('//api/v1/devices')
  async findDevices() {
    // return [
    //   {
    //     id: '52e1f1be-e901-41b1-b288-b2cd739de39f',
    //     type: 'qweqwe',
    //     access_point_id: '123123123123',
    //   },
    // ];
    return [
      {
        id: 'd4892623-b3d7-4c96-93c9-eb0f29553db7',
        name: 'qwe',
        lastConnectedTime: '2024-04-01T10:56:43.78741Z',
        lastOfflineTime: '2024-04-01T11:11:31.478651Z',
        lastChangedTime: '2024-03-22T14:33:55.923725Z',
        lastSynchronizationTime: '2024-04-01T10:56:43.78741Z',
        lastMessageSynchronizationTime: null,
        lastTimeSynchronizationTime: null,
        lastPhotoSynchronizationTime: null,
        lastAccessEventTime: null,
        lastAccessEventDataTime: null,
        lastIntervalAcquisitionTime: null,
        lastStatusTransferTime: null,
        lastEnrollEventTime: null,
        lastPhotoRecognitionTime: null,
        lastLogUploadTime: null,
        active: true,
        deviceType: 'USB',
        firmwareForUpdate: null,
        executionCommand: null,
      },
    ];
  }
}
