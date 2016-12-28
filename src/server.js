const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const CONFIG = require('../config');
const router = require('./router');

const app = express();

mongoose.Promise = Promise;

mongoose.connect(`mongodb://${CONFIG.dbCredentials.user}:${CONFIG.dbCredentials.pass}@ds141088.mlab.com:41088/heroku_wk142pt6`);

const whitelist = ['http://localhost:1337', 'http://localhost:3000', 'https://ruffr.herokuapp.com'];

const corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({ limit: '5mb' }));



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
