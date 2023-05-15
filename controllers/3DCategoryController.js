const SnailPic = require("../models/SnailPic");

// Get all 3D snail pics
exports.statueSnailList = async (req, res, next) => {
  try {
    const snailPics = await SnailPic.find({ category: "3D" })
      // Sort by most recent
      .sort({ dateTaken: -1 })
      .exec();
    if (!snailPics) {
      // Nome found
      return res.status(404).json({ err: "snail pics not found" });
    }
    // Success: return JSON of the snail pics
    res.status(200).json({ snailPics });
  } catch (err) {
    // Any other error
    next(err);
  }
};
