const mongoose = require("mongoose");
const { env } = require("./env");

async function connectToDatabase() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is missing.");
  }

  await mongoose.connect(env.mongoUri, {
    dbName: env.mongoDbName
  });

  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

module.exports = connectToDatabase;
