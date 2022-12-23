const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { sequelize } = require('./config/database');
const { association } = require('./models/associations');

let server;
try {
  // database
  sequelize.authenticate();

  // get associations
  association();

  // sync all models
  sequelize.sync({ alter: true });

  logger.info(`All models synced`.cyan);

  // server
  server = app.listen(config.port, () => {
    logger.info(`Listening on port: ${config.port}`.cyan);
  });
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
