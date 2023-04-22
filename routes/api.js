var express = require("express");
var router = express.Router();
const passport = require("passport");

const snailPicController = require("../controllers/snailPicController");
const livePicController = require("../controllers/liveCategoryController");
const statuePicController = require("../controllers/3DCategoryController");
const drawnPicController = require("../controllers/2DCategoryController");
const adminController = require("../controllers/adminController");

// index route
router.get("/", function (req, res, next) {
  res.redirect("/api/snail-pics");
});

// get all snail pics
router.get("/snail-pics", snailPicController.snailList);

// get snail pics depending on category requested
router.get("/snail-pics/live", livePicController.liveSnailList);
router.get("/snail-pics/3D", statuePicController.statueSnailList);
router.get("/snail-pics/2D", drawnPicController.drawnSnailList);

// login - api/login
router.post("/login", adminController.login);

// logout - api/logout
router.get("/logout", adminController.logout);

// create new snail pic
router.post(
  "/create-pic",
  passport.authenticate("jwt", { session: false }),
  snailPicController.createSnailPic
);

module.exports = router;
