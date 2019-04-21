import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export const schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  name: {
    // TODO see if capitalization fucks the unique check, if so; regex :(
    type: String,
    unique: true,
    required: true
  },
  abbreviation: {
    type: String,
    unique: true,
    uppercase: true,
    index: true
  },
  image: String,
  description: String,
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
}, {timestamps: true});

schema.plugin(uniqueValidator, {message: 'Is already taken.'});
