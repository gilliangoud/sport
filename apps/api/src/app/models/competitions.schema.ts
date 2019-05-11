import * as mongoose from 'mongoose';
import { pointSchema } from './point.schema';

export const RaceSchema = new mongoose.Schema({
  competitors: [{
    competitor: { type: [mongoose.Schema.Types.ObjectId], ref: 'users'},
    start_position: Number,
    finish_position: Number,
    time: [Number],
  }]
})

export const competitorSchema = new mongoose.Schema({
  competitor: { type: [mongoose.Schema.Types.ObjectId], ref: 'users'},
  status: {
    type: String,
    enum: ['Entered', 'Withdrawn', 'Present'],
  }
})

export const CompetitionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organizations',
  },
  competitors: {
    type: [competitorSchema],
  },
  title: String,
  image: String,
  description: String,
  location: {
    type: pointSchema,
    required: true
  }
}, {timestamps: true});

