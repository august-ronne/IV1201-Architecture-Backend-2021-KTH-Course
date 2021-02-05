const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbController = require("./controllers/DBController");

const app = express();

/* Middleware */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

/* API */
const authAPI = require("./api/routes/authAPI");
app.use("/", authAPI);

dbController.connectServerToDB(app);

app.on("mongodb_connection_ready", () => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server listening on port ${process.env.SERVER_PORT}`);
    });
});
