import { Injectable } from '@nestjs/common';
import { MessagingService } from 'src/messaging/messaging.service';
import { RMQCommand } from 'src/messaging/patterns/comand.enum';
import { AccessEventReqDto } from './dto/access-event.req.dto';
import { base64 } from 'rfc4648';
import { AccessEventMessage } from './messages/access-event.message';

@Injectable()
export class AccessEventService {
  constructor(private readonly messagingService: MessagingService) {}
  async create(accessEventDto: AccessEventReqDto) {
    console.log(accessEventDto.rfidId);
    console.log(accessEventDto.accessPointId);
    await this.messagingService.sendToQueue(
      RMQCommand.CreateAccessEvent,
      new AccessEventMessage(
        accessEventDto.id,
        accessEventDto.accessPointId,
        await this.convertUrlEncodedStringToCardCode(accessEventDto.rfidId),
        accessEventDto.direction,
        accessEventDto.dateTime,
      ),
    );
  }

  async convertUrlEncodedStringToCardCode(
    urlEncodedString: string,
  ): Promise<number> {
    const bytes2 = base64.parse(urlEncodedString);
    const hex = Buffer.from(bytes2).toString('hex');
    return parseInt(hex, 16);
  }
}
