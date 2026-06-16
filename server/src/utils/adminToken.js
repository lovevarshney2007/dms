const crypto = require("crypto");
const { env } = require("../config/env");

const ttlMs = env.adminTokenTtlHours * 60 * 60 * 1000;

function signAdminToken() {
  const ts = Date.now().toString();
  const signature = crypto.createHmac("sha256", env.adminTokenSecret).update(ts).digest("hex");
  return `${ts}.${signature}`;
}

function verifyAdminToken(token) {
  if (!token || !token.includes(".")) return false;
  const [ts, signature] = token.split(".");
  if (!ts || !signature) return false;
  const expectedSig = crypto.createHmac("sha256", env.adminTokenSecret).update(ts).digest("hex");
  if (expectedSig !== signature) return false;
  const age = Date.now() - Number(ts);
  if (Number.isNaN(age) || age < 0 || age > ttlMs) return false;
  return true;
}

module.exports = {
  signAdminToken,
  verifyAdminToken
};
