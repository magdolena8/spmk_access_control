import { PartialType } from '@nestjs/mapped-types';
import { RegisterDeviceReqDto } from '../../device/dto/register-device.req.dto';

export class UpdateAuthDto extends PartialType(RegisterDeviceReqDto) {}
