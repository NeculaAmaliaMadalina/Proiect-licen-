const { userService, authService, emailService } = require("../services");
const httpStatus = require("http-status");
const { ApiError } = require("../middkeware/apiError");
const usersController = {
  async profile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      next(error);
    }
  },
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  async updateUserEmail(req, res, next) {
    try {
      const user = await userService.updateUserEmail(req);
      const token = await authService.getAuthToken(user);

      await emailService.registerEmail(user.email, user);

      res.cookie("x-access-token", token).send({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async verifyAccount(req, res, next) {
    try {
      const token = await userService.validateToken(req.query.validation);
      const user = await userService.findUserById(token.sub);

      if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      if (user.verified)
        throw new ApiError(httpStatus.BAD_REQUEST, "Already verified");

      user.verified = true;
      user.save();
      // res.redirect("sign_in");
      // res.status(httpStatus.CREATED).send({
      //   user,
      // });
    } catch (error) {
      next(error);
    }
  },
  async isAdmin(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);
      if (user && user.role === "admin") {
        res.json({ isAdmin: true });
      } else {
        res.json({ isAdmin: false });
      }
    } catch (error) {
      next(error);
    }
  },
  async allUsers(req, res, next) {
    try {
      const user = await userService.allUsers();
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = usersController;
