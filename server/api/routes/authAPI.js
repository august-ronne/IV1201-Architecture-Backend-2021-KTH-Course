const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authController = require("../../controllers/AuthController");
const errorHandler = require("../error/errorHandler");

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
        errorHandler.sendError(e, res);
    }
});

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

/* Protected route, second arg 'auth' is the middleware imported at top */
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

router.get("/auth/authenticated", authenticate, async (req, res) => {
    console.log("API authenticate");
    try {
        const result = await authController.checkUserAuthenticationStatus(req);
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

module.exports = router;
