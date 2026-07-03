const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

function signAdminToken() {
  return jwt.sign({ role: "admin" }, env.adminTokenSecret, {
    expiresIn: `${env.adminTokenTtlHours}h`
  });
}

function verifyAdminToken(token) {
  if (!token) return false;
  try {
    jwt.verify(token, env.adminTokenSecret);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  signAdminToken,
  verifyAdminToken
};
