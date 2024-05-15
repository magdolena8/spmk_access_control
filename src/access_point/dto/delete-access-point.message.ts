import { PickType } from '@nestjs/mapped-types';
import { AccessPointDocument } from '../schemas/access-point.schema';

export class DeleteAccessPointMessage extends PickType(AccessPointDocument, [
  'id',
] as const) {}
