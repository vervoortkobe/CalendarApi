import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop()
  _id?: ObjectId;

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
