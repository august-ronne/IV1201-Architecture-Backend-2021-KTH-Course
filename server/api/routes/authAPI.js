const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = require("../middleware/authenticate");
const authController = require("../../controllers/AuthController");
const responseHandler = require("../serverResponses/responseHandler");
const {
    registerValidationSchema,
    loginValidationSchema,
    isValidationError,
} = require("../../utils/validation");


/**
 * Route for user registration.
 *
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express response object.
 *
 * @return 201: Recover token generated correctly.
 * @return 400: Necessary information is not supplied.
 * @return 500: Database error.
 */
router.post("/auth/recover", async (req, res) => {
    console.log(" (api/routes) POST /auth/recover triggered");
    try {
        let result = await authController.recoverAccount(req.body);
        responseHandler.sendResponse(result, res);
    } catch (error) {
        if (isValidationError(error)) {
            console.log(error);
            responseHandler.sendResponse(
                {
                    isError: true,
                    msgBody:
                        "error.badRequest",//"Bad request (either missing fields or faulty values)",
                    code: 400,
                },
                res
            );
        } else {
            responseHandler.sendResponse(error, res);
        }
    }
});


/**
 * Route for user registration.
 *
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express response object.
 *
 * @return 201: Recover token generated correctly.
 * @return 400: Necessary information is not supplied.
 * @return 500: Database error.
 */
router.post("/auth/setpassword", async (req, res) => {
    console.log(" (api/routes) POST /auth/setpassword triggered");
    try {
        let result = await authController.setPassword(req.body);
        responseHandler.sendResponse(result, res);
    } catch (error) {
        if (isValidationError(error)) {
            console.log(error);
            responseHandler.sendResponse(
                {
                    isError: true,
                    msgBody:
                        "error.badRequest",
                    code: 400,
                },
                res
            );
        } else {
            responseHandler.sendResponse(error, res);
        }
    }
});


/**
 * Route for user registration.
 *
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express response object.
 *
 * @return 201: User got registered correctly.
 * @return 400: Necessary information is not supplied.
 * @return 500: Database error.
 */
router.post("/auth/register", async (req, res) => {
    console.log(" (api/routes) POST /auth/register triggered");
    try {
        delete req.body.confirmPassword;
        const validatedRequest = await registerValidationSchema.validateAsync(
            req.body
        );
        const result = await authController.registerAccount(validatedRequest);
        responseHandler.sendResponse(result, res);
    } catch (error) {
        if (isValidationError(error)) {
            console.log(error);
            responseHandler.sendResponse(
                {
                    isError: true,
                    msgBody:
                        "error.badRequest",//"Bad request (either missing fields or faulty values)",
                    code: 400,
                },
                res
            );
        } else {
            responseHandler.sendResponse(error, res);
        }
    }
});

/**
 * Route for user login.
 *
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express request object.
 *
 * @return 200: User login succesful.
 * @return 400: Missing credentials for login.
 * @return 500: Database error.
 *
 */
router.post("/auth/login", async (req, res) => {
    console.log(" (api/routes) POST /auth/login triggered");

    try {
        const validatedRequest = await loginValidationSchema.validateAsync(
            req.body
        );
        const result = await authController.loginAccount(validatedRequest);
        const { token } = result;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: true,
        });
        responseHandler.sendResponse(result, res);
    } catch (error) {
        if (isValidationError(error)) {
            responseHandler.sendResponse(
                {
                    isError: true,
                    accepted: false,
                    msgBody:
                        "error.badRequest",//"Bad request (either missing fields or faulty values)",
                    code: 400,
                },
                res
            );
        } else {
            responseHandler.sendResponse(error, res);
        }
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
 * @return 200: User logout succesful.
 */

router.get("/auth/logout", (req, res) => {
    console.log(" (api/routes) GET /auth/logout triggered");
    res.clearCookie("access_token");
    responseHandler.sendResponse(
        {
            isError: false,
            msgBody: "accepted.logout",//"You have successfully logged out",
            code: 200,
            user: {
                uid: "",
                firstName: "",
                email: "",
            },
        },
        res
    );
});

/**
 * Route for checking if the user browsing the calling client is logged in or not.
 *
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express request object.
 *
 * @return 200: User is not logged in.
 * @return 200: User does not have a token, and is thus logged out.
 * @return 400: User has supplied an invalid token.
 * @return 500: Database error.
 */
router.get("/auth/userstatus", async (req, res) => {
    try {
        const token = req.cookies["access_token"];
        if (!token) {
            responseHandler.sendResponse(
                {
                    isError: false,
                    msgBody: "accepted.login",//"This user is not logged in",
                    code: 200,
                    isAuthenticated: false,
                    user: {
                        uid: "",
                        firstName: "",
                        email: "",
                        role: ""
                    },
                },
                res
            );
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
            req.user = decoded;
            const result = await authController.checkUserAuthenticationStatus(
                req
            );
            responseHandler.sendResponse(result, res);
        }
    } catch (error) {
        if (error.code || error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            responseHandler.sendResponse(
                {
                    isError: true,
                    msgBody: "error.token",//"User has supplied an invalid token",
                    code: 400,
                    isAuthenticated: false,
                    user: {
                        uid: "",
                        firstName: "",
                        email: "",
                    },
                },
                res
            );
        } else {
            responseHandler.sendResponse(error, res);
        }
    }
});

/**
 * Route for upgrading a user to recruiter.
 * 
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express request object.
 *
 * @return 200: User upgraded.
 * @return 400: User not successfully upgraded
 * @return 500: Database error.
 */

router.post("/auth/upgrade", async (req,res) => {
    console.log(" (api/routes) POST /auth/upgrade triggered");
    // 602ecb9cc7401f203586617c
    try {
        const result = await authController.upgradeUser(req.body.id)
        responseHandler.sendResponse(result, res);

    }
    catch(error) {
        responseHandler.sendResponse(
            {
                isError: false,
                msgBody: "error.upgrade",//"Change of user role was not successful",
                code: 400,
                user: {
                    uid: "",
                    firstName: "",
                    email: "",
                },
            },
            res
        );
    }
})




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
    console.log(" (api/routes) GET /auth/user triggered");
    try {
        const result = await authController.getUser(req);
        const { user, isAuthenticated, ...rest } = result;
        // console.log(user);
        // console.log(isAuthenticated);
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
                msgBody: "error.authenticated",//"Client user is not logged in",
            },
        });
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
