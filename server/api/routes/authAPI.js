const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authController = require("../../controllers/AuthController");
const errorHandler = require("../error/errorHandler");

/**
 * Route for user registration.
 * 
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express response object.
 * 
 * return 201: User got registered correctly.
 * return 400: Necessary information is not supplied.
 * return 500: Database error.
 */
router.post("/auth/register", async (req, res) => {
    let { firstName, lastName, email, username, password } = req.body;
    if (!firstName || !lastName || !email || !username || !password) {
        errorHandler.sendError(
            {
                isError: true,
                accepted: false,
                msgBody: "Credentials missing",
                code: 400,
            },
            res
        );
    }
    try {
        let result = await authController.registerAccount(req.body);
        res.status(201).json({ serverMessage: result });
    } catch (error) {
        errorHandler.sendError(error, res);
    }
});

/**
 * Route for user login.
 * 
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express request object.
 * 
 * return 200: User login succesful.
 * return 400: Missing credentials for login.
 * return 500: Database error.
 * 
 */

router.post("/auth/login", async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        errorHandler.sendError(
            {
                isError: true,
                accepted: false,
                msgBody: "Credentials missing",
                code: 400,
            },
            res
        );
    }
    try {
        const result = await authController.loginAccount(req.body);
        const { token, user } = result;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: true,
        });
        res.status(200).json({
            isAuthenticated: true,
            user,
            serverMessage: {
                isError: false,
                accepted: true,
                msgBody: "Successfully logged in",
            },
        });
    } catch (error) {
        errorHandler.sendError(error, res);
    }
});

/**
 * Route for user logout.
 * Clears cookie handling session.
 * 
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express request object.
 * 
 * return 200: User logout succesful.
 */

router.get("/auth/logout", (req, res) => {
    console.log("API logout");
    res.clearCookie("access_token");
    res.status(200).json({
        user: {
            uid: "",
            firstName: "",
            email: "",
        },
        serverMessage: {
            isError: false,
            accepted: true,
            msgBody: "Successfully logged out",
        },
    });
});

/**
 * Route for querying user from database.
 * 
 * @param {String} endpoint url endpoint.
 * @param authenticate middleware handling authentication.
 * @param req Express request object.
 * @param res Express request object.
 * 
 * return 200: User succesfully queried from database.
 * return 500: Database error.
 */
router.get("/auth/user", authenticate, async (req, res) => {
    try {
        const result = await authController.getUser(req);
        const { user, isAuthenticated, ...rest } = result;
        console.log(user);
        console.log(isAuthenticated);
        res.status(200).json({
            isAuthenticated,
            user,
            serverMessage: rest,
        });
    } catch (error) {
        errorHandler.sendError(error, res);
    }
});

/**
 * Route for querying user to see if authenticated.
 * 
 * @param {String} endpoint url endpoint.
 * @param authenticate middleware handling authentication.
 * @param req Express request object.
 * @param res Express request object.
 * 
 * return 200: User authenticated.
 * return 500: Database error.
 */

router.get("/auth/authenticated", authenticate, async (req, res) => {
    console.log(" (api/routes) GET /auth/authenticated triggered");
    if (res.status === 401) {
        errorHandler.sendError({
            user: {
                uid: "",
                firstName: "",
                email: "",
            },
            serverMessage: {
                isError: false,
                accepted: true,
                msgBody: "Client user is not logged in",
            },
        })
    }
    try {
        const result = await authController.checkUserAuthenticationStatus(req);
        const { user, isAuthenticated, ...rest } = result;
        res.status(200).json({
            isAuthenticated,
            user,
            serverMessage: rest,
        });
    } catch (error) {
        errorHandler.sendError(error, res);
    }
});

module.exports = router;
