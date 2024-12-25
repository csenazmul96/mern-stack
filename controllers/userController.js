const User = require('../models/userModel');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password:newPass });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ errors: error.errors  });
  }
};


const userLogin = async (req, res) => {
  // try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

    return res.status(200).json({data:{token}});
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
  //
}

module.exports = { getUsers, createUser, userLogin };
