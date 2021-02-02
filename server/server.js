const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

/* Middleware */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/* API */
const authAPI = require("./api/routes/authAPI");
app.use("/", authAPI);

require("./controllers/DBController");

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
