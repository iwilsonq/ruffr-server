const assert = require('assert');
const User = require('../src/models/user');

describe('Creating records', () => {
  it('saves a user', done => {
    const ian = new User({ name: 'Ian' });
    ian.save()
      .then(() => {
        assert(!ian.isNew);
        done();
      });
  });
})
