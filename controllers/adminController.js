const Admin = require("../models/Admin");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      // if (err || !user) {
      //   const error = new Error("An error occurred.");

      //   return next(error);
      // }

      if (err) {
        const error = new Error("An server error occurred.");

        return next(error);
      } else if (!user) {
        console.log(info);
        const error = new Error("A user error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.TOKEN, {
          expiresIn: "1d",
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.logout = function (req, res) {
  res.redirect("/");
};
