const mongoose = require("mongoose");

/**
 * Mongoose schema representing a user to be stored in the database.
 */

/*
exports = mongoose.model("User", new mongoose.Schema(
    {
        legacy_id: {
            type: Number,
            required: false,
        },
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 6,
            max: 255,
        },
        ssn: {
            type: String,
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
        role: {
            type: mongoose.ObjectId,
            required: false,
        },
        reset_password: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
));*/
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
        ssn: {
            type: String,
        },
        role: {
            type: mongoose.ObjectId,
            required: false,
        },
        reset_password: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;