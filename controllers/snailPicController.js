const SnailPic = require("../models/SnailPic");
const { body, validationResult } = require("express-validator");

exports.snailList = async (req, res, next) => {
  try {
    const snailPics = await SnailPic.find().sort({ dateTaken: -1 }).exec();
    if (!snailPics) {
      return res.status(404).json({ err: "snail pics not found" });
    }
    res.status(200).json({ snailPics });
  } catch (err) {
    next(err);
  }
};

exports.createSnailPic = [
  body("photo").trim().escape(),
  body("description").trim().escape(),
  body("date").toDate(),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }

    const { dateTaken, photoUrl, category, description } = req.body;
    const snail = new SnailPic({
      dateTaken,
      photoUrl,
      category,
      description,
    });
    snail.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ msg: "snail pic added" });
    });
  },
];
