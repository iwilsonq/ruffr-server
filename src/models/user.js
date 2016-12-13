const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pet = require('./pet');

const UserSchema = new Schema({
  name: String,
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'pet'
  }]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
