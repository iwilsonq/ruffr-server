const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const PetSchema = require('./pet');

const UserSchema = new Schema({
  name: String,
  // pets: [PetSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
