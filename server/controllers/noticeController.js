const mongoose = require("mongoose");
const Notice = require("../models/Notice");

/**
 * GET /api/notices
 * Returns every notice, sorted newest-first.
 * The React frontend handles all further filtering (by category, priority, etc.)
 * so this endpoint deliberately has no query params.
 */
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: notices });
  } catch (error) {
    console.error("getNotices error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching notices" });
  }
};

/**
 * PATCH /api/notices/:id/read-status
 * Flips the isRead flag on a single notice.
 *
 * Validation order matters:
 *  1. ObjectId check first — Mongoose will throw a CastError if we let an
 *     invalid id reach findByIdAndUpdate, so we short-circuit early.
 *  2. Type-check isRead before hitting the DB — avoids a wasted round-trip.
 *  3. Null check after the update — the id was syntactically valid but no
 *     document exists with that id.
 *
 * { new: true }     → returns the document AFTER the update (not before).
 * { runValidators } → enforces schema constraints even on updates.
 */
const updateReadStatus = async (req, res) => {
  const { id } = req.params;
  const { isRead } = req.body;

  // 1. Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid notice ID" });
  }

  // 2. Validate isRead type
  if (typeof isRead !== "boolean") {
    return res
      .status(400)
      .json({ success: false, message: "isRead must be a boolean" });
  }

  try {
    const notice = await Notice.findByIdAndUpdate(
      id,
      { isRead },
      { new: true, runValidators: true }
    );

    // 3. Document not found
    if (!notice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }

    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    console.error("updateReadStatus error:", error.message);
    res.status(500).json({ success: false, message: "Server error while updating notice" });
  }
};

module.exports = { getNotices, updateReadStatus };

