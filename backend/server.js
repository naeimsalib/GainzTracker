const path = require('path');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const { handleError } = require('./utils');

require('dotenv').config();
require('./db');

const app = express();

// Logger setup
const loggerMiddleware = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/server.log' }),
  ],
});

// Security middleware
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.',
});

app.use('/api/', apiLimiter);

// Auth middleware
app.use(require('./middleware/checkToken'));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use(require('./middleware/ensureLoggedIn')); // Protects routes below
app.use('/api/exercises', require('./routes/exercise'));
app.use('/api/workouts', require('./routes/workout'));
app.use('/api/profile', require('./routes/profile'));

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Global Error Handling
app.use((err, req, res, next) => {
  loggerMiddleware.error(err.message);
  handleError(res, err, 'Something went wrong on the server', 500);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  loggerMiddleware.info(`Server listening on port ${port}`);
});
