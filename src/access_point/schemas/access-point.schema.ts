import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/repository/abstract.schema';

@Schema()
export class AccessPointDocument extends AbstractDocument {
  @Prop({ default: true })
  enabled: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  id: string;

  @Prop({ default: 'DOOR' })
  type: string;

  @Prop({ default: 1 })
  number: number;
}

export const AccessPointSchema =
  SchemaFactory.createForClass(AccessPointDocument);
