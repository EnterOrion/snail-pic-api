const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SnailPicSchema = new Schema({
  dateTaken: { type: Date, required: true },
  photoUrl: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, maxLength: 150, required: true },
});

module.exports = mongoose.model("SnailPic", SnailPicSchema);
