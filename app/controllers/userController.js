const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {};

userController.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};
userController.login = (req, res) => {
  const body = req.body;
  // check if email is present
  User.findOne({ email: body.email })
    .then((user) => {
      console.log(user);
      if (user) {
        bcryptjs.compare(body.password, user.password).then((result) => {
          if (result) {
            const tokenData = {
              id: user._id,
            };
            const token = jwt.sign(tokenData, "sagarproject", {
              expiresIn: "2d",
            });
            res.json({
              token: token,
            });
          } else {
            res.json({ errors: "Invalid Email / Password" });
          }
        });
      } else {
        res.json({ errors: "Invali Email / Password" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
userController.account = (req, res) => {
  const id = req.userId;
  User.findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};
userController.logout = (req, res) => {
  console.log(req);
  const { user, token } = req;
  User.findByIdAndUpdate(req.userId, { $pull: { tokens: { token: token } } })
    .then(function () {
      res.send({ notice: "successfully logged out" });
    })
    .catch(function (err) {
      res.send(err);
    });
};

module.exports = userController;
