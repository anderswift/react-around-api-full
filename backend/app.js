const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');
const NotFoundError = require('./errors/NotFoundError');

const accountRoutes = require('./routes/account');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const errorHandler = require('./errors/errorHandler');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

const app = express();

app.use(cors());
app.options('*', cors());

app.use(limiter);

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(express.json());

app.use(requestLogger);

/* for crash testing, remove after review
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
*/

app.use('/', accountRoutes);

app.use(auth);

app.use('/', cardRoutes);
app.use('/', userRoutes);

app.use('*', (req, res, next) => { next(new NotFoundError('Requested resource not found')); });

app.use(errorLogger);

// celebrate error handler
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
