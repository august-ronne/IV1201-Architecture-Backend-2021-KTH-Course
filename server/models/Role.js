const mongoose = require("mongoose");

/**
 * Mongoose schema representing a role to be stored in the database.
 */

const roleSchema = new mongoose.Schema(
    {
        legacy_id: {
            type: Number,
            required: false,
        },
        name: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;

//test