const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Function connecting to MongoDb database through mongoose package.
 * Uses database connection string stored in .env. 
 * 
 * @param app App object
 */
exports.connectServerToDB = (app) => {
    mongoose.connect(process.env.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    mongoose.connection.once("open", () => {
        app.emit("mongodb_connection_ready");
        console.log("Server connected to MongoDB Atlas");
    });
}


let dbStatus = false;

exports.jestDB = () => {
    let callback;
    let promise = new Promise((resolve, reject) => {
        callback = () => {resolve(); dbStatus = true};
    })
    if(dbStatus)
        return callback();
    mongoose.connect(process.env.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    mongoose.connection.once("open", callback);
    return promise;
}