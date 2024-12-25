const express = require('express');
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const commonRoutes = require('./routes/commonRoute');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const server = express();

// Connect to the database
connectDB();

// Apply CORS middleware
server.use(cors({
  origin: 'http://localhost:3000', // Correct URL without trailing slash
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Handle preflight requests
server.options('*', cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Middleware
server.use(express.json());
server.use(cookieParser());

// Routes
server.use(express.static(path.join(__dirname, 'public')));
server.use('/file', express.static(path.join(__dirname, 'utils')));
server.use('/api', commonRoutes);
server.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
