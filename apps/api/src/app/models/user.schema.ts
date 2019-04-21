import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export const athleteSchema = new mongoose.Schema({
  represents: [{
    sport: {
      type: String,
      enum: ['Shorttrack', 'Other'],
      required: true
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organizations',
      required: true
    },
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
  athlete: athleteSchema,
  admin: {
    type: Boolean,
    default: false
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles'
  }]
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'Is already taken.'});


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
