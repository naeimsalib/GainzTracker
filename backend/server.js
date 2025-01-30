const path = require('path'); // Built into Node
const express = require('express');
const logger = require('morgan');
const app = express();

// Load environment variables
require('dotenv').config();

// Connect to the database
require('./db');

app.use(logger('dev'));
app.use(express.json());

// Serve static assets from the frontend's built folder (dist)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Check & verify token. If valid, attach user payload to req.user
app.use(require('./middleware/checkToken'));

// 🔹 PUBLIC ROUTES (No authentication required)
app.use('/api/auth', require('./routes/auth')); // Login & Signup

// 🔒 APPLY AUTH MIDDLEWARE ONLY FOR PROTECTED ROUTES
app.use(require('./middleware/ensureLoggedIn'));

// 🔐 PROTECTED ROUTES (Authentication required)
app.use('/api/exercises', require('./routes/exercise'));
app.use('/api/workouts', require('./routes/workout'));
app.use('/api/profile', require('./routes/profile'));

// Catch-all route for serving frontend
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});
