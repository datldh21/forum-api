var express = require('express');
var router = express.Router();
const topic = require("../controllers/topic.controller");

router.post("/", topic.create);
router.get("/:id", topic.getOneTopic);
router.get("/category/:id", topic.getCategoryTopic);
router.get("/recent", topic.getRecentTopic);
router.patch("/:id", topic.update);
router.delete("/:id", topic.delete);

module.exports = router;