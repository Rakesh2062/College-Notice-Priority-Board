const express = require("express");
const router = express.Router();
const { getNotices, updateReadStatus } = require("../controllers/noticeController");

// GET /api/notices
router.get("/", getNotices);

// PATCH /api/notices/:id/read-status
router.patch("/:id/read-status", updateReadStatus);

module.exports = router;

