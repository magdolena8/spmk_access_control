import { Controller, Get } from '@nestjs/common';
import { AccessPointService } from '../access_point.service';

@Controller()
export class AccessPointHTTPController {
  constructor(private readonly accessPointService: AccessPointService) {}

  @Get('//api/v1/access/points')
  async findAccessPoint() {
    return await this.accessPointService.findAccessPoints();
  }
}
