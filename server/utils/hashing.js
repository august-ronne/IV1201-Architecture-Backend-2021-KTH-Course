const bcrypt = require("bcryptjs");

/**
 * Hashing function using the bcryptjs module on the supplied password.
 * 
 * @param unhashedString String that is to be hashed.
 * 
 * @return The supplied string hashed.
 */
exports.hashString = (unhashedString) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedString = bcrypt.hashSync(unhashedString, salt);
    return hashedString;
};

/**
 * Function comparing a hashedpassword with a potential unhashed equivalent.
 * 
 * @param hashedPassword String parameter that is hashed 
 * @param password String parameter that is potentially equivalent
 * 
 * @return {boolean} Whether the supplies strings are equivalent. 
 */
exports.compare = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
}
