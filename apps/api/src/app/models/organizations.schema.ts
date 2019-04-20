import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export const schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    // TODO see if capitalization fucks the unique check, if so; regex :(
    type: String,
    unique: true
  },
  abbreviation: {
    type: String,
    unique: true,
    uppercase: true,
    index: true
  },
  image: String,
  description: String
}, {timestamps: true});

schema.plugin(uniqueValidator, {message: 'is already taken.'});
