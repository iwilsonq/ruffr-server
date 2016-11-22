const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogSchema = new Schema({
  name: String,
  age: Number,
  about: String,
  gender: String,
  breed: String,
  pictures: [String]
});

const Dog = mongoose.model('dog', DogSchema);

module.exports = Dog;
