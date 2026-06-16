const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || "",
  mongoDbName: process.env.MONGODB_DB_NAME || "dms_aarohi",
  adminEmail: process.env.ADMIN_EMAIL || "admin@dmsaarohi.com",
  adminPassword: process.env.ADMIN_PASSWORD || "change-this-password",
  adminTokenSecret: process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD || "changeme-secret",
  adminTokenTtlHours: Number(process.env.ADMIN_TOKEN_TTL_HOURS || 24)
};

module.exports = { env };
