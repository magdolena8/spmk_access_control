import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/repository/abstract.repository';
import { AccessPointDocument } from './schemas/access-point.schema';

@Injectable()
export class AccessPointRepository extends AbstractRepository<AccessPointDocument> {
  protected readonly logger = new Logger(AccessPointRepository.name);

  constructor(
    @InjectModel(AccessPointDocument.name)
    accessPointModel: Model<AccessPointDocument>,
  ) {
    super(accessPointModel);
  }
}
