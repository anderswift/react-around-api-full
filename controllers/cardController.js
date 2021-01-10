const Card = require('../models/card');
const User = require('../models/user');

function getCards(req, res) {
  return Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Requested resource not found' });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  return User.findById({ _id: req.user._id })
    .then((owner) => {
      Card.create({ name, link, owner })
        .then((card) => {
          res.status(200).send(card);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') res.status(400).send(err);
          res.status(500).send(err);
        });
    })
    .catch(() => {
      res.status(500).send({ message: 'Requested resource not found' });
    });
}

function deleteCard(req, res) {
  return Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) res.status(404).send({ message: 'The card was not found' });
      else if (!card.owner._id.equals(req.user._id)) res.status(401).send({ message: 'Current user is not authorized to delete this card' });
      else {
        Card.findByIdAndDelete({ _id: req.params.cardId })
          .then(() => {
            res.status(200).send({ message: 'This post has been deleted' });
          })
          .catch(() => {
            res.status(500).send({ message: 'Requested resource not found' });
          });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Requested resource not found' });
    });
}

function likeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) res.status(404).send({ message: 'The card was not found' });
      else res.status(200).send(card);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function unlikeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) res.status(404).send({ message: 'The card was not found' });
      else res.status(200).send(card);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
