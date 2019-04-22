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

export const CompetitionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organizations',
  },
  competitors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'users',
  },
  title: String,
  image: String,
  description: String,
  location: {
    type: pointSchema,
    required: true
  }
}, {timestamps: true});

