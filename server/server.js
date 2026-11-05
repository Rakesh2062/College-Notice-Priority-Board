// Load environment variables first — before any other require that might
// reference process.env.  This is the only correct placement for dotenv.
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noticeRoutes = require("./routes/noticeRoutes");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
// Allow common dev origins or whatever is configured
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // fallback allow dev origins
    },
    credentials: true,
  })
);

// Parse incoming JSON request bodies so req.body is populated.
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/notices", noticeRoutes);

// ── 404 Catch-all ────────────────────────────────────────────────────────────
// Any request that didn't match a route above falls here.
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Database + Server ────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

