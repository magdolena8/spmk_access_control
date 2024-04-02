import { Module } from '@nestjs/common';
import { AccessEventService } from './access-event.service';
import { AccessEventController } from './access-event.controller';

@Module({
  controllers: [AccessEventController],
  providers: [AccessEventService],
})
export class AccessEventModule {}
