var express = require("express");
var router = express.Router();
const user = require("../controllers/user.controller");
const multer = require("multer");

var upload = multer({ dest: "public/uploads" });
router.post("/", user.login);
router.get("/info/:id", user.getInfo);
router.get("/total", user.getInfoTotal);
router.patch("/info/:id", user.update);

module.exports = router;
