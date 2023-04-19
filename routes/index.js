var express = require("express");
var router = express.Router();

const snailPicController = require("../controllers/snailPicController");

/* GET home page. */
router.get("/", snailPicController.snailList);

module.exports = router;
