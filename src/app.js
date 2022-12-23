const express = require('express');
require('colors');
const helmet = require('helmet');
const xss = require('xss-clean');
const httpStatus = require('http-status');
const passport = require('passport');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middleware/rateLimiter');
const { errorConverter, errorHandler } = require('./middleware/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// middlewear
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/api/auth', authLimiter);
}

// new routes
app.use('/v1/', routes);

app.get('/', (req, res) => {
  res.status(200).json('AgroEase Backend');
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
