const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [20, "First name must be at most 20 characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [20, "Last name must be at most 20 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    minlength: [5, "Email must be at least 5 characters"],
    unique: true, 
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  sockedtid: {
    type: String,
  },
});

userschema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
}

userschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userschema.statics.hashpassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model("User", userschema);
module.exports = User;