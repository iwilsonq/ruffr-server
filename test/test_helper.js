const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://heroku_wk142pt6:1l9d6vqn8sh9s6lnq3hvvnmihb@ds141088.mlab.com:41088/heroku_wk142pt6');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => console.warn('Warning', error));
});

beforeEach(done => {
  const { users } = mongoose.connection.collections;
  users.drop(() => done());
});
