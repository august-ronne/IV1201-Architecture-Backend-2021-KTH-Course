const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbController = require("./controllers/DBController");
const data = require("./data/Data");

const app = express();

/**
 *  Middleware
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

/**
 * API routes
 */
const authAPI = require("./api/routes/authAPI");
app.use("/", authAPI);

/**
 * Attempt to connect to database
 */
try {
    dbController.connectServerToDB(app);
} catch (error) {
    console.log("Could not connect to MongoDB Cloud Database");
    console.log(error);
}

/**
 * Starts server on supplied port.
 */
app.on("mongodb_connection_ready", async () => {
    await data();
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
});

exports.app = app;