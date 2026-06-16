const createHttpError = require("../utils/createHttpError");
const { env } = require("../config/env");
const { signAdminToken } = require("../utils/adminToken");

async function login(req, res, next) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return next(createHttpError(400, "Email and password are required."));
  }
  if (email !== env.adminEmail || password !== env.adminPassword) {
    return next(createHttpError(401, "Invalid credentials."));
  }

  const token = signAdminToken();
  res.json({ token, expiresInHours: env.adminTokenTtlHours });
}

module.exports = {
  login
};
