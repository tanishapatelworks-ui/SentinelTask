const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/sentineltask";

    const conn = await mongoose.connect(mongoURI);

    console.log("======================================");
    console.log("MongoDB connected successfully");
    console.log(`MongoDB Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log("======================================");

    return conn;
  } catch (error) {
    console.error("======================================");
    console.error("MongoDB connection failed");
    console.error(error.message);
    console.error("======================================");

    throw error;
  }
};

module.exports = connectDB;