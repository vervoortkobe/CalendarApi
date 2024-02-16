import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { Appointment, AppointmentDocument } from '../schema/appointment.schema';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(create: CreateAppointmentDto): Promise<AppointmentDocument> {
    const appointment = new this.appointmentModel(CreateAppointmentDto);
    return appointment.save();
  }

  async upload(event: CreateAppointmentDto): Promise<AppointmentDocument> {
    const appointment = new this.appointmentModel(event);
    return appointment.save();
  }

  async findAll(): Promise<AppointmentDocument[]> {
    return this.appointmentModel.find().exec();
  }

  async findOne(id: string) {
    return this.appointmentModel.findById(id);
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<AppointmentDocument> {
    return this.appointmentModel.findByIdAndUpdate(id, updateAppointmentDto);
  }

  async remove(id: string) {
    return this.appointmentModel.findOneAndDelete({ _id: id });
  }
}
