import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/repository/abstract.repository';
import { AuthConfigDocument } from './schemas/auth-config.schema';

@Injectable()
export class AuthConfigRepository extends AbstractRepository<AuthConfigDocument> {
  protected readonly logger = new Logger(AuthConfigRepository.name);

  constructor(
    @InjectModel(AuthConfigDocument.name)
    authConfigModel: Model<AuthConfigDocument>,
  ) {
    super(authConfigModel);
  }
}
