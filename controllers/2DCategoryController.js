const SnailPic = require("../models/SnailPic");

// Get all 2D snail pics
exports.drawnSnailList = async (req, res, next) => {
  try {
    const snailPics = await SnailPic.find({ category: "2D" })
      // Sort by most recent
      .sort({ dateTaken: -1 })
      .exec();
    if (!snailPics) {
      // None found
      return res.status(404).json({ err: "snail pics not found" });
    }
    // Success: return JSON of the snail pics
    res.status(200).json({ snailPics });
  } catch (err) {
    // Any other error
    next(err);
  }
};
