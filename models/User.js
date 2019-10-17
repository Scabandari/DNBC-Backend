const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  nLevel: { type: Number, default: 2 }
});

mongoose.model('User', userSchema);
