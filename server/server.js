const express = require("express");
const mongoose = require("mongoose");
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

mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
    console.log("Server connected to MongoDB Atlas");
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
