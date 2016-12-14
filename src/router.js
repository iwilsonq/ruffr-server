const cloudinary = require('cloudinary');
const User = require('./models/user');
const Pet = require('./models/pet')

cloudinary.config({
  cloud_name:	'ruffr',
  api_key: '523783848114792',
  api_secret:	'NbwOB2G9tYRb4XtO7P-L27hHWPY'
});

module.exports = function(app) {
  app.get('/', (req, res) => {
    User.find({})
      .then(result => {
        res.send(result)
      });
  });

  app.get('/pets', (req, res) => {
    Pet.find({})
      .then(result => {
        res.send(result)
      });
  });

  app.post('/create', (req, res) => {
    let pictures = [];
    pictures.push(req.body.image);

    let pet = new Pet({
      name: req.body.name,
      about: req.body.about,
      pictures
    });

    pet.save();
  });

}
