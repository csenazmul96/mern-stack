const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

// Routes
router.get('/', getUsers);
router.post('/',validateUser, createUser);

module.exports = router;