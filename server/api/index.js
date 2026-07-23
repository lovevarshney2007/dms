const app = require("../src/app");
const connectToDatabase = require("../src/config/database");

// Keep a cached connection across serverless invocations
let isConnected = false;

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectToDatabase();
      isConnected = true;
    } catch (err) {
      console.error("MongoDB Connection Error:", err);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }
  next();
});

module.exports = app;
