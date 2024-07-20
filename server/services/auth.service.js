const { User } = require("../models/user");
const httpStatus = require("http-status");
const { ApiError } = require("../middkeware/apiError");
const userService = require("./user.service");
const crypto = require("crypto");
const emailService = require("./email.service");

const createUser = async (email, password) => {
  try {
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry, email taken");
    }
    const user = new User({
      email,
      password,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
let passwordResetTokens = {};

const changePassword = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "User with this email does not exist."
      );
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // expira intr-o ora

    await user.save();

    passwordResetTokens[token] = {
      email: user.email,
      expires: user.resetPasswordExpires,
    };

    await emailService.resetPassword(email, user, token);

    return user;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (token, password) => {
  try {
    if (
      !passwordResetTokens[token] ||
      Date.now() > passwordResetTokens[token].expires
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Password reset token is invalid or has expired."
      );
    }

    const user = await User.findOne({
      email: passwordResetTokens[token].email,
    });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};
const getAuthToken = (user) => {
  const token = user.generateAuthToken();
  return token;
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Soryy Bad Email");
    }
    if (!(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Soryy Bad Password");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createUser,
  getAuthToken,
  signInWithEmailAndPassword,
  changePassword,
  resetPassword,
};
