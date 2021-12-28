var express = require('express');
var router = express.Router();
const post = require('../controllers/post.controller');

router.post("/", post.create);
router.get("/:id", post.getOnePost);
router.get("/topic/:id", post.getTopicPost);
router.get("/user/:id", post.getUserPost);
router.patch("/:id", post.update);
router.delete("/:id", post.delete);

module.exports = router;