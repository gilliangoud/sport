import * as mongoose from 'mongoose';

export const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  resource: {
    type: String,
    enum: ['create', 'read', 'update', 'delete'],
    required: true,
    uppercase: true
  },
  action: {
    type: String,
    required: true,
    lowercase: true
  },
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organizations'
  },
  // possession: {
  //   type: String,
  //   enum: ['any', 'own'],
  //   required: true,
  //   lowercase: true
  // },
  attributes: [{
    type: String,
    lowercase: true
  }],
  inherits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles'
  }]
});
