const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Function which generates a jsonwebtoken from a supplied ID.
 * 
 * @param userID ID that will be stored in the jsonwebtoken.
 * 
 * @return The succesfully created jsonwebtoken. 
 */
exports.generateToken = (userID, role) => {
    const token = jwt.sign(
        { id: userID,
          role: role },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
    );
    return token;
}