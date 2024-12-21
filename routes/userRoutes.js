const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("Cookies:", req.cookies); // Debugging log
    // const token = req.cookies.authToken;
     return res.status(401).json({ message: "Unauthorized" });
    //
    // jwt.verify(token, "secretKey", (err, user) => {
    //     if (err) return res.status(403).json({ message: "Forbidden" });
    //     req.user = user;
    //     next();
    // });
};

const router = express.Router();

// Routes
// router.get('/', getUsers);
router.post('/',validateUser, createUser);
router.post('/logout', (req, res) => {
    res.clearCookie("authToken").json({ message: "Logged out" });
});

router.get('/', verifyToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}` });
});

module.exports = router;