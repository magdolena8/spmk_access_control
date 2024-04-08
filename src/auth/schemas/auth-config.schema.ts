import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/repository/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class AuthConfigDocument extends AbstractDocument {
  @Prop({ type: String })
  login: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  accessToken: string;

  @Prop({ type: String })
  refreshToken: string;
}

export const AuthConfigSchema =
  SchemaFactory.createForClass(AuthConfigDocument);
