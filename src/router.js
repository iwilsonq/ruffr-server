const cloudinary = require('cloudinary');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const User = require('./models/user');
const Pet = require('./models/pet')

const CONFIG = require('../config');
cloudinary.config(CONFIG.cloudConfig);

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

  app.post('/create', multipartMiddleware, (req, res) => {
    cloudinary.v2.uploader.upload(req.body.image,
      { width: 300, height: 280, crop: 'lfill'} , (err, result) => {

      const pet = new Pet({
        name: req.body.name,
        about: req.body.about,
        image: result.url,
        image_id: result.public_id,
        createdAt: Date.now()
      });

      pet.save(err => {
        if (err) res.send(err);
      })
      .then(() => {
        res.send('New post: ' + req.body.name + ' created!')
      });
    });
  });

  app.post('/destroy', (req, res) => {
    const imageId = req.body.image_id;

    cloudinary.v2.uploader.destroy(imageId, (error, result) => {
      Pet.findOneAndRemove({ image_id: imageId }, err => {
        if (err) res.send(err);
        res.send(`${imageId} successfully deleted!`);
      })
    })
  });

}
