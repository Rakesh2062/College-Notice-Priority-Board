// Load environment variables first — before any other require that might
// reference process.env.  This is the only correct placement for dotenv.
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noticeRoutes = require("./routes/noticeRoutes");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
// CORS: allow requests ONLY from the React dev server (or production origin).
// Locking it to CLIENT_ORIGIN prevents random browsers from hitting the API.
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

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

