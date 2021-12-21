var express = require("express");
var router = express.Router();
const point = require("../controllers/point.controller");

router.get("/user/:id", point.getHistoryPointUser);
router.get("/get-list-history-point", point.getListHistoryPoint);
router.get("/rankings", point.rankings);
router.get("/weekly-rankings", point.weeklyRankings);
router.get("/monthly-rankings", point.monthlyRankings);
router.post("/", point.create);
router.patch("/update/:id", point.update);
router.patch("/user/:id", point.updateSeenNotifications);
router.delete("/:id", point.delete);

module.exports = router;
