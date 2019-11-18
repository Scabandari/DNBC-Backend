const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Email = new Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('emails', Email);
