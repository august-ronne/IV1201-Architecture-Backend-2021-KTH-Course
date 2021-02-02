const mongoose = require("mongoose");
require("dotenv").config();

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