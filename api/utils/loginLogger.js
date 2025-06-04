// middleware/loginLogger.js
import RecentLogin from "../models/RecentLogin.model";
const logLogin = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming you have authentication middleware
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    await RecentLogin.create({ userId, ipAddress });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = logLogin;
