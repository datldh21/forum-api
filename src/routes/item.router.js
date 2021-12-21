var express = require("express");
var router = express.Router();
var item = require("../controllers/item.controller");
const Multer = require("multer");
// const { Storage } = require("@google-cloud/storage");
// const path = require("path");
// const SERVICE_KEY = "../micro-enigma-235001-d4500fe55929.json";
// const PROJECT_ID = "micro-enigma-235001";
// const serviceKey = path.join(__dirname, SERVICE_KEY);

// const storage = new Storage({
//     keyFilename: serviceKey,
//     projectId: PROJECT_ID,
// });

// const multer = Multer({
//     storage: Multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
//     },
// });
router.get("/", item.getUnlimitedItem);
router.get("/limit", item.getLimitedItem);
router.post("/", item.create);
router.patch("/:id", item.update);
router.delete("/:id", item.delete);

module.exports = router;
