const { body, validationResult } = require('express-validator');

const validateUser = [
  body('name').isString().isLength({ min: 3, max: 30 }).withMessage('Name must be 3-30 characters'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').notEmpty()  .withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUser;
