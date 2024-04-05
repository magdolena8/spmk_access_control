import { Module } from '@nestjs/common';
import { AccessPointService } from './access_point.service';
import { AccessPointRMQController } from './controllers/access_point.rmq.controller';
import { DatabaseModule } from 'src/repository/database.module';
import {
  AccessPointDocument,
  AccessPointSchema,
} from './schemas/access-point.schema';
import { AccessPointRepository } from './access_point.repository';
import { MessagingModule } from 'src/messaging/messaging.module';
import { ConfigModule } from '@nestjs/config';
import { AccessPointHTTPController } from './controllers/access_point.http.controller copy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forFeature([
      { name: AccessPointDocument.name, schema: AccessPointSchema },
    ]),
    MessagingModule.register({
      queueName: process.env.RABBITMQ_ACCESS_EVENT_QUEUE,
    }),
  ],
  controllers: [AccessPointHTTPController, AccessPointRMQController],
  providers: [AccessPointService, AccessPointRepository],
})
export class AccessPointModule {}
