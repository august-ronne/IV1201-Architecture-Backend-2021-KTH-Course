const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
    console.log("Server connected to MongoDB Atlas");
});