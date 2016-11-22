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
    app.listen(PORT, () => console.log(`Ruffr server listening on http://localhost:${PORT}`));
  })
  .on('error', error => console.warn('Warning', error));

app.get('/', (req, res) => {
  Dog.find({})
    .then(result => res.send(result));

});
