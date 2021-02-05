require("dotenv").config();
const jwt = require("jsonwebtoken");
const errorHandler = require("../error/errorHandler");

function authenticate(req, res, next) {
    console.log(" (api/middleware) authenticate.authenticate() triggered)");
    try {
        const token = req.cookies["access_token"];
        if (!token) res.status(401);
        /* Verify token (decoded will be the user._id stored in mongoDB */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        errorHandler.sendError(
            {
                isError: true,
                accepted: false,
                msgBody: "Token is not valid",
                code: 401,
            },
            res
        );
    }
}

module.exports = authenticate;
