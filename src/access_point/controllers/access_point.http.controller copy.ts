import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccessPointService } from '../access_point.service';
import { CreateAccessPointReqDto } from '../dto/create-access-point.req.dto copy';

@Controller()
export class AccessPointHTTPController {
  constructor(private readonly accessPointService: AccessPointService) {}

  @Post()
  async createAccessPoint(
    @Body() createAccessPointReqDto: CreateAccessPointReqDto,
  ) {
    return await this.accessPointService.createAccessPoint(
      createAccessPointReqDto,
    );
  }
  @Get('//api/v1/access/points')
  async findAccessPoint() {
    return await this.accessPointService.findAccessPoints();
  }
}
