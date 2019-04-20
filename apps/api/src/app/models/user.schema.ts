import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export const athleteSchema = new mongoose.Schema({
  sports: [{
    name: String,
    association_name: String,
    association_id: String,
    club: String
  }]
}, {timestamps: true});

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    unique: true
  },
  password: {
    type: String,
    select: false,
  },
  salt: {
    type: String,
    select: false,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  bio: String,
  image: String,
  address: {
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  name: {
    first: String,
    middle: String,
    last: String
  },
  athlete: athleteSchema
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});


//TODO use salts
UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
