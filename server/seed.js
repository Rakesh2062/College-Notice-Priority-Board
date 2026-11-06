require("dotenv").config();
const mongoose = require("mongoose");
const Notice = require("./models/Notice");
const User = require("./models/User");

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

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    await Notice.deleteMany({});
    await Notice.insertMany(notices);
    console.log("Notices seeded successfully");

    await User.deleteMany({});

    await User.create({
      name: "Faculty Admin",
      email: "admin@college.edu",
      password: "admin123",
      role: "admin",
    });

    await User.create({
      name: "Rahul Sharma",
      email: "student@college.edu",
      password: "student123",
      role: "student",
    });

    console.log("Default users created:");
    console.log("  Admin:   admin@college.edu / admin123");
    console.log("  Student: student@college.edu / student123");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected. Done!");
  }
};

seed();
