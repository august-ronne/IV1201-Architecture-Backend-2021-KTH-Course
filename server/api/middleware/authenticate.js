require("dotenv").config();
const jwt = require("jsonwebtoken");
const errorHandler = require("../error/errorHandler");

/**
 * Middleware function verifying jwt token attached in cookie.
 * 
 * @param req Request object
 * @param res Response object
 * @param next Next function in chain
 * 
 * returns 401: If no token present or if token not valid.
 * 
 * Otherwise calls next function.
 */
function authenticate(req, res, next) {
    try {
        const token = req.cookies["access_token"];
        /* Check for token */
        if (!token) {
            errorHandler.sendError(
                {
                    isError: true,
                    accepted: false,
                    msgBody: "No token, not authorized",
                    code: 401,
                },
                res
            );
        }
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
