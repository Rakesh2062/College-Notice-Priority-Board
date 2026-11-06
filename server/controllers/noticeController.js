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

/**
 * POST /api/notices
 * Create a new notice
 */
const createNotice = async (req, res) => {
  const { title, description, category, priority, date } = req.body;

  if (!title || !description || !category || !priority) {
    return res.status(400).json({
      success: false,
      message: "Please provide title, description, category, and priority",
    });
  }

  try {
    const notice = await Notice.create({
      title,
      description,
      category,
      priority,
      date: date ? new Date(date) : new Date(),
      isRead: false,
    });

    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    console.error("createNotice error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * PUT /api/notices/:id
 * Full update of a notice's editable fields: title, description, category, priority, date.
 * isRead is NOT updated here — it has its own dedicated PATCH endpoint.
 */
const updateNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid notice ID" });
  }

  const { title, description, category, priority, date } = req.body;

  if (!title || !description || !category || !priority) {
    return res.status(400).json({
      success: false,
      message: "Please provide title, description, category, and priority",
    });
  }

  try {
    const notice = await Notice.findByIdAndUpdate(
      id,
      { title, description, category, priority, date: date ? new Date(date) : undefined },
      { new: true, runValidators: true }
    );

    if (!notice) {
      return res.status(404).json({ success: false, message: "Notice not found" });
    }

    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    console.error("updateNotice error:", error.message);
    res.status(500).json({ success: false, message: "Server error while updating notice" });
  }
};

/**
 * DELETE /api/notices/:id
 * Permanently removes a notice document from the collection.
 * Returns 200 with the deleted document so the frontend can remove it from state.
 */
const deleteNotice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid notice ID" });
  }

  try {
    const notice = await Notice.findByIdAndDelete(id);

    if (!notice) {
      return res.status(404).json({ success: false, message: "Notice not found" });
    }

    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    console.error("deleteNotice error:", error.message);
    res.status(500).json({ success: false, message: "Server error while deleting notice" });
  }
};

module.exports = { getNotices, updateReadStatus, createNotice, updateNotice, deleteNotice };

