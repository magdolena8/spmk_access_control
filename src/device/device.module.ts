import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DatabaseModule } from 'src/repository/database.module';
import { DeviceDocument, DeviceSchema } from './schemas/device.schema';
import { DeviceRepository } from './device.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: DeviceDocument.name, schema: DeviceSchema },
    ]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
  exports: [DeviceService],
})
export class DeviceModule {}
