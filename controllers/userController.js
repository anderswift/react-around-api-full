const User = require('../models/user');

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
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send(err);
      res.status(500).send(err);
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
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
