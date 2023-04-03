const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const sentryConfig = require('../../constant/sentry');
const { sequelize } = require('../../domain/models/index');

// import routes
const healthRouter = require('./routes/health/health');
const userRouter = require('./routes/user/user');
const parentRouter = require('./routes/parent/parent');
const babyRouter = require('./routes/baby/baby');
const measurementRouter = require('./routes/measurement/measurement');

// check environment
require('../../config/environment')();

class Server {
  constructor() {
    this.plugin();
  }

  plugin() {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json({ limit: '10mb' }));
    app.use(logger('dev'));
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static('public'));

    if (process.env.APP_ENV !== 'local') {
      Sentry.init({
        dsn: sentryConfig.sentry.SENTRY_DSN,
        environment: sentryConfig.sentry.SENTRY_ENVIRONMENT,
        integrations: [
          new Sentry.Integrations.Http({ tracing: true }),
          new Tracing.Integrations.Express({ app }),
          new Tracing.Integrations.Mysql(),
          new Tracing.Integrations.Mongo({ useMongoose: true }),
        ],
      });
      app.use(Sentry.Handlers.requestHandler());
      app.use(Sentry.Handlers.tracingHandler());
    }
  }

  start() {
    app.use('/health', healthRouter);
    app.use('/api/user', userRouter);
    app.use('/api/parent', parentRouter);
    app.use('/api/baby', babyRouter);
    app.use('/api/measurement', measurementRouter);
    app.use('/', (req, res) => {
      res.send('Welcome to the API');
    });

    sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });
  }
}

module.exports = {
  app,
  Server,
};
