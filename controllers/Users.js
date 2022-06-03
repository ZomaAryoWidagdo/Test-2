const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");
class UserController {
  static async register(req, res, next) {
    try {
      const { username, password } = req.body;
      const data = await User.create({
        username,
        password,
        role: "waitress",
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const response = await User.findOne({ where: { email } });
      if (!response) {
        throw "EmailPasswordFalse";
      }
      const valid = comparePassword(password, response.password);

      if (!valid) {
        throw "EmailPasswordFalse";
      }

      const payload = {
        id: response.id,
        username: response.username,
        role: response.role,
      };

      const jwtToken = createToken(payload);

      res.status(200).json({
        id: response.id,
        username: response.username,
        access_token: jwtToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
