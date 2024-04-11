import { Controller, Post, Body } from '@nestjs/common';
import { AccessEventService } from './access-event.service';
import { AccessEventReqDto } from './dto/access-event.req.dto';

@Controller('/api/v1/devices/notify')
export class AccessEventController {
  constructor(private readonly accessEventService: AccessEventService) {}

  @Post('access-event')
  handleAccessEvent(@Body() createAccessEventDto: AccessEventReqDto) {
    return this.accessEventService.create(createAccessEventDto);
  }
}
