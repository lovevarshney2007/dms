const mongoose = require("mongoose");

function getHealth(req, res) {
  res.json({
    status: "ok",
    message: "DMS Aarohi website API is running",
    database: {
      connected: mongoose.connection.readyState === 1,
      name: mongoose.connection.name || null,
      readyState: mongoose.connection.readyState
    }
  });
}

module.exports = { getHealth };
