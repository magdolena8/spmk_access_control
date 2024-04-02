import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessEventDto } from './create-access-event.dto';

export class UpdateAccessEventDto extends PartialType(CreateAccessEventDto) {}
