var express = require("express");
var router = express.Router();

const snailPicController = require("../controllers/snailPicController");
const livePicController = require("../controllers/liveCategoryController");
const statuePicController = require("../controllers/3DCategoryController");
const drawnPicController = require("../controllers/2DCategoryController");

// index route
router.get("/", function (req, res, next) {
  res.redirect("/api/snail-pics");
});

// get all snail pics
router.get("/snail-pics", snailPicController.snailList);
router.get("/snail-pics/live", livePicController.liveSnailList);
router.get("/snail-pics/3D", statuePicController.statueSnailList);
router.get("/snail-pics/2D", drawnPicController.drawnSnailList);

module.exports = router;
