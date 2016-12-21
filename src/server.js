const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const router = require('./router');

const app = express();

mongoose.Promise = Promise;

mongoose.connect('mongodb://heroku_wk142pt6:1l9d6vqn8sh9s6lnq3hvvnmihb@ds141088.mlab.com:41088/heroku_wk142pt6');

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({ limit: '5mb' }));
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
