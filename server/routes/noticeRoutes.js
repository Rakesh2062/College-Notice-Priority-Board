const express = require("express");
const router = express.Router();
const {
  getNotices,
  updateReadStatus,
  createNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

// GET  /api/notices          — fetch all notices
router.get("/", getNotices);

// POST /api/notices          — create a new notice
router.post("/", createNotice);

// PATCH /api/notices/:id/read-status  — toggle isRead only
router.patch("/:id/read-status", updateReadStatus);

// PUT   /api/notices/:id     — update editable fields (title, description, category, priority, date)
router.put("/:id", updateNotice);

// DELETE /api/notices/:id   — permanently delete a notice
router.delete("/:id", deleteNotice);

module.exports = router;

