const jwt = require("jsonwebtoken");
require("dotenv").config();

/* Model */
const User = require("../models/User");
/* Utils */
const hasher = require("../utils/hashing");
const tokenHandler = require("../utils/tokens");
/* Integration Layer */
const userDAO = require("../integration/userDAO");

exports.logoutAccount = async () => {};

exports.loginAccount = async ({ email, password }) => {
    console.log(" -> AuthController.loginAccount() triggered");

    const foundUser = await userDAO.findUserByEmail(User, email);
    if (!foundUser)
        throw {
            isError: true,
            accepted: false,
            error: "This email does not belong to a registered account",
            code: 400,
        };
    const correctPassword = hasher.compare(foundUser.password, password);
    if (!correctPassword)
        throw {
            isError: true,
            accepted: false,
            error: "Invalid credentials",
            code: 401,
        };
    const token = tokenHandler.generateToken(foundUser._id);
    return {
        isError: false,
        accepted: true,
        msgBody: "Successfully logged in",
        token,
        user: {
            uid: foundUser._id,
            firstName: foundUser.firstName,
            email: foundUser.email,
        },
    };
};

exports.registerAccount = async ({
    firstName,
    lastName,
    email,
    username,
    password,
}) => {
    console.log(" -> AuthController.registerAccount() triggered");

    const foundUser = await userDAO.findUserByEmail(User, email);
    if (foundUser)
        throw {
            isError: true,
            accepted: false,
            msgBody: "This email is already registered",
            code: 400,
        };
    /* email is not registered, add new user to DB */
    const hashedPassword = hasher.hashString(password);
    const user = new User({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
    });
    const newUser = await userDAO.addNewUser(user);
    return {
        isError: false,
        accepted: true,
        msgBody: "Account successfully created",
        user: {
            uid: newUser._id,
            firstName: newUser.firstName,
            email: newUser.email,
        },
    };
};

exports.getUser = async ({ user }) => {
    console.log(" -> AuthController.getUser() triggered");

    if (user == null || user.id == null) {
        throw {
            isError: true,
            accepted: false,
            msgBody: "Malformed user information",
            code: 400,
        };
    }
    const result = await userDAO.getUserByID(User, user.id);
    return {
        isError: false,
        accepted: true,
        msgBody: "User information successfully retrieved",
        user: {
            uid: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            username: result.username,
            dateOfBirth: result.dateOfBirth,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        },
    };
};

exports.checkUserAuthenticationStatus = async ({ user }) => {
    console.log(" -> AuthController.checkUserAuthenticationStatus() triggered");

    if (user == null || user.id == null) {
        throw {
            isError: true,
            accepted: false,
            msgBody: "Malformed user information",
            code: 400,
        };
    }
    const result = await userDAO.getUserByID(User, user.id);
    return {
        isError: false,
        accepted: true,
        msgBody: "This user is logged in",
        isAuthenticated: true,
        user: {
            uid: result._id,
            firstName: result.firstName,
            email: result.email,
        },
    };
};
