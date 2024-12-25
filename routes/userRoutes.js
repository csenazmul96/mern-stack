const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const { cookie } =req.headers
    let token = cookie.replace('authToken=', '');

    // Verify the token
    console.log(token);
    const secretKey = "secretKey"; // Replace with your actual secret key
    // const decoded = jwt.verify(token, secretKey);

    // Attach the user payload to the request
    // req.user = decoded;

    // Proceed to the next middleware or route handler
    next();

    // jwt.verify(token, "secretKey", (err, user) => {
    //     console.log(err.message);
    //     if (err) return res.status(403).json({ message: "Forbidden" });
    //     req.user = user;
    //     next();
    // });
};

const router = express.Router();

// Routes
router.get('/', verifyToken, (req, res) => {
    res.json({ message: `Welcome` });
});

router.post('/',validateUser, createUser);
router.post('/logout', (req, res) => {
    res.clearCookie("authToken").json({ message: "Logged out" });
});



module.exports = router;