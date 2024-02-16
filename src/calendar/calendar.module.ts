import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Appointment, AppointmentSchema } from '../schema/appointment.schema';
import { CalendarController } from './calendar.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Appointment.name, 
        schema: AppointmentSchema, 
        collection: process.env.MONGODB_COLL
      },
    ]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
