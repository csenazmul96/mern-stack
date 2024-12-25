const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("Cookies:", req.cookies); // Debugging log
    // if (!token) return res.status(401).json({ message: "Unauthorized" });
    //
    // jwt.verify(token, "secretKey", (err, user) => {
    //     if (err) return res.status(403).json({ message: "Forbidden" });
    //     req.user = user;
    //     next();
    // });
};

module.exports = verifyToken;