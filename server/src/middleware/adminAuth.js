const createHttpError = require("../utils/createHttpError");
const { verifyAdminToken } = require("../utils/adminToken");

function adminAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!verifyAdminToken(token)) {
    return next(createHttpError(401, "Admin authentication required."));
  }
  next();
}

module.exports = adminAuth;
