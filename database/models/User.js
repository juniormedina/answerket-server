const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  companyName: String,
  companyNumber: Number,
  email: String,
  password: String,
  tickets: Array
});

mongoose.model('users', userSchema);