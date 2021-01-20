require('dotenv').config();
const fs = require('fs');
const express = require('express');
require('express-async-errors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { pingInterval: 10000 });
const mongoose = require('mongoose');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const port = process.env.PORT || 3000;
const { initWS } = require('./sockets');
const subdomain = require('express-subdomain');
const apiRouter = require('./routes/api');
const secureRedirect = require('./middleware/secureRedirect');
const { APP_URL } = require('./config');
const urljoin = require('url-join');

const isDev = process.env.NODE_ENV === 'development';

mongoose.connect(isDev ? process.env.DATABASE_URL_DEV : process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});

if (!isDev) {
  app.use(limiter);
  app.set('trust proxy', 1);
  app.use(secureRedirect);
}

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(helmet());

if (isDev) {
  app.use('/static', express.static('public'));
  app.use('/api', apiRouter);
  app.use('/', express.static('dist'));
} else {
  app.use(subdomain('static', express.static('public')));
  app.use(subdomain('app', express.static('dist')));
  app.use(subdomain('api', apiRouter));
  app.use('/.well-known/pki-validation/', express.static('cert'));
  app.use('/', (req, res) => {
    res.redirect(urljoin(APP_URL + req.url));
  });
}

app.use(
  history({
    index: '/dist/index.html',
  })
);

app.use((error, req, res, next) => {
  console.error('Error handler >>> ', error.message);
  res.status(500).json({ error: 'An error occured on the server.' });
});

initWS(io);

app.set('io', io);

server.listen(port, null, () => console.log(`Server started on port ${port}`));
