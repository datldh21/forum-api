const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

const { uri } = require("./src/utils/uri");
const mongoose = require("mongoose");
const user = require("./src/routes/user.router");
const post = require("./src/routes/post.router");
const topic = require("./src/routes/topic.router");
const category = require("./src/routes/category.router");
const notifications = require("./src/routes/notifications.router");

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
app.use("/post", post);
app.use("/topic", topic);
app.use("/category", category);
app.use("/notifications", notifications);

module.exports = app;
