const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ==================================================
    // USER NAME
    // ==================================================

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    // ==================================================
    // EMAIL
    // ==================================================

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    // ==================================================
    // PASSWORD
    // ==================================================

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    // ==================================================
    // ROLE
    // ==================================================

    role: {
      type: String,
      enum: {
        values: ["admin", "employee"],
        message: "Invalid role selected",
      },
      default: "employee",
    },

    // ==================================================
    // DEPARTMENT
    // ==================================================

    department: {
      type: String,
      trim: true,
      default: "General",
      maxlength: [50, "Department cannot exceed 50 characters"],
    },

    // ==================================================
    // STATUS
    // ==================================================

    status: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "Invalid status selected",
      },
      default: "Active",
    },

    // ==================================================
    // FORGOT PASSWORD
    // ==================================================

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);