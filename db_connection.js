const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chotot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});