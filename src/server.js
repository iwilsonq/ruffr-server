const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const router = require('./router');

const app = express();

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/ruffr');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

router(app);

mongoose.connection
  .once('open', () => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => console.log(`Ruffr server listening on http://localhost:${PORT}`));
  })
  .on('close', () => {
    console.error('dropping db');
      mongoose.connection.db.dropDatabase(function () {
        console.error('closing db connection');
        mongoose.connection.close();
      });
  })
  .on('error', error => console.warn('Warning', error));