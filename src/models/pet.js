const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: String,
  age: Number,
  about: String,
  gender: String,
  pictures: [String]
});

const Pet = mongoose.model('pet', PetSchema);

module.exports = Pet;
