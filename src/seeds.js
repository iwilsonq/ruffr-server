const faker = require('faker');
const _ = require('lodash');
const { Db, Server } = require('mongodb');
const fs = require('fs');
const { BREEDS, PLACEHOLDERS } = require('./constants');

const MIN_PETS = 20;
const PETS_TO_ADD = 10;

let petsCollection;
const db = new Db('ruffr', new Server('localhost', 27017));

db.open()
  .then(() => {
    petsCollection = db.collection('pets');
    return petsCollection.count();
  })
  .then(count => {
    if (count < MIN_PETS) {
      const pets = _.times(PETS_TO_ADD, () => createPet());
      petsCollection.insertMany(pets);
    }
  })
  .catch(e => console.log(e));

function createPet() {
  const pet = {
    name: faker.name.firstName(),
    about: faker.lorem.sentence(),
    // breed: getBreed(),
    age: randomBetween(1, 20),
    gender: getGender(),
    pictures: [getPictures()]
  }
  console.log(pet);
  return pet;
}

function getBreed() {
  return BREEDS[~~(Math.random() * BREEDS.length)];
}

function getGender() {
  const genders = ['Male', 'Female', 'Other'];
  return genders[~~(Math.random() * genders.length)];
}

function randomBetween(start, end) {
  return ~~(start + Math.random() * (end - start));
}

function getPictures() {
  return PLACEHOLDERS[~~(Math.random() * PLACEHOLDERS.length)];
}
