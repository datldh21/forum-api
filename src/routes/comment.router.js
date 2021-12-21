var express = require('express');
var router = express.Router();
const comment = require('../controllers/comment.controller');

router.get('/get-comment/:id', comment.getCommentUser);
module.exports = router;