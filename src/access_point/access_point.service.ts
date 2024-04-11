import { Injectable } from '@nestjs/common';
import { AccessPointRepository } from './access_point.repository';
import { AccessPointDocument } from './schemas/access-point.schema';
import { CreateAccessPointReqDto } from './dto/create-access-point.req.dto copy';
import { CreateAccessPointMessage } from './dto/create-access-point.message';

@Injectable()
export class AccessPointService {
  constructor(private readonly accessPointRepository: AccessPointRepository) {}

  async createAccessPoint(
    createAccessPointReq: CreateAccessPointReqDto | CreateAccessPointMessage,
  ) {
    return await this.accessPointRepository.create({
      id: createAccessPointReq.id,
      name: createAccessPointReq.name,
      enabled:
        'enabled' in createAccessPointReq ? createAccessPointReq.enabled : true,
      type: 'type' in createAccessPointReq ? createAccessPointReq.type : 'DOOR',
      number:
        'number' in createAccessPointReq ? createAccessPointReq.number : 1,
    });
  }

  async findAccessPoints(): Promise<AccessPointDocument[]> {
    return await this.accessPointRepository.find({});
  }
}
