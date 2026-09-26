const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/User");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==================================================
// GET ALL USERS
// ==================================================

router.get(
  "/",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password -resetPasswordToken -resetPasswordExpire")
        .sort({ createdAt: -1 });

      res.status(200).json({
        count: users.length,
        users,
      });
    } catch (error) {
      console.error("GET USERS ERROR:", error);

      res.status(500).json({
        message: "Unable to fetch users",
      });
    }
  }
);

// ==================================================
// GET ALL EMPLOYEES
// ==================================================

router.get(
  "/employees",
  protect,
  async (req, res) => {
    try {
      const employees = await User.find({
        role: "employee",
      })
        .select("_id name email role department status")
        .sort({ name: 1 });

      res.status(200).json({
        count: employees.length,
        employees,
      });
    } catch (error) {
      console.error("GET EMPLOYEES ERROR:", error);

      res.status(500).json({
        message: "Unable to fetch employees",
      });
    }
  }
);

// ==================================================
// GET SINGLE USER
// ==================================================

router.get(
  "/:id",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Invalid user ID",
        });
      }

      const user = await User.findById(req.params.id)
        .select("-password -resetPasswordToken -resetPasswordExpire");

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        user,
      });
    } catch (error) {
      console.error("GET USER ERROR:", error);

      res.status(500).json({
        message: "Unable to fetch user",
      });
    }
  }
);

// ==================================================
// CREATE USER
// ==================================================

router.post(
  "/",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
        department,
        status,
      } = req.body;

      // ------------------------------------------
      // REQUIRED FIELDS
      // ------------------------------------------

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Name, email and password are required",
        });
      }

      // ------------------------------------------
      // NAME VALIDATION
      // ------------------------------------------

      const cleanName = name.trim();

      if (cleanName.length < 2) {
        return res.status(400).json({
          message: "Name must be at least 2 characters",
        });
      }

      if (cleanName.length > 50) {
        return res.status(400).json({
          message: "Name cannot exceed 50 characters",
        });
      }

      if (!/^[A-Za-z\s]+$/.test(cleanName)) {
        return res.status(400).json({
          message: "Name can contain only letters and spaces",
        });
      }

      // ------------------------------------------
      // EMAIL VALIDATION
      // ------------------------------------------

      const cleanEmail = email.trim().toLowerCase();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          message: "Please enter a valid email address",
        });
      }

      // ------------------------------------------
      // PASSWORD VALIDATION
      // ------------------------------------------

      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters",
        });
      }

      // ------------------------------------------
      // ROLE VALIDATION
      // ------------------------------------------

      const selectedRole = role
        ? role.toLowerCase()
        : "employee";

      if (!["admin", "employee"].includes(selectedRole)) {
        return res.status(400).json({
          message: "Invalid role selected",
        });
      }

      // ------------------------------------------
      // DEPARTMENT
      // ------------------------------------------

      const cleanDepartment = department
        ? department.trim()
        : "General";

      if (cleanDepartment.length > 50) {
        return res.status(400).json({
          message: "Department cannot exceed 50 characters",
        });
      }

      // ------------------------------------------
      // STATUS
      // ------------------------------------------

      const selectedStatus = status || "Active";

      if (!["Active", "Inactive"].includes(selectedStatus)) {
        return res.status(400).json({
          message: "Invalid status selected",
        });
      }

      // ------------------------------------------
      // CHECK EXISTING USER
      // ------------------------------------------

      const existingUser = await User.findOne({
        email: cleanEmail,
      });

      if (existingUser) {
        return res.status(409).json({
          message: "An account with this email already exists",
        });
      }

      // ------------------------------------------
      // HASH PASSWORD
      // ------------------------------------------

      const hashedPassword = await bcrypt.hash(
        password,
        10
      );

      // ------------------------------------------
      // CREATE USER
      // ------------------------------------------

      const user = await User.create({
        name: cleanName,
        email: cleanEmail,
        password: hashedPassword,
        role: selectedRole,
        department: cleanDepartment,
        status: selectedStatus,
      });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          status: user.status,
        },
      });
    } catch (error) {
      console.error("CREATE USER ERROR:", error);

      res.status(500).json({
        message: "Unable to create user",
      });
    }
  }
);

// ==================================================
// UPDATE USER
// ==================================================

router.put(
  "/:id",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
        department,
        status,
      } = req.body;

      // ------------------------------------------
      // VALIDATE USER ID
      // ------------------------------------------

      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Invalid user ID",
        });
      }

      // ------------------------------------------
      // FIND USER
      // ------------------------------------------

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // ------------------------------------------
      // UPDATE NAME
      // ------------------------------------------

      if (name !== undefined) {
        const cleanName = name.trim();

        if (cleanName.length < 2) {
          return res.status(400).json({
            message: "Name must be at least 2 characters",
          });
        }

        if (cleanName.length > 50) {
          return res.status(400).json({
            message: "Name cannot exceed 50 characters",
          });
        }

        if (!/^[A-Za-z\s]+$/.test(cleanName)) {
          return res.status(400).json({
            message: "Name can contain only letters and spaces",
          });
        }

        user.name = cleanName;
      }

      // ------------------------------------------
      // UPDATE EMAIL
      // ------------------------------------------

      if (email !== undefined) {
        const cleanEmail = email.trim().toLowerCase();

        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
          return res.status(400).json({
            message: "Please enter a valid email address",
          });
        }

        const existingUser = await User.findOne({
          email: cleanEmail,
          _id: { $ne: user._id },
        });

        if (existingUser) {
          return res.status(409).json({
            message:
              "An account with this email already exists",
          });
        }

        user.email = cleanEmail;
      }

      // ------------------------------------------
      // UPDATE ROLE
      // ------------------------------------------

      if (role !== undefined) {
        const selectedRole = role.toLowerCase();

        if (!["admin", "employee"].includes(selectedRole)) {
          return res.status(400).json({
            message: "Invalid role selected",
          });
        }

        user.role = selectedRole;
      }

      // ------------------------------------------
      // UPDATE DEPARTMENT
      // ------------------------------------------

      if (department !== undefined) {
        const cleanDepartment = department.trim();

        if (cleanDepartment.length > 50) {
          return res.status(400).json({
            message: "Department cannot exceed 50 characters",
          });
        }

        user.department = cleanDepartment || "General";
      }

      // ------------------------------------------
      // UPDATE STATUS
      // ------------------------------------------

      if (status !== undefined) {
        if (!["Active", "Inactive"].includes(status)) {
          return res.status(400).json({
            message: "Invalid status selected",
          });
        }

        user.status = status;
      }

      // ------------------------------------------
      // UPDATE PASSWORD
      // ------------------------------------------

      if (password !== undefined && password !== "") {
        if (password.length < 6) {
          return res.status(400).json({
            message: "Password must be at least 6 characters",
          });
        }

        user.password = await bcrypt.hash(
          password,
          10
        );
      }

      // ------------------------------------------
      // SAVE USER
      // ------------------------------------------

      await user.save();

      res.status(200).json({
        message: "User updated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          status: user.status,
        },
      });
    } catch (error) {
      console.error("UPDATE USER ERROR:", error);

      res.status(500).json({
        message: "Unable to update user",
      });
    }
  }
);

// ==================================================
// DELETE USER
// ==================================================

router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Invalid user ID",
        });
      }

      if (req.user.id === req.params.id) {
        return res.status(400).json({
          message: "You cannot delete your own account",
        });
      }

      const user = await User.findByIdAndDelete(
        req.params.id
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("DELETE USER ERROR:", error);

      res.status(500).json({
        message: "Unable to delete user",
      });
    }
  }
);

module.exports = router;