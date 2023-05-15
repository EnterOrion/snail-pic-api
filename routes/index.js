const express = require("express");
const router = express.Router();

// Home redirects to API
router.get("/", function (req, res, next) {
  res.redirect("/api");
});

module.exports = router;
