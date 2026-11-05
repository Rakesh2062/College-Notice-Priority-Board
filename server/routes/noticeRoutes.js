const express = require("express");
const router = express.Router();
const {
  getNotices,
  updateReadStatus,
  createNotice,
} = require("../controllers/noticeController");

// GET /api/notices
router.get("/", getNotices);

// POST /api/notices
router.post("/", createNotice);

// PATCH /api/notices/:id/read-status
router.patch("/:id/read-status", updateReadStatus);

module.exports = router;

