const express = require("express");
const Task = require("../models/Task");
const Project = require("../models/Project");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// CREATE TASK
// Admin + Manager
// =====================================================

router.post(
  "/",
  protect,
  allowRoles("admin", "manager"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        status,
        priority,
        dueDate,
        project,
        assignedTo,
      } = req.body;

      // Validation
      if (!title || !title.trim()) {
        return res.status(400).json({
          message: "Task title is required",
        });
      }

      if (!project) {
        return res.status(400).json({
          message: "Project is required",
        });
      }

      // Check project exists
      const existingProject = await Project.findById(project);

      if (!existingProject) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      const task = await Task.create({
        title: title.trim(),
        description,
        status: status || "todo",
        priority: priority || "medium",
        dueDate,
        project,
        assignedTo: assignedTo || undefined,
        createdBy: req.user.id,
      });

      const populatedTask = await Task.findById(task._id)
        .populate("project", "name status")
        .populate("assignedTo", "name email role")
        .populate("createdBy", "name email role");

      res.status(201).json({
        message: "Task created successfully",
        task: populatedTask,
      });
    } catch (error) {
      console.error("Create task error:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          message: "Invalid project, assigned user, or ID",
        });
      }

      res.status(500).json({
        message: "Server error while creating task",
      });
    }
  }
);


// =====================================================
// GET ALL TASKS
// All authenticated users
// =====================================================

router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project", "name status")
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Server error while fetching tasks",
    });
  }
});


// =====================================================
// GET SINGLE TASK
// All authenticated users
// =====================================================

router.get("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project", "name status")
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      task,
    });
  } catch (error) {
    console.error("Get task error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    res.status(500).json({
      message: "Server error while fetching task",
    });
  }
});


// =====================================================
// UPDATE TASK
// Admin + Manager
// =====================================================

router.put(
  "/:id",
  protect,
  allowRoles("admin", "manager"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        status,
        priority,
        dueDate,
        project,
        assignedTo,
      } = req.body;

      const updateData = {};

      if (title !== undefined) {
        if (!title.trim()) {
          return res.status(400).json({
            message: "Task title cannot be empty",
          });
        }

        updateData.title = title.trim();
      }

      if (description !== undefined) {
        updateData.description = description;
      }

      if (status !== undefined) {
        updateData.status = status;
      }

      if (priority !== undefined) {
        updateData.priority = priority;
      }

      if (dueDate !== undefined) {
        updateData.dueDate = dueDate;
      }

      if (project !== undefined) {
        const existingProject = await Project.findById(project);

        if (!existingProject) {
          return res.status(404).json({
            message: "Project not found",
          });
        }

        updateData.project = project;
      }

      if (assignedTo !== undefined) {
        updateData.assignedTo = assignedTo || null;
      }

      const task = await Task.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("project", "name status")
        .populate("assignedTo", "name email role")
        .populate("createdBy", "name email role");

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      res.status(200).json({
        message: "Task updated successfully",
        task,
      });
    } catch (error) {
      console.error("Update task error:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          message: "Invalid task, project, or user ID",
        });
      }

      res.status(500).json({
        message: "Server error while updating task",
      });
    }
  }
);


// =====================================================
// DELETE TASK
// Admin only
// =====================================================

router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      res.status(200).json({
        message: "Task deleted successfully",
      });
    } catch (error) {
      console.error("Delete task error:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          message: "Invalid task ID",
        });
      }

      res.status(500).json({
        message: "Server error while deleting task",
      });
    }
  }
);


module.exports = router;