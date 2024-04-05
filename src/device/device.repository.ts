import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/repository/abstract.repository';
import { DeviceDocument } from './schemas/device.schema';

@Injectable()
export class DeviceRepository extends AbstractRepository<DeviceDocument> {
  protected readonly logger = new Logger(DeviceRepository.name);

  constructor(
    @InjectModel(DeviceDocument.name)
    deviceModel: Model<DeviceDocument>,
  ) {
    super(deviceModel);
  }
}
