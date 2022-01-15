var express = require('express');
var router = express.Router();
const notifications = require('../controllers/notifications.controller');

router.post("/", notifications.create);
router.get("/user/:id", notifications.getUserNotifications);

module.exports = router;