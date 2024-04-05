import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
  RmqRecordBuilder,
} from '@nestjs/microservices';
import { MessagingModuleOptions } from './messaging-module-options.interface';

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

  public async sendToQueue(command: string, data: any): Promise<any> {
    return this.client.send(command, data).subscribe();
  }

  public async emitToQueue(message: string, data: any): Promise<void> {
    // this.client.emit(this.options.queueName, data).subscribe({
    //   error: (error) => console.error(error),
    //   complete: () => console.log('Message sent successfully'),
    // });
  }
}
