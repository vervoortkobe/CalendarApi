import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as ical from 'node-ical';
import { Appointment } from 'src/entities/appointment.entity';
import { App } from 'supertest/types';

@Controller('appointments')
export class CalendarController {
  constructor(private readonly svc: CalendarService) {}

  @Post()
  create(@Body() CreateAppointmentDto: CreateAppointmentDto) {
    return this.svc.create(CreateAppointmentDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCalendarFile(@UploadedFile() file: Express.Multer.File): Promise<void> {
    const events = ical.sync.parseICS(file.buffer.toString());
    for (let ev of Object.values(events)) {
      console.log(ev.type)
      if(ev.type === 'VEVENT') {
        const ap = new Appointment();
        ap.Title = ev.summary;
        ap.Details = ev.description;
        ap.StartDate = ev.start.toLocaleString("en-US");
        ap.EndDate = ev.end.toLocaleString("en-US");;
        ap.Time = "";
        ap.Tag = "Event";
        ap.Visibility = "none";
        await this.svc.upload(ap);
        console.log("uploaded")
      }
    }
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.svc.update(id, UpdateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
