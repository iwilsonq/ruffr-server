const cloudinary = require('cloudinary');
const Pet = require('./models/pet');

cloudinary.config({
  cloud_name:	'ruffr',
  api_key: '523783848114792',
  api_secret:	'NbwOB2G9tYRb4XtO7P-L27hHWPY'
});

module.exports = function(app) {
  app.get('/', (req, res) => {
    Dog.find({})
      .then(result => {
        res.send(result)
      });
  });

  app.get('/dog/:id', (req, res) => {
    res.send('hello');
  });
}
