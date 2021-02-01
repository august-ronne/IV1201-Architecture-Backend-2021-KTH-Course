const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.generateToken = (userID) => {
    const token = jwt.sign(
        { id: userID },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
    );
    return token;
}