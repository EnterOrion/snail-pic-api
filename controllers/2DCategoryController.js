const SnailPic = require("../models/SnailPic");

exports.drawnSnailList = async (req, res, next) => {
  try {
    const snailPics = await SnailPic.find({ category: "2D" })
      .sort({ dateTaken: -1 })
      .exec();
    if (!snailPics) {
      return res.status(404).json({ err: "snail pics not found" });
    }
    res.status(200).json({ snailPics });
  } catch (err) {
    next(err);
  }
};
