/**
 * Integration function that adds a new role to the database.
 * 
 * @param mongoDatabase Mongoose model object.
 * @param name Name of the role.
 * 
 * @return Returns stored role.
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.addNewRole = async (mongoDatabase, name) => {
    console.log(" roleDAO.addNewRole() triggered")
    return await new mongoDatabase({ name: name }).save();
}

/**
 * Integration function querying the database for a Role based on name.
 * 
 * @param mongoDatabase Mongoose model object.
 * @param role Role that is searched for in the database.
 * 
 * @return Returns stored user.
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.findRoleByName = async (mongoDatabase, role) => {
    console.log(" roleDAO.findRoleByName() triggered")
    return await mongoDatabase.findOne({ name: role });
}

/**
 * Integration function querying the database for a user based on the supplied id.
 * 
 * @param mongoDatabase Mongoose model object.
 * @param roleId RoleId that is being queried for in the database.
 * 
 * @return Role object.
 * @throws 500 error: Internal server error caused by server <-> db communication
 */
exports.getRoleById = async (mongoDatabase, roleId) => {
    console.log(" roleDAO.getRoleById() triggered");
    return await mongoDatabase.findById(roleId);
}

