var express = require('express');
var router = express.Router();
const category = require("../controllers/category.controller");

router.post("/", category.create);
router.get("/:id", category.getOneCategory);
router.get("/", category.getAllCategory);
router.patch("/topicCount/:id", category.updateTopicCount);
router.patch("/postCount/inc/:id", category.increasePostCount);
router.patch("/postCount/dec/:id", category.decreasePostCount);
router.patch("/:id", category.update);
router.delete("/:id", category.delete);

module.exports = router;