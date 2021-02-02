require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        const token = req.header("x-auth-token");
        /* Check for token */
        if (!token)
            res.status(401).json({ msg: "No token, authorization denied " });
        /* Verify token (decoded will be the user._id stored in mongoDB */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        /* Add user from payload */
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: "Token is not valid " });
    }
}

module.exports = auth;
