import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AccessEventModule } from './access-event/access-event.module';
import { DeviceModule } from './device/device.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './repository/database.module';
import { AccessPointModule } from './access_point/access_point.module';
import { MessagingModule } from './messaging/messaging.module';
import { JwtGuard } from './auth/guard/jwt.gurad';
import { SeedsModule } from './shared/seeds.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AccessEventModule,
    DeviceModule,
    ConfigModule,
    AccessPointModule,
    MessagingModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [JwtGuard],
})
export class AppModule {}
