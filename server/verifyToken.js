const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.PASS_SEC, (err, user) => {
            if (err) res.status(403).json({ success: false, message: 'Token is not valid!' });
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ success: false, message: 'Your are not authenticated!' });
    }
};

module.exports = { verifyToken };