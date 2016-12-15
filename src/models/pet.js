const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length >= 2,
      message: 'Name must be at least 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  age: Number,
  about: String,
  image: String,
  image_id: String,
  createdAt: Date
});

const Pet = mongoose.model('pet', PetSchema);

module.exports = Pet;
