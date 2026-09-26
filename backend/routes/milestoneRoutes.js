const express = require("express");
const mongoose = require("mongoose");

const Milestone = require("../models/Milestone");
const Project = require("../models/Project");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ======================================================
// CREATE MILESTONE
// POST /api/milestones
// Admin + Manager
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
        project,
        dueDate,
        status,
      } = req.body;

      // -------------------------------
      // VALIDATION
      // -------------------------------

      if (!name || !project || !dueDate) {
        return res.status(400).json({
          message:
            "Milestone name, project and due date are required",
        });
      }

      const cleanName = name.trim();

      if (cleanName.length < 2) {
        return res.status(400).json({
          message:
            "Milestone name must be at least 2 characters",
        });
      }

      // -------------------------------
      // CHECK PROJECT ID
      // -------------------------------

      if (!mongoose.Types.ObjectId.isValid(project)) {
        return res.status(400).json({
          message: "Invalid project ID",
        });
      }

      // -------------------------------
      // CHECK PROJECT EXISTS
      // -------------------------------

      const existingProject = await Project.findById(project);

      if (!existingProject) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      // -------------------------------
      // CHECK STATUS
      // -------------------------------

      const selectedStatus = status
        ? status.toLowerCase()
        : "pending";

      if (
        !["pending", "in-progress", "completed"].includes(
          selectedStatus
        )
      ) {
        return res.status(400).json({
          message: "Invalid milestone status",
        });
      }

      // -------------------------------
      // CREATE MILESTONE
      // -------------------------------

      const milestone = await Milestone.create({
        name: cleanName,
        description: description
          ? description.trim()
          : "",
        project,
        dueDate,
        status: selectedStatus,
        createdBy: req.user.id,
      });

      // -------------------------------
      // POPULATE DATA
      // -------------------------------

      await milestone.populate([
        {
          path: "project",
          select: "name status",
        },
        {
          path: "createdBy",
          select: "name email role",
        },
      ]);

      res.status(201).json({
        message: "Milestone created successfully",
        milestone,
      });
    } catch (error) {
      console.error(
        "CREATE MILESTONE ERROR:",
        error
      );

      res.status(500).json({
        message: "Unable to create milestone",
      });
    }
  }
);

// ======================================================
// GET ALL MILESTONES
// GET /api/milestones
// All authenticated users
// ======================================================

router.get(
  "/",
  protect,
  async (req, res) => {
    try {
      const milestones = await Milestone.find()
        .populate("project", "name status")
        .populate(
          "createdBy",
          "name email role"
        )
        .sort({ dueDate: 1 });

      res.status(200).json({
        count: milestones.length,
        milestones,
      });
    } catch (error) {
      console.error(
        "GET MILESTONES ERROR:",
        error
      );

      res.status(500).json({
        message: "Unable to fetch milestones",
      });
    }
  }
);

// ======================================================
// GET SINGLE MILESTONE
// GET /api/milestones/:id
// All authenticated users
// ======================================================

router.get(
  "/:id",
  protect,
  async (req, res) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          message: "Invalid milestone ID",
        });
      }

      const milestone = await Milestone.findById(
        req.params.id
      )
        .populate("project", "name status")
        .populate(
          "createdBy",
          "name email role"
        );

      if (!milestone) {
        return res.status(404).json({
          message: "Milestone not found",
        });
      }

      res.status(200).json({
        milestone,
      });
    } catch (error) {
      console.error(
        "GET MILESTONE ERROR:",
        error
      );

      res.status(500).json({
        message: "Unable to fetch milestone",
      });
    }
  }
);

// ======================================================
// UPDATE MILESTONE
// PUT /api/milestones/:id
// Admin + Manager
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
        project,
        dueDate,
        status,
      } = req.body;

      // -------------------------------
      // CHECK MILESTONE ID
      // -------------------------------

      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          message: "Invalid milestone ID",
        });
      }

      const milestone = await Milestone.findById(
        req.params.id
      );

      if (!milestone) {
        return res.status(404).json({
          message: "Milestone not found",
        });
      }

      // -------------------------------
      // UPDATE NAME
      // -------------------------------

      if (name !== undefined) {
        const cleanName = name.trim();

        if (cleanName.length < 2) {
          return res.status(400).json({
            message:
              "Milestone name must be at least 2 characters",
          });
        }

        milestone.name = cleanName;
      }

      // -------------------------------
      // UPDATE DESCRIPTION
      // -------------------------------

      if (description !== undefined) {
        milestone.description =
          description.trim();
      }

      // -------------------------------
      // UPDATE PROJECT
      // -------------------------------

      if (project !== undefined) {
        if (
          !mongoose.Types.ObjectId.isValid(project)
        ) {
          return res.status(400).json({
            message: "Invalid project ID",
          });
        }

        const existingProject =
          await Project.findById(project);

        if (!existingProject) {
          return res.status(404).json({
            message: "Project not found",
          });
        }

        milestone.project = project;
      }

      // -------------------------------
      // UPDATE DUE DATE
      // -------------------------------

      if (dueDate !== undefined) {
        milestone.dueDate = dueDate;
      }

      // -------------------------------
      // UPDATE STATUS
      // -------------------------------

      if (status !== undefined) {
        const selectedStatus =
          status.toLowerCase();

        if (
          ![
            "pending",
            "in-progress",
            "completed",
          ].includes(selectedStatus)
        ) {
          return res.status(400).json({
            message: "Invalid milestone status",
          });
        }

        milestone.status = selectedStatus;
      }

      await milestone.save();

      await milestone.populate([
        {
          path: "project",
          select: "name status",
        },
        {
          path: "createdBy",
          select: "name email role",
        },
      ]);

      res.status(200).json({
        message: "Milestone updated successfully",
        milestone,
      });
    } catch (error) {
      console.error(
        "UPDATE MILESTONE ERROR:",
        error
      );

      res.status(500).json({
        message: "Unable to update milestone",
      });
    }
  }
);

// ======================================================
// DELETE MILESTONE
// DELETE /api/milestones/:id
// Admin only
// ======================================================

router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          message: "Invalid milestone ID",
        });
      }

      const milestone =
        await Milestone.findByIdAndDelete(
          req.params.id
        );

      if (!milestone) {
        return res.status(404).json({
          message: "Milestone not found",
        });
      }

      res.status(200).json({
        message:
          "Milestone deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE MILESTONE ERROR:",
        error
      );

      res.status(500).json({
        message: "Unable to delete milestone",
      });
    }
  }
);

module.exports = router;