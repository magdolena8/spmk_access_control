import { Module } from '@nestjs/common';
import { AccessEventService } from './access-event.service';
import { AccessEventController } from './access-event.controller';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [
    MessagingModule.register({
      queueName: process.env.RABBITMQ_ACCESS_EVENT_QUEUE,
    }),
  ],
  controllers: [AccessEventController],
  providers: [AccessEventService],
})
export class AccessEventModule {}
