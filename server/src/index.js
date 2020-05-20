require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

/**
 * Middleware
 */

app.use(express.json());
app.use(cors());

/**
 * Routes
 */
app.get('/', (req, res) => {
  res.send('Nothing to see here');
});

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const mapsRouter = require('./routes/maps');
app.use('/maps', mapsRouter);

const playersRouter = require('./routes/players');
app.use('/players', playersRouter);

const stratsRouter = require('./routes/strats');
app.use('/strats', stratsRouter);

const stepsRouter = require('./routes/steps');
app.use('/steps', stepsRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
