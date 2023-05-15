const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
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
        // If login is successful, returns an auth token with expiration of one day
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.logout = function (req, res) {
  // Handling the session is done through the client and through local storage
  res.redirect("/");
};
