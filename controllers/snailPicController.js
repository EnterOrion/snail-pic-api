const SnailPic = require("../models/SnailPic");
const { body, validationResult } = require("express-validator");

// Get all snail pics
exports.snailList = async (req, res, next) => {
  try {
    // Sort by most recent
    const snailPics = await SnailPic.find().sort({ dateTaken: -1 }).exec();
    if (!snailPics) {
      // None found
      return res.status(404).json({ err: "snail pics not found" });
    }
    // Success: return JSON of snail pics
    res.status(200).json({ snailPics });
  } catch (err) {
    // Any other error
    next(err);
  }
};

exports.createSnailPic = [
  // Sanitize retrieved data
  body("photo").trim().escape(),
  body("description").trim().escape(),
  body("date").toDate(),

  function (req, res, next) {
    const errors = validationResult(req);
    // Return any errors
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }

    const { dateTaken, photoUrl, category, description } = req.body;
    // Create new snail pic
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
      // Success: return success message after saving to DB
      res.status(200).json({ msg: "snail pic added" });
    });
  },
];
