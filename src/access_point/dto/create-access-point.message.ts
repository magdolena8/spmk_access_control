import { PickType } from '@nestjs/mapped-types';
import { AccessPointDocument } from '../schemas/access-point.schema';

export class CreateAccessPointMessage extends PickType(AccessPointDocument, [
  'name',
] as const) {}
