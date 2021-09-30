import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber } from 'class-validator';

export type TaskDocument = Task & Document;
@Schema()
export class Task {
  @Prop({ type: String, required: true })
  @IsNotEmpty()
  title: string;

  @Prop({ type: Number, required: true, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @Prop({ type: String, default: '' })
  details: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
