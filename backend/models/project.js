const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    // ==================================================
    // PROJECT NAME
    // ==================================================

    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minlength: [2, "Project name must be at least 2 characters"],
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },

    // ==================================================
    // DESCRIPTION
    // ==================================================

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    // ==================================================
    // PROJECT STATUS
    // ==================================================

    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed", "On Hold"],
      default: "Planning",
    },

    // ==================================================
    // PRIORITY
    // ==================================================

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // ==================================================
    // START DATE
    // ==================================================

    startDate: {
      type: Date,
      default: null,
    },

    // ==================================================
    // DUE DATE
    // ==================================================

    dueDate: {
      type: Date,
      default: null,
    },

    // ==================================================
    // CREATED BY
    // ==================================================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==================================================
    // TEAM MEMBERS
    // ==================================================

    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);