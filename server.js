const express = require('express');
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const server = express();

// Connect to the database
connectDB();

// Middleware
server.use(express.json());

// Routes
server.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
