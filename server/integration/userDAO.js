/**
 * Integration function that adds a new user to the database.
 * 
 * @param user User object to be saved in database.
 * 
 * @return Returns stored user.
 */
exports.addNewUser = async (user) => {
    console.log(" -> userDAO.addNewUser() triggered")
    return await user.save();
}

/**
 * Integration function querying the database for a user based on the supplied email.
 * 
 * @param mongoDatabase Mongoose model object.
 * @param email Email that is searched for in the database.
 * 
 * @return Returns stored user.
 */
exports.findUserByEmail = async (mongoDatabase, email) => {
    console.log(" -> userDAO.findUserByEmail() triggered")
    return await mongoDatabase.findOne({ email });
}

/**
 * Integration function querying the database for a user based on the supplied id.
 * 
 * @param mongoDatabase Mongoose model object.
 * @param userID UserId that is being queried for in the database.
 * 
 * @return Returns stored user.
 */
exports.getUserByID = async (mongoDatabase, userID) => {
    console.log(" -> userDAO.getUserByID() triggered");
    return await mongoDatabase.findById(userID).select("-password");
}
