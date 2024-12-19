const mongoose = require('mongoose');

// MongoDB URI
const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;