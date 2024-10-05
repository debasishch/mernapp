const jwt = require('jsonwebtoken');
const jwtSecret = "HaHa";

const fetch = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetch;
