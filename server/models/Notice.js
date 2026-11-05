const mongoose = require("mongoose");

/**
 * Notice schema — mirrors the documents already in Atlas.
 *
 * Key design decisions:
 *  - `enum` on category & priority keeps the DB honest even if someone
 *    sends data directly (bypassing the React form).
 *  - `date` is a Date (not String) so MongoDB stores it as a proper ISODate
 *    and returns it in ISO 8601 format.
 *  - `isRead` defaults to false; we only update it via the PATCH endpoint.
 *  - No `timestamps` option — the spec doesn't require createdAt/updatedAt.
 *  - Mongoose will pluralise "Notice" → "notices", matching the existing
 *    collection automatically.
 */
const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Academics", "Examination", "Events", "General"],
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
  date: { type: Date, required: true },
  isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model("Notice", noticeSchema);

