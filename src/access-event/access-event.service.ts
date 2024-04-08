import { Injectable } from '@nestjs/common';
import { CreateAccessEventDto } from './dto/create-access-event.dto';
import { MessagingService } from 'src/messaging/messaging.service';
import { RMQCommand } from 'src/messaging/patterns/comand.enum';

@Injectable()
export class AccessEventService {
  constructor(private readonly messagingService: MessagingService) {}
  async create(createAccessEventDto: CreateAccessEventDto) {
    await this.messagingService.sendToQueue(
      RMQCommand.CreateAccessEvent,
      createAccessEventDto,
    );
  }
}
