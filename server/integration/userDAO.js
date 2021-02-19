const roleDAO = require("./roleDAO");
const Role = require("../models/Role");


/**
 * Integration function that adds a new user to the database.
 * 
 * @param user User object to be saved in database.
 * 
 * @return Returns stored user.
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.addNewUser = async (user) => {
    console.log(" userDAO.addNewUser() triggered")
    return await user.save();
}

/**
 * Integration function querying the database for a user based on the supplied email.
 * 
 * @param mongoDatabase Mongoose model object.
 * @param email Email that is searched for in the database.
 * 
 * @return Returns stored user.
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.findUserByEmail = async (mongoDatabase, email) => {
    console.log(" userDAO.findUserByEmail() triggered")
    return await mongoDatabase.findOne({ email });
}

/**
 * Integration function querying the database for a user based on the supplied id.
 * 
 * @param mongoDatabase Mongoose model object.
 * @param userID UserId that is being queried for in the database.
 * 
 * @return Returns stored user.
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.getUserByID = async (mongoDatabase, userID) => {
    console.log(" userDAO.getUserByID() triggered");
    return await mongoDatabase.findById(userID).select("-password");
}


/**
 * Integration function which deletes a user based on the supplied id.
 * 
 * @param  mongoDatabase Mongoose model object
 * @param  userID UserId of user to be deleted
 * 
 * @return Deleted user
 */
exports.getUserByIDAndDelete = async (mongoDatabase, userID) => {
    console.log(" -> userDAO.getUserByIDAndDelete() triggered");
    return await mongoDatabase.findByIdAndRemove(userID);
}


exports.changeRole = async (mongoDatabase, userID, newRole) => {
    console.log("roleDAO.changeRole triggered")
    const filter = {_id : userID}

    const update = { role : (await roleDAO.findRoleByName(Role, newRole))._id}
    return await mongoDatabase.findOneAndUpdate(filter, update, {new: true})
}