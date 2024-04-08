import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
  RmqRecordBuilder,
} from '@nestjs/microservices';
import { MessagingModuleOptions } from './messaging-module-options.interface';
import { RMQCommand } from './patterns/comand.enum';
import { RMQEvent } from './patterns/event.enum';

@Injectable()
export class MessagingService {
  private client: ClientProxy;

  constructor(private options: MessagingModuleOptions) {
    const RMQ_USER = process.env.RABBITMQ_USER;
    const RMQ_PASSWORD = process.env.RABBITMQ_PASS;
    const RMQ_HOST = process.env.RABBITMQ_HOST;
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${RMQ_USER}:${RMQ_PASSWORD}@${RMQ_HOST}`],
        queue: options.queueName,
      },
    });
  }

  public async sendToQueue(pattern: RMQCommand, data: any): Promise<any> {
    return this.client.send(pattern, new RmqRecordBuilder(data).build());
  }

  public async emitToQueue(pattern: RMQEvent, data: any): Promise<void> {
    this.client.emit(pattern, new RmqRecordBuilder(data).build());
  }
}
