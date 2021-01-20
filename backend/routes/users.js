const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().max(200),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  }),
}), updateAvatar);

module.exports = router;
