const mongoose = require("mongoose");
// const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please provide your username"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      trim: true,
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      trim: true,
      minLength: 8,
      select: false,
    },
    passwordChangedAt: Date,
  },

  { timestamps: true }
);

//hashing password before saving

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means that user has never changed password
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
