import { Controller } from '@nestjs/common';
import { AccessPointService } from '../access_point.service';
import { CreateAccessPointMessage } from '../dto/create-access-pint.message';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { MessagingService } from 'src/messaging/messaging.service';

@Controller()
export class AccessPointRMQController {
  constructor(
    private readonly accessPointService: AccessPointService,
    private readonly messagingService: MessagingService,
  ) {}

  @MessagePattern('create-access-point')
  // @MessagePattern()
  async handlePlaceCreated(
    @Ctx() context: RmqContext,
    @Payload() payload: CreateAccessPointMessage,
  ) {
    await this.accessPointService.createAccessPoint(payload);
    console.log(payload);
    // await this.messagingService.sendToQueue('cmd_test', {
    //   message: 'Hello',
    // });
  }
}
