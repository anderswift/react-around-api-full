const Card = require('../models/card');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

function getCards(req, res, next) {
  return Card.find({}).sort({ createdAt: -1 })
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  return User.findById({ _id: req.user._id })
    .then((owner) => {
      Card.create({ name, link, owner })
        .then((card) => {
          res.status(201).send(card);
        })
        .catch(next);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  return Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) throw new NotFoundError('The card was not found');
      else if (!card.owner._id.equals(req.user._id)) throw new UnauthorizedError('Current user is not authorized to delete this card');
      else {
        Card.findByIdAndDelete({ _id: req.params.cardId })
          .then(() => {
            res.status(200).send({ message: 'This post has been deleted' });
          })
          .catch(next);
      }
    })
    .catch(next);
}

function likeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError('The card was not found');
      else res.status(200).send(card);
    })
    .catch(next);
}

function unlikeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError('The card was not found');
      else res.status(200).send(card);
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
