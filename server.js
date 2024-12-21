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

// Middleware
server.use(express.json());

// Routes
server.use('/api', commonRoutes);
server.use('/api/users', userRoutes);
server.use('/file', express.static(path.join(__dirname, 'utils')));
server.use(cookieParser());

server.use(cors({
  origin: 'http://localhost:5000', // Frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
}));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
