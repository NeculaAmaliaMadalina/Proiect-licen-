const { authService, emailService } = require("../services");
const httpStatus = require("http-status");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser(email, password);
      const token = await authService.getAuthToken(user);

      await emailService.registerEmail(email, user);

      res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
        user,
        token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await authService.getAuthToken(user);
      res.cookie("x-access-token", token).send({ user, token });
    } catch (error) {
      next(error);
    }
  },
  async isauth(req, res, next) {
    res.json(req.user);
  },
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await authService.changePassword(email);

      res
        .status(httpStatus.OK)
        .json({ message: "Password reset link has been sent to your email." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;
      const user = await authService.resetPassword(token, password);

      res
        .status(httpStatus.OK)
        .json({ message: "Password has been successfully reset." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = authController;
