const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

const { uri } = require("./src/utils/uri");
const mongoose = require("mongoose");
const user = require("./src/routes/user.router");
const point = require("./src/routes/point.router");
const item = require("./src/routes/item.router");
const comment = require("./src/routes/comment.router");

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Error connecting to database");
    });
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", user);
app.use("/point", point);
app.use("/item", item);
app.use("/comment", comment);

module.exports = app;
