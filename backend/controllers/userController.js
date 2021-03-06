const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({ token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }) });
    })
    .catch(next);
}

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
}

function getUserById(req, res, next) {
  return User.findById({ _id: req.params.id })
    .then((user) => {
      if (user === null) throw new NotFoundError('User ID not found');
      else res.status(200).send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(201).send({ _id: user._id, email: user.email });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  return User.findById({ _id: req.user._id })
    .then((user) => {
      if (user === null) throw new NotFoundError('User not found');
      else {
        res.status(200).send({
          _id: user._id,
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
      }
    })
    .catch(next);
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) throw new NotFoundError('User not found');
      res.status(200).send(user);
    })
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) throw new NotFoundError('User not found');
      res.status(200).send(user);
    })
    .catch(next);
}

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
};
