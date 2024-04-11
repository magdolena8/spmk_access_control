import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from 'src/auth/auth.module';
import { AuthSeed } from 'src/auth/seed/global-auth.seed';

@Module({
  imports: [CommandModule, AuthModule],
  providers: [AuthSeed],
  exports: [AuthSeed],
})
export class SeedsModule {}
