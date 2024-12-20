const express = require('express');
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const commonRoutes = require('./routes/commonRoute');
require('dotenv').config();
const path = require('path');

const server = express();

// Connect to the database
connectDB();

// Middleware
server.use(express.json());

// Routes
server.use('/api', commonRoutes);
server.use('/api/users', userRoutes);
server.use('/file', express.static(path.join(__dirname, 'utils')));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
