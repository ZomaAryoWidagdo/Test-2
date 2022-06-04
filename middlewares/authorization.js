const { readToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authorization(req, res, next) {
  try {
    const { access_token } = req.headers;

    const payload = readToken(access_token);

    const userTrue = await User.findOne({
      where: {
        id: payload.id,
        username: payload.username,
        role: payload.role,
      },
    });
    if (!userTrue) {
      throw "TokenError";
    }

    if (payload.role !== ("cashier" || "admin")) {
      throw "TokenError";
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorization,
};
