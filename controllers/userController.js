const User = require('../models/userModel');
const Joi = require('joi');

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from DB
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {

  try {
    const { name, email, password } = req.body;


    // Create user in DB
    const newUser = await User.create({ name, email, password });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ errors: error.errors  });
  }
};

module.exports = { getUsers, createUser };
