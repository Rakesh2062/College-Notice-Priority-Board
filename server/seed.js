/**
 * seed.js — one-time script to populate the notices collection.
 * Run once from inside the server/ folder:
 *   node seed.js
 *
 * It will:
 *  1. Connect to Atlas using your .env MONGO_URI
 *  2. Drop any existing documents in the notices collection
 *  3. Insert 10 sample notices
 *  4. Disconnect and exit
 */

require("dotenv").config();
const mongoose = require("mongoose");

// ── Inline schema (mirrors models/Notice.js exactly) ─────────────────────────
// We define it here so seed.js is self-contained and doesn't depend on the
// rest of the app being wired up.
const noticeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ["Academics", "Examination", "Events", "General"], required: true },
  priority:    { type: String, enum: ["High", "Medium", "Low"], required: true },
  date:        { type: Date, required: true },
  isRead:      { type: Boolean, default: false },
});

const Notice = mongoose.model("Notice", noticeSchema);

// ── Seed data ─────────────────────────────────────────────────────────────────
// new Date("YYYY-MM-DD") produces a real BSON Date — not a string.
// Do NOT change these to plain strings.
const notices = [
  {
    title: "Mid-Semester Examination Schedule Released",
    description:
      "The timetable for mid-semester examinations starting 20 November 2026 has been published on the academic portal. All students must check their hall ticket and report 30 minutes early.",
    category: "Examination",
    priority: "High",
    date: new Date("2026-11-20"),
    isRead: false,
  },
  {
    title: "Last Date for Tuition Fee Payment — Autumn 2026",
    description:
      "Students who have not yet paid their autumn-semester tuition fee must do so by 15 November 2026. A late fine of ₹500 per day will be charged after the deadline.",
    category: "Academics",
    priority: "High",
    date: new Date("2026-11-15"),
    isRead: false,
  },
  {
    title: "Emergency Safety Drill — Mandatory Attendance",
    description:
      "A campus-wide fire and evacuation drill will be conducted on 10 November 2026 at 11:00 AM. All students and staff must participate. Classes will be suspended for 45 minutes.",
    category: "General",
    priority: "High",
    date: new Date("2026-11-10"),
    isRead: false,
  },
  {
    title: "Practical Examination Admit Cards Available",
    description:
      "Admit cards for practical examinations scheduled in December 2026 are now available on the exam portal. Students must download and carry a printed copy to the examination hall.",
    category: "Examination",
    priority: "High",
    date: new Date("2026-10-28"),
    isRead: true,
  },
  {
    title: "Workshop: Introduction to Machine Learning",
    description:
      "The CSE department is hosting a two-day hands-on workshop on ML fundamentals using Python and scikit-learn on 25–26 November 2026. Register on the department portal before 18 November.",
    category: "Events",
    priority: "Medium",
    date: new Date("2026-11-25"),
    isRead: false,
  },
  {
    title: "Revised Class Timetable — Semester V",
    description:
      "Due to a faculty rescheduling, the Semester V timetable has been revised effective 8 November 2026. The updated schedule is available on the student dashboard.",
    category: "Academics",
    priority: "Medium",
    date: new Date("2026-11-08"),
    isRead: true,
  },
  {
    title: "Inter-College Sports Meet 2026 — Registration Open",
    description:
      "Annual inter-college sports meet will be held on 5–7 December 2026. Students interested in participating in athletics, cricket, football, or badminton must register by 20 November.",
    category: "Events",
    priority: "Medium",
    date: new Date("2026-12-05"),
    isRead: false,
  },
  {
    title: "Central Library Extended Hours — Exam Period",
    description:
      "The central library will remain open until midnight (12:00 AM) from 15 November to 5 December 2026 to support students during the examination period.",
    category: "General",
    priority: "Low",
    date: new Date("2026-11-15"),
    isRead: true,
  },
  {
    title: "College Foundation Day Holiday — 1 December 2026",
    description:
      "The college will remain closed on Monday, 1 December 2026, on account of Foundation Day. All pending lab sessions will be rescheduled; students will be notified separately.",
    category: "General",
    priority: "Low",
    date: new Date("2026-12-01"),
    isRead: false,
  },
  {
    title: "Guest Lecture: Careers in Data Science",
    description:
      "Mr. Arjun Mehta, Senior Data Scientist at Infosys, will deliver a guest lecture on career paths in data science on 12 November 2026 at 2:00 PM in Seminar Hall B. Open to all students.",
    category: "Events",
    priority: "Low",
    date: new Date("2026-11-12"),
    isRead: false,
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Clear existing documents so the script is safe to re-run
    const deleted = await Notice.deleteMany({});
    if (deleted.deletedCount > 0) {
      console.log(`🗑️  Cleared ${deleted.deletedCount} existing notice(s)`);
    }

    const inserted = await Notice.insertMany(notices);
    console.log(`🌱 Inserted ${inserted.length} notices successfully`);

    // Quick verification summary
    const high = await Notice.countDocuments({ priority: "High" });
    const categories = await Notice.distinct("category");
    console.log(`\n📊 Verification:`);
    console.log(`   Total documents : ${inserted.length}`);
    console.log(`   High priority   : ${high}`);
    console.log(`   Categories      : ${categories.join(", ")}`);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected. Done!");
  }
};

seed();

