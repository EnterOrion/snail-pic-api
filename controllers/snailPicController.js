const SnailPic = require("../models/SnailPic");
const asyncHandler = require("express-async-handler");

exports.snailList = asyncHandler(async (req, res, next) => {
  const allSnailPics = await SnailPic.find().sort({ date_taken: 1 }).exec();
  res.render("index", {
    title: "Snail List",
    snailList: allSnailPics,
  });
});
