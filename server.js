const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const Dog = require('./dog');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/ruffr');

mongoose.connection
  .once('open', () => {
    console.log('Connected to mongodb');

    Dog.remove(err => {
      app.use(express.static('public'))

      app.get('/', (req, res) => {
        Dog.find({})
          .then(result => {
            res.send(result)
          });
      });
      
      app.listen(PORT, () => console.log(`Ruffr server listening on http://localhost:${PORT}`));
    })
  })
  .on('close', () => {
    console.error('dropping db');
      mongoose.connection.db.dropDatabase(function () {
        console.error('closing db connection');
        mongoose.connection.close();
      });
  })
  .on('error', error => console.warn('Warning', error));
