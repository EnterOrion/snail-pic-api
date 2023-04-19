var express = require("express");
var router = express.Router();

const snailPicController = require("../controllers/snailPicController");

// index route
router.get("/", function (req, res, next) {
  res.redirect("/api/snail-pics");
});

// get all snail pics
router.get("/snail-pics", snailPicController.snailList);

module.exports = router;
