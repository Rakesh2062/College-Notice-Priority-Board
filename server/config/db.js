const mongoose = require("mongoose");

/**
 * connectDB — establishes a connection to MongoDB Atlas.
 * Called once at startup from server.js.
 * On failure we exit with code 1 so the process doesn't silently run
 * without a database.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

