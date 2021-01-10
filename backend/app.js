const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');
const NotFoundError = require('./errors/NotFoundError');

const { login, createUser } = require('./controllers/userController');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(express.json());

app.use(requestLogger);

// app.use(express.static(path.join(__dirname, 'public')));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10),
  }),
}), createUser);

app.use(auth);

app.use('/', cardRoutes);
app.use('/', userRoutes);

app.use('*', (req, res, next) => { next(new NotFoundError('Requested resource not found')); });

app.use(errorLogger);

// celebrate error handler
app.use(errors());

app.use((err, req, res, next) => {
  const defaultStatus = (err.name === 'ValidationError') ? 400 : 500;
  const { statusCode = defaultStatus, message = 'An error occurred on the server' } = err;
  res.status(statusCode).send({ message });
});

app.listen(PORT);
