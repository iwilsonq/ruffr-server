const assert = require('assert');
const User = require('../src/models/user');
const Pet = require('../src/models/pet');

describe('User-pet associations', () => {
  
  let ian, bella;
  beforeEach(done => {
    ian = new User({ name: 'Ian' });
    bella = new Pet({
      name: 'Bella',
      pictures: [`http://localhost:4000/images/dashund.jpg`]
    });
    ian.pets.push(bella);

    Promise.all([ian.save(), bella.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a pet', done => {
    User.findOne({ name: 'Ian' })
      .populate('pets')
      .then(user => {
        assert(user.pets[0].name === 'Bella');
        done();
      });
  });

});
