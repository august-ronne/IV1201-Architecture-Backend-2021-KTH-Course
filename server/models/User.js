const mongoose = require("mongoose");

/* Date of birth uses a static value until decision on front-end form design has been made */
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 6,
            max: 255,
        },
        dateOfBirth: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;