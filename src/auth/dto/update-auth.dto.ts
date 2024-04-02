import { PartialType } from '@nestjs/mapped-types';
import { RegisterDeviceReqDto } from './register-device.req.dto';

export class UpdateAuthDto extends PartialType(RegisterDeviceReqDto) {}
