const express = require("express");

const Project = require("../models/Project");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ======================================================
// TEST ROUTE
// ======================================================

router.get("/test", (req, res) => {
  res.json({
    message: "Project route working",
  });
});

// ======================================================
// GET ALL PROJECTS
// ======================================================

router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email role")
      .populate("teamMembers", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    res.status(500).json({
      message: "Unable to fetch projects",
    });
  }
});

// ======================================================
// GET SINGLE PROJECT
// ======================================================

router.get("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name email role")
      .populate("teamMembers", "name email role");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project fetched successfully",
      project,
    });
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);

    res.status(500).json({
      message: "Unable to fetch project",
    });
  }
});

// ======================================================
// CREATE PROJECT
// ======================================================

router.post(
  "/",
  protect,
  allowRoles("admin", "manager"),
  async (req, res) => {
    try {
      const {
        name,
        description,
        status,
        priority,
        startDate,
        dueDate,
        teamMembers,
      } = req.body;

      // -------------------------------
      // VALIDATION
      // -------------------------------

      if (!name || !name.trim()) {
        return res.status(400).json({
          message: "Project name is required",
        });
      }

      // -------------------------------
      // CREATE PROJECT
      // -------------------------------

      const project = await Project.create({
        name: name.trim(),
        description: description
          ? description.trim()
          : "",
        status: status || "Planning",
        priority: priority || "Medium",
        startDate: startDate || null,
        dueDate: dueDate || null,
        teamMembers: Array.isArray(teamMembers)
          ? teamMembers
          : [],
        createdBy: req.user.id,
      });

      const populatedProject = await Project.findById(
        project._id
      )
        .populate("createdBy", "name email role")
        .populate("teamMembers", "name email role");

      res.status(201).json({
        message: "Project created successfully",
        project: populatedProject,
      });
    } catch (error) {
      console.error("CREATE PROJECT ERROR:", error);

      res.status(500).json({
        message: "Unable to create project",
      });
    }
  }
);

// ======================================================
// UPDATE PROJECT
// ======================================================

router.put(
  "/:id",
  protect,
  allowRoles("admin", "manager"),
  async (req, res) => {
    try {
      const {
        name,
        description,
        status,
        priority,
        startDate,
        dueDate,
        teamMembers,
      } = req.body;

      const project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      // -------------------------------
      // UPDATE FIELDS
      // -------------------------------

      if (name !== undefined) {
        if (!name.trim()) {
          return res.status(400).json({
            message: "Project name cannot be empty",
          });
        }

        project.name = name.trim();
      }

      if (description !== undefined) {
        project.description = description.trim();
      }

      if (status !== undefined) {
        project.status = status;
      }

      if (priority !== undefined) {
        project.priority = priority;
      }

      if (startDate !== undefined) {
        project.startDate = startDate || null;
      }

      if (dueDate !== undefined) {
        project.dueDate = dueDate || null;
      }

      if (teamMembers !== undefined) {
        project.teamMembers = Array.isArray(teamMembers)
          ? teamMembers
          : [];
      }

      // -------------------------------
      // SAVE
      // -------------------------------

      await project.save();

      const updatedProject = await Project.findById(
        project._id
      )
        .populate("createdBy", "name email role")
        .populate("teamMembers", "name email role");

      res.status(200).json({
        message: "Project updated successfully",
        project: updatedProject,
      });
    } catch (error) {
      console.error("UPDATE PROJECT ERROR:", error);

      res.status(500).json({
        message: "Unable to update project",
      });
    }
  }
);

// ======================================================
// DELETE PROJECT
// ======================================================

router.delete(
  "/:id",
  protect,
  allowRoles("admin", "manager"),
  async (req, res) => {
    try {
      const project = await Project.findById(
        req.params.id
      );

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      await Project.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: "Project deleted successfully",
      });
    } catch (error) {
      console.error("DELETE PROJECT ERROR:", error);

      res.status(500).json({
        message: "Unable to delete project",
      });
    }
  }
);

// ======================================================
// ADD TEAM MEMBER
// ======================================================

router.put(
  "/:id/team",
  protect,
  allowRoles("admin", "manager"),
  async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          message: "User ID is required",
        });
      }

      const project = await Project.findById(
        req.params.id
      );

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      if (!project.teamMembers.includes(userId)) {
        project.teamMembers.push(userId);
      }

      await project.save();

      const updatedProject = await Project.findById(
        project._id
      )
        .populate("createdBy", "name email role")
        .populate("teamMembers", "name email role");

      res.status(200).json({
        message: "Team member added successfully",
        project: updatedProject,
      });
    } catch (error) {
      console.error("ADD TEAM MEMBER ERROR:", error);

      res.status(500).json({
        message: "Unable to add team member",
      });
    }
  }
);

// ======================================================
// REMOVE TEAM MEMBER
// ======================================================

router.delete(
  "/:id/team/:userId",
  protect,
  allowRoles("admin", "manager"),
  async (req, res) => {
    try {
      const project = await Project.findById(
        req.params.id
      );

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      project.teamMembers =
        project.teamMembers.filter(
          (member) =>
            member.toString() !== req.params.userId
        );

      await project.save();

      const updatedProject = await Project.findById(
        project._id
      )
        .populate("createdBy", "name email role")
        .populate("teamMembers", "name email role");

      res.status(200).json({
        message: "Team member removed successfully",
        project: updatedProject,
      });
    } catch (error) {
      console.error(
        "REMOVE TEAM MEMBER ERROR:",
        error
      );

      res.status(500).json({
        message: "Unable to remove team member",
      });
    }
  }
);

module.exports = router;