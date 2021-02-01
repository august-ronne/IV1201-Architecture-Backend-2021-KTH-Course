const bcrypt = require("bcryptjs");

exports.hashString = (unhashedString) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedString = bcrypt.hashSync(unhashedString, salt);
    return hashedString;
};

exports.compare = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
}
