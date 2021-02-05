const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbController = require("./controllers/DBController");

const app = express();

/**
 *  Middleware
 */ 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

/**
 * API routes
 */
const authAPI = require("./api/routes/authAPI");
app.use("/", authAPI);

dbController.connectServerToDB(app);

/**
 * Starts server on supplied port.
 */
app.on("mongodb_connection_ready", () => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
});
