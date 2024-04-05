import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const RMQ_USER = configService.get('RABBITMQ_USER');
  const RMQ_PASSWORD = configService.get('RABBITMQ_PASS');
  const RMQ_HOST = configService.get('RABBITMQ_HOST');
  const RMQ_ACCESS_POINT_QUEUE = configService.get(
    'RABBITMQ_ACCESS_POINT_QUEUE',
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${RMQ_USER}:${RMQ_PASSWORD}@${RMQ_HOST}`],
      queue: RMQ_ACCESS_POINT_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(process.env.HTTP_PORT, '0.0.0.0');
}
bootstrap();
