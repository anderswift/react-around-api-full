const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { login, createUser } = require('./controllers/userController');
const userRoutes = require('./routes/users.js');
const cardRoutes = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// temporary substitute for authorization
app.use((req, res, next) => {
  req.user = { _id: '5fcd2f22bc67b45ae23cf625' };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', cardRoutes);
app.use('/', userRoutes);

app.use('*', (req, res) => { res.status(404).send({ message: 'Requested resource not found' }); });

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
