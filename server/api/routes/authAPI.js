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
            serverMessage: {
                isError: false,
                accepted: true,
                msgBody: "Successfully logged in",
                isAuthenticated: true,
                user,
            },
        });
    } catch (error) {
        errorHandler.sendError(e, res);
    }
});

router.get("/auth/logout", authenticate, (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({
        serverMessage: {
            isError: false,
            accepted: true,
            msgBody: "Successfully logged out",
            user: {
                uid: "",
                firstName: "",
                email: "",
            },
        },
    });
});

/* Protected route, second arg 'auth' is the middleware imported at top */
router.get("/auth/user", authenticate, async (req, res) => {
    try {
        const result = await authController.getUser(req);
        res.status(200).json({
            serverMessage: result,
        });
    } catch (error) {
        errorHandler.sendError(error, res);
    }
});

router.get("/auth/authenticated", authenticate, async (req, res) => {
    try {
        const result = await authController.getUserAuthenticationStatus(req);
        res.status(200).json({
            serverMessage: result,
        });
    } catch (error) {
        errorHandler.sendError(error, res);
    }
})

module.exports = router;
