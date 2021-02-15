require("dotenv").config();
const jwt = require("jsonwebtoken");

const responseHandler = require("../serverResponses/responseHandler");

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
    console.log(" (api/middleware) authenticate.authenticate() triggered)");
    try {
        const token = req.cookies["access_token"];
        if (!token) res.status(401);
        /* Verify token (decoded will be the user._id stored in mongoDB */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        responseHandler.sendResponse({
            isError: true,
            msgBody: "Token is not valid",
            code: 401,
        });
    }
}

module.exports = authenticate;
