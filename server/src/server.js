const app = require("./app");
const { env } = require("./config/env");
const connectToDatabase = require("./config/database");

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
