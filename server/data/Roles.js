const Role = require("../models/Role");
const {addNewRole} = require("../integration/roleDAO");

module.exports = async () => {
    await addNewRole(Role, "applicant");
    await addNewRole(Role, "recruiter");
}