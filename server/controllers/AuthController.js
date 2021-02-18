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

/**
 * Controller functions which deletes a user from the database.
 * @param userID ID of user that should be deleted
 * 
 * @return Object with relevant information 
 */
exports.deleteAccount = async(userID) => {
    console.log(" -> AuthController.deleteAccount() triggered")

    let user = await userDAO.getUserByIDAndDelete(User, userID)

    return {
        isError: false,
        accepted: true,
        user: {
            uid: user._id,
            email: user.email
        }
    }
} 
/**
 * Controller function handling login.
 *
 * @param object Email and password from request.
 *
 * @return {object} Object holding request status and user information
 *
 * @throws 400 error: If a non-eligible user tries to login
 * @throws 401 error: If a eligible user enters wrong credentials
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.loginAccount = async ({ email, password }) => {
    console.log(" AuthController.loginAccount() triggered");

    const foundUser = await userDAO.findUserByEmail(User, email);
    if (!foundUser)
        throw {
            isError: true,
            msgBody: "This email does not belong to a registered account",
            code: 400,
        };
    const correctPassword = hasher.compare(foundUser.password, password);
    if (!correctPassword)
        throw {
            isError: true,
            msgBody: "Invalid credentials",
            code: 401,
        };
    const token = tokenHandler.generateToken(foundUser._id);
    return {
        isError: false,
        msgBody: "Successfully logged in",
        code: 200,
        isAuthenticated: true,
        token,
        user: {
            uid: foundUser._id,
            firstName: foundUser.firstName,
            email: foundUser.email,
        },
    };
};

/**
 * Controller function handling registration
 *
 * @param object Object holding all necessary user information
 *
 * @return {object} Returns object holding transaction information and relevant
 *                  information about the registered user.
 *
 * @throws 400 error: If a user with the email is already registered.
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.registerAccount = async ({
    firstName,
    lastName,
    email,
    username,
    password,
}) => {
    console.log(" AuthController.registerAccount() triggered");

    const foundUser = await userDAO.findUserByEmail(User, email);
    if (foundUser)
        throw {
            isError: true,
            msgBody: "This email is already registered",
            code: 400,
        };
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
        msgBody: "Account successfully created",
        code: 201,
        user: {
            uid: newUser._id,
            firstName: newUser.firstName,
            email: newUser.email,
        },
    };
};

/**
 * Controller function querying for user information from database
 *
 * @param object Object representing user
 *
 * @return {object} Object holding transaction information and user information.
 * 
 * @throws 400 error: If query is malformed.
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.getUser = async ({ user }) => {
    console.log(" AuthController.getUser() triggered");

    if (user == null || user.id == null) {
        throw {
            isError: true,
            accepted: false,
            msgBody: "Malformed user information",
            code: 400,
        };
    }
    // console.log('test' + user)
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

/**
 * Controller function checking user authenticated status
 *
 * @param object Object holding user information
 *
 * @returns {object} Object holding relevant query information, user authenticated status
 *                   , HTTP Status Code, and user information
 *
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.checkUserAuthenticationStatus = async ({ user }) => {
    console.log(" AuthController.checkUserAuthenticationStatus() triggered");

    const result = await userDAO.getUserByID(User, user.id);
    return {
        isError: false,
        msgBody: "This user is logged in",
        code: 200,
        isAuthenticated: true,
        user: {
            uid: result._id,
            firstName: result.firstName,
            email: result.email,
            //role: result.role
        },
    };
};
