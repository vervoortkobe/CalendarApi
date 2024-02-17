import { ObjectId } from "mongoose";

export class Appointment {
  _id?: ObjectId;
  title: string;
  details: string;
  start: string;
  end: string;
  time: string;
  tag: string;
  visibility: string;
}