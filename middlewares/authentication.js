const { readToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    const payload = readToken(access_token);

    const userTrue = await User.findOne({
      where: {
        id: payload.id,
        username: payload.username,
      },
    });

    if (!userTrue) {
      throw "TokenError";
    }

    req.user = {
      id: userTrue.id,
      role: userTrue.role,
      username: userTrue.username,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
};
