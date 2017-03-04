import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from '../src/config';
import http from 'http';
import { createSequelize, User } from './models/index';
import passport from 'passport';
import morgan from 'morgan';
import connectSessionSequelize from 'connect-session-sequelize';
import configPassport from './utils/passportConfig';
import passportRoutes from './utils/passportRoutes';

import {loadAppData} from './services/load-app-data';

var SequelizeStore = connectSessionSequelize(session.Store);

const app = express();

// data loads asynchronously and may refresh on an interval.
// downstream code should gracefully handle it not being available.
loadAppData(app);

const server = new http.Server(app);

app.locals.sequelize = createSequelize();

app.use(session({
  secret: 'somesecret',
  store: new SequelizeStore({ db: app.locals.sequelize }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
configPassport(passport);
passportRoutes(app, passport);

const router = require('./router');
app.use(router);

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
