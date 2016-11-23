const faker = require('faker');
const _ = require('lodash');
const { Db, Server } = require('mongodb');
const fs = require('fs');
const { BREEDS, PLACEHOLDERS } = require('./constants');

const MIN_DOGS = 10;
const DOGS_TO_ADD = 10;

let dogsCollection;
const db = new Db('ruffr', new Server('localhost', 27017));

db.open()
  .then(() => {
    console.log('dogs')
    dogsCollection = db.collection('dogs');
    return dogsCollection.count();
  })
  .then(count => {
    if (count < MIN_DOGS) {
      const dogs = _.times(DOGS_TO_ADD, () => createDog());

      dogsCollection.insertMany(dogs);
    }
  })
  .catch(e => console.log(e));

function createDog() {
  return {
    name: faker.name.firstName(),
    about: faker.lorem.sentence(),
    breed: getBreed(),
    age: randomBetween(1, 15),
    gender: getGender(),
    pictures: [getPictures()]
  };
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
