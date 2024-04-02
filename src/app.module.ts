import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AccessEventModule } from './access-event/access-event.module';

@Module({
  imports: [AuthModule, AccessEventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
