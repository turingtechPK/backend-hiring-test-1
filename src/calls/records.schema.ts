import { SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const RecordsSchema = new mongoose.Schema({
  callsid: {
    type: String,
    // required: true,
  },

  duration: {
    type: Number,
    // required: true,
  },

  RecordingUrl: {
    type: String,
  },
  FromCountry: {
    type: String,
  },
  ToCountry: {
    type: String,
  },
  status: {
    type: String,
    // required: true,
  },
  from: {
    type: String,
    //required: true,
  },
  to: {
    type: String,
    //required: true,
  },
  method: {
    type: String,
    //required: true,
  },
});

export interface Records extends mongoose.Document {
  callsid: string;
  duration: Number;
  RecordingUrl: string;
  FromCountry: string;
  ToCountry: string;
  status: string;
  from: string;
  to: string;
  method: string;
}
