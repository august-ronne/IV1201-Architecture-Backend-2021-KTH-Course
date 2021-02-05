const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbController = require("./controllers/DBController");

const app = express();

console.log(process.env.DB_CONNECT)
console.log(process.env.PORT)

/* Middleware */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/* API */
const authAPI = require("./api/routes/authAPI");
app.use("/", authAPI);

dbController.connectServerToDB(app);

app.on("mongodb_connection_ready", () => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server listening on port ${process.env.SERVER_PORT}`);
    });
});
