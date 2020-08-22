const mongoose = require("mongoose");
const bcryptjs = require("bcrypt");
const isEmail = require("validator/lib/isEmail");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 64,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return isEmail(value);
      },
      message: function () {
        return "invalid email format";
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 120,
  },
});
userSchema.pre("save", function (next) {
  const user = this;
  bcryptjs.genSalt().then((salt) => {
    bcryptjs.hash(user.password, salt).then((encryptpassword) => {
      user.password = encryptpassword;
      next();
    });
  });
});

const User = mongoose.model("user", userSchema);

module.exports = User;
