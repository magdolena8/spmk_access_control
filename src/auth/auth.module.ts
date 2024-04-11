import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DeviceModule } from 'src/device/device.module';
import { DatabaseModule } from 'src/repository/database.module';
import {
  AuthConfigDocument,
  AuthConfigSchema,
} from './schemas/auth-config.schema';
import { AuthConfigRepository } from './auth-config.repository';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    DeviceModule,
    DatabaseModule.forFeature([
      { name: AuthConfigDocument.name, schema: AuthConfigSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthConfigRepository, JwtStrategy],
})
export class AuthModule {}
