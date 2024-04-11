import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { AbstractDocument } from 'src/repository/abstract.schema';

// Вспомогательные схемы

@Schema()
class Settings {
  @Prop()
  dev_num?: number;

  @Prop()
  in_signal_type?: string;

  @Prop()
  pressing_duration?: number;

  @Prop()
  access_point?: number;

  @Prop()
  direction?: string;

  @Prop()
  bits?: string;

  @Prop()
  pin_b_direction?: string;

  @Prop()
  out_signal_type?: string;

  @Prop()
  access_control?: string;

  @Prop()
  unlock_time?: number;

  @Prop()
  pin_a_direction?: string;

  @Prop()
  opening_duration?: number;
}

@Schema()
class PeripheryConfiguration {
  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  deviceAdr: string;

  @Prop({ type: Settings })
  @Type(() => Settings)
  settings: Settings;

  @Prop({ required: true })
  type: string;
}

const PeripheryConfigurationSchema = SchemaFactory.createForClass(
  PeripheryConfiguration,
);

@Schema()
class AccessPointsConfiguration {
  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [PeripheryConfigurationSchema], default: [] })
  @Type(() => PeripheryConfiguration)
  peripheryConfiguration: PeripheryConfiguration[];

  @Prop({ required: true })
  id: string;
}

const AccessPointsConfigurationSchema = SchemaFactory.createForClass(
  AccessPointsConfiguration,
);

@Schema()
class DeviceConfiguration {
  @Prop()
  betweenCheckTimeout: number;

  @Prop()
  pressingDuration: number;

  @Prop()
  grantedTime: number;

  @Prop()
  enrollTimeout: number;

  @Prop()
  type: string;

  @Prop()
  deniedTime: number;

  @Prop()
  openingDuration: number;
}

const DeviceConfigurationSchema =
  SchemaFactory.createForClass(DeviceConfiguration);

// Основная схема

@Schema({ versionKey: false, timestamps: true })
export class DeviceDocument extends AbstractDocument {
  @Prop({ type: [PeripheryConfigurationSchema], default: [] })
  @Type(() => PeripheryConfiguration)
  peripheryConfiguration?: PeripheryConfiguration[];

  @Prop({ type: [AccessPointsConfigurationSchema], default: [] })
  @Type(() => AccessPointsConfiguration)
  accessPointsConfiguration?: AccessPointsConfiguration[];

  @Prop({ type: DeviceConfigurationSchema })
  @Type(() => DeviceConfiguration)
  deviceConfiguration?: DeviceConfiguration;

  @Prop()
  firmwareVersion?: string;

  @Prop({ type: String })
  accessToken?: string;

  @Prop({ type: String })
  refreshToken?: string;

  @Prop({ type: Number })
  expiresIn?: number;

  @Prop({ type: String })
  login?: string;

  @Prop({ type: String })
  password?: string;

  @Prop({ type: String })
  id?: string;

  @Prop({ type: String })
  name?: string;
}

export const DeviceSchema = SchemaFactory.createForClass(DeviceDocument);
