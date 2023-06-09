const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const AdminSchema = new Schema({
  username: { required: true, type: String },
  password: { required: true, type: String },
});

// Hashes the password before saving it to the DB
AdminSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  user.password = hash;
  next();
});

// Password confirmation
AdminSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

// Export model
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
