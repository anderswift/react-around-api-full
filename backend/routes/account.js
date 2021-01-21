const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { login, createUser } = require('../controllers/userController');

const router = express.Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10),
  }),
}), createUser);

module.exports = router;
