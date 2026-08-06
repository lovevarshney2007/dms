const cors = require("cors");
const express = require("express");
const healthRoutes = require("./routes/healthRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ngoPublicRoutes = require("./routes/ngoPublicRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFoundHandler = require("./middleware/notFoundHandler");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50kb" }));

app.use("/api", healthRoutes);
app.use("/api", submissionRoutes);
app.use("/api", adminRoutes);
app.use("/api", require("./routes/uploadRoutes"));
app.use("/api/ngo", ngoPublicRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
