const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/* Model */
const User = require("../models/User");
/* Utils */
const hasher = require("../utils/hashing");
const tokenHandler = require("../utils/tokens");
/* Integration Layer */
const userDAO = require("../integration/userDAO");

exports.logoutAccount = async (req, res) => {};

exports.loginAccount = async (req, res) => {
    console.log(" -> AuthController.loginAccount() triggered");

    const { email, password } = req.body;

    try {
        const foundUser = await userDAO.findUserByEmail(User, email);
        if (!foundUser)
            return res.status(400).send("This email is not registered");
        /* Valid email, proceed with authenticating user */
        const correctPassword = hasher.compare(foundUser.password, password);
        if (!correctPassword)
            res.status(400).json({ msg: "Invalid credentials" });
        const token = tokenHandler.generateToken(foundUser._id);
        /* User successfully logged in, send back needed data */
        res.json({
            token,
            user: {
                uid: foundUser._id,
                firstName: foundUser.firstName,
                email: foundUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error when querying database");
    }
};

exports.registerAccount = async (req, res) => {
    /******************************************************** */
    /* NO TOKEN WHEN CREATING AN ACCOUNT, ONLY WHEN LOGGING IN */
    /******************************************************** */

    console.log(" -> AuthController.registerAccount() triggered");

    const { firstName, lastName, email, username, password } = req.body;

    /* Check if email is already registered */
    try {
        const foundUser = await userDAO.findUserByEmail(User, email);
        if (foundUser)
            return res
                .status(400)
                .json({ msg: "This email is already registered" });
    } catch (error) {
        console.log(error);
        res.status(500).send("This email is already registered");
    }

    /* email is not registered, add new user to DB */
    const hashedPassword = hasher.hashString(password);
    const user = new User({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
    });

    try {
        const newUser = await userDAO.addNewUser(user);
        res.json({
            msg: "New account registered successfully",
            user: {
                uid: newUser._id,
                firstName: newUser.firstName,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error when querying DB");
    }
};

exports.getUser = async (req, res) => {

    console.log(" -> AuthController.getUser() triggered");

    const userID = req.user.id;
    try {
        const user = await userDAO.getUserByID(User, userID);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error when querying DB");
    }
};

exports.testingTokens = (req, res) => {
    res.send("This is a protected route");
};
