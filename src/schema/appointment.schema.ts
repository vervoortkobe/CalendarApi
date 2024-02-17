import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {

  @Prop()
  title: string;

  @Prop()
  details: string;

  @Prop()
  start: string;

  @Prop()
  end: string;

  @Prop()
  time: string;

  @Prop()
  tag: string;

  @Prop()
  visibility: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
