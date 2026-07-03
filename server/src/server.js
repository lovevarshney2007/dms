const app = require("./app");
const { env } = require("./config/env");
const connectToDatabase = require("./config/database");
const emailService = require("./services/emailService");

async function startServer() {
  try {
    await connectToDatabase();

    // Verify SMTP transport at startup to catch misconfiguration early
    const smtpOk = await emailService.verifyEmailTransport();
    if (!smtpOk) {
      console.warn("[email] SMTP verification failed — registration emails may not send. Check Email and EmailAppPassword in server/.env");
    }

    app.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
