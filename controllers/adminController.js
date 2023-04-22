const Admin = require("../models/Admin");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.signup = [
  body("username")
    .trim()
    .escape()
    .custom(async (username) => {
      try {
        const existingUsername = await Admin.findOne({ username: username });
        if (existingUsername) {
          throw new Error("username already in use");
        }
      } catch (err) {
        throw new Error(err);
      }
    }),
  body("password").isLength(8).withMessage("Minimum length 8 characters"),
  body("confirm-password").custom((value, { req }) => {
    if (value !== req.body.password) {
      return next("Password confirmation does not match password");
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  async (req, res, next) => {
    const errors = validationResult(req);
    passport.authenticate("signup", { session: false }, (err, user, info) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          username: req.body.username,
          errors: errors.array(),
        });
      }
      if (err) {
        return next(err);
      }
      res.json({
        message: "Signed-up sucessfuly",
        user: req.user,
      });
    })(req, res, next);
  },
];

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
