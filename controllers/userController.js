const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const User = require('../models/user');

function login(req, res) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({ token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }) });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
}

function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Requested resource not found' });
    });
}

function getUserById(req, res) {
  return User.findById({ _id: req.params.id })
    .then((user) => {
      if (user === null) res.status(404).send({ message: 'User ID not found' });
      else res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Requested resource not found' });
    });
}

function createUser(req, res) {
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
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send(err);
      res.status(500).send(err);
    });
}

function getCurrentUser(req, res) {
  return User.findById({ _id: req.user._id })
    .then((user) => {
      if (user === null) res.status(404).send({ message: 'User not found' });
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
    .catch(() => {
      res.status(500).send({ message: req.user._id });
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) res.status(404).send({ message: 'User not found' });
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) res.status(404).send({ message: 'User not found' });
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send(err);
      res.status(500).send(err);
    });
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
