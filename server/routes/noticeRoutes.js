const express = require("express");
const router = express.Router();
const {
  getNotices,
  updateReadStatus,
  createNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");
const { protect, authorize } = require("../middleware/authMiddleware");

// GET  /api/notices          — fetch all notices (public)
router.get("/", getNotices);

// POST /api/notices          — create a new notice (admin only)
router.post("/", protect, authorize("admin"), createNotice);

// PATCH /api/notices/:id/read-status  — toggle isRead only (available to all logged in or public)
router.patch("/:id/read-status", updateReadStatus);

// PUT   /api/notices/:id     — update editable fields (admin only)
router.put("/:id", protect, authorize("admin"), updateNotice);

// DELETE /api/notices/:id   — permanently delete a notice (admin only)
router.delete("/:id", protect, authorize("admin"), deleteNotice);

module.exports = router;

