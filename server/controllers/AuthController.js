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

exports.loginAccount = async ({email, password}) => {
    console.log(" -> AuthController.loginAccount() triggered");

    const foundUser = await userDAO.findUserByEmail(User, email);
    if (!foundUser)
        throw {accepted: false, error: "user not found", code: 400};

    const correctPassword = hasher.compare(foundUser.password, password);
    if (!correctPassword)
        throw {accepted: false, error: "invalid credentials", code: 400};
    const token = tokenHandler.generateToken(foundUser._id);
    return {
        accepted: true,
        msg: "successfully",
        token,
        user: {
            uid: foundUser._id,
            firstName: foundUser.firstName,
            email: foundUser.email,
        },
    }
};

exports.registerAccount = async ({ firstName, lastName, email, username, password }) => {
    /******************************************************** */
    /* NO TOKEN WHEN CREATING AN ACCOUNT, ONLY WHEN LOGGING IN */
    /******************************************************** */

    console.log(" -> AuthController.registerAccount() triggered");

    const foundUser = await userDAO.findUserByEmail(User, email);
    if(foundUser)
        throw {accepted: false, error: "email is already in use", code: 400};

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
        accepted: true,
        msg: "successfully",
        user: {
            uid: newUser._id,
            firstName: newUser.firstName,
            email: newUser.email,
        },
    }
};

exports.getUser = async ({user}) => {
    console.log(" -> AuthController.getUser() triggered");

    if(user == null || user.uid == null)//if(user?.uid == null)
        throw {accepted: false, error: "malformed request", code: 400};
    
    let result = await userDAO.getUserByID(User, user.uid)
    
    return {
        accepted: true,
        user: {
            uid: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            username: result.username,
            dateOfBirth: result.dateOfBirth,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    };
};