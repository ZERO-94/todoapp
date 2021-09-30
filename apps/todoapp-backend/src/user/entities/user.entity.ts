import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, default: uuidv4 })
  @IsUUID(4)
  _id: string;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  user_name: string;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
