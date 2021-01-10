const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'You must provide a valid email address.',
    }
  },
  password: {
    type: String,
    minlength: 10,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'] }),
      message: 'You must provide a valid URL for the user avatar.',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
