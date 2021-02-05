/* The integration layer shouldn't know (import) any other part
    of the project, and only the Controller should know about
    the integration layer
*/

exports.addNewUser = async (user) => {
    console.log(" userDAO.addNewUser() triggered")
    return await user.save();
}

exports.findUserByEmail = async (mongoDatabase, email) => {
    console.log(" userDAO.findUserByEmail() triggered")
    return await mongoDatabase.findOne({ email });
}

exports.getUserByID = async (mongoDatabase, userID) => {
    console.log(" userDAO.getUserByID() triggered");
    return await mongoDatabase.findById(userID).select("-password");
}
