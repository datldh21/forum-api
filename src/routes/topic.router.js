var express = require('express');
var router = express.Router();
const topic = require("../controllers/topic.controller");

router.post("/", topic.create);
router.get("/:id", topic.getOneTopic);
router.get("/category/:id", topic.getCategoryTopic);
router.get("/1/recent", topic.getRecentTopic);
router.get("/1/popular", topic.getPopularTopic);
router.patch("/viewCount/:id", topic.updateViewCount);
router.patch("/postCount/inc/:id", topic.increasePostCount);
router.patch("/postCount/dec/:id", topic.decreasePostCount);
router.patch("/voteCount/inc/:id", topic.increaseVotes);
router.patch("/voteCount/dec/:id", topic.decreaseVotes);
router.patch("/:id", topic.update);
router.delete("/:id", topic.delete);

module.exports = router;