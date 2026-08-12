const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const morgan = require("morgan");

const healthRoutes = require("./routes/healthRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ngoPublicRoutes = require("./routes/ngoPublicRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFoundHandler = require("./middleware/notFoundHandler");

const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Security Headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Trust proxy for Render/Vercel load balancers (required for rate-limiting)
app.set("trust proxy", 1);

// Compression
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

// CORS
const allowedOrigins = [
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : []),
  process.env.ADMIN_URL,
  "https://dms-admin-beryl.vercel.app",
  "https://dms-ten-gamma.vercel.app",
  "https://dms-ngo.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5051",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Body Parser
app.use(express.json({ limit: "50kb" }));

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Routes
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
