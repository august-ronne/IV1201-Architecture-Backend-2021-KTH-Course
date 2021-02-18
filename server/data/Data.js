const roles = require("./Roles");
/**
 * Initializes all data.
 */
module.exports = async () => {
    try {
        await roles();
    }
    catch(e) {
        console.log("Role Error (Duplicate) (Good)");
    }
}