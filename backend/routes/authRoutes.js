const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ======================================================
// VALIDATION HELPERS
// ======================================================

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validRoles = ["admin", "manager", "employee"];

// ======================================================
// TEST ROUTE
// ======================================================

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route working",
  });
});

// ======================================================
// LOGIN TEST ROUTE
// ======================================================

router.get("/login-test", (req, res) => {
  res.json({
    message: "Login route file is working",
  });
});

// ======================================================
// REGISTER
// ======================================================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // -------------------------------
    // BASIC VALIDATION
    // -------------------------------

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // -------------------------------
    // NAME VALIDATION
    // -------------------------------

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

    // -------------------------------
    // EMAIL VALIDATION
    // -------------------------------

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // -------------------------------
    // PASSWORD VALIDATION
    // -------------------------------

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if (password.length > 100) {
      return res.status(400).json({
        message: "Password cannot exceed 100 characters",
      });
    }

    // -------------------------------
    // ROLE VALIDATION
    // -------------------------------

    const selectedRole = role
      ? role.toLowerCase()
      : "employee";

    if (!validRoles.includes(selectedRole)) {
      return res.status(400).json({
        message: "Invalid role selected",
      });
    }

    // -------------------------------
    // CHECK EXISTING USER
    // -------------------------------

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    // -------------------------------
    // HASH PASSWORD
    // -------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    // -------------------------------
    // CREATE USER
    // -------------------------------

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: selectedRole,
    });

    // -------------------------------
    // RESPONSE
    // -------------------------------

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Unable to register user. Please try again.",
    });
  }
});

// ======================================================
// LOGIN
// ======================================================

router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN REQUEST RECEIVED");

    const { email, password } = req.body;

    // -------------------------------
    // BASIC VALIDATION
    // -------------------------------

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // -------------------------------
    // EMAIL VALIDATION
    // -------------------------------

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // -------------------------------
    // PASSWORD VALIDATION
    // -------------------------------

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // -------------------------------
    // FIND USER
    // -------------------------------

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // -------------------------------
    // CHECK PASSWORD
    // -------------------------------

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // -------------------------------
    // CHECK JWT SECRET
    // -------------------------------

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is missing in .env",
      });
    }

    // -------------------------------
    // CREATE JWT
    // -------------------------------

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log("LOGIN SUCCESS:", user.email);

    // -------------------------------
    // RESPONSE
    // -------------------------------

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Unable to login. Please try again.",
    });
  }
});

// ======================================================
// FORGOT PASSWORD
// ======================================================

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // -------------------------------
    // VALIDATE EMAIL
    // -------------------------------

    if (!email) {
      return res.status(400).json({
        message: "Email address is required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // -------------------------------
    // FIND USER
    // -------------------------------

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email address",
      });
    }

    // -------------------------------
    // CREATE RESET TOKEN
    // -------------------------------

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    // Token valid for 15 minutes
    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // -------------------------------
    // DEVELOPMENT RESPONSE
    // -------------------------------

    res.json({
      message: "Password reset request created",
      resetToken,
    });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Unable to process password reset request",
    });
  }
});

// ======================================================
// RESET PASSWORD
// ======================================================

router.post("/reset-password", async (req, res) => {
  try {
    const {
      token,
      password,
      confirmPassword,
    } = req.body;

    // -------------------------------
    // REQUIRED FIELDS
    // -------------------------------

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        message:
          "Reset token, password and confirm password are required",
      });
    }

    // -------------------------------
    // PASSWORD VALIDATION
    // -------------------------------

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if (password.length > 100) {
      return res.status(400).json({
        message: "Password cannot exceed 100 characters",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // -------------------------------
    // HASH TOKEN
    // -------------------------------

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // -------------------------------
    // FIND USER
    // -------------------------------

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Reset token is invalid or has expired",
      });
    }

    // -------------------------------
    // HASH NEW PASSWORD
    // -------------------------------

    user.password = await bcrypt.hash(password, 10);

    // -------------------------------
    // REMOVE RESET TOKEN
    // -------------------------------

    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    // -------------------------------
    // SUCCESS
    // -------------------------------

    res.json({
      message:
        "Password reset successful. You can now login with your new password.",
    });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Unable to reset password",
    });
  }
});

// ======================================================
// PROFILE
// ======================================================

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select(
        "-password -resetPasswordToken -resetPasswordExpire"
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Profile accessed successfully",
      user,
    });

  } catch (error) {
    console.error("PROFILE ERROR:", error);

    res.status(500).json({
      message: "Unable to load profile",
    });
  }
});

// ======================================================
// ADMIN ONLY
// ======================================================

router.get(
  "/admin",
  protect,
  allowRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin! You have full access.",
    });
  }
);

// ======================================================
// MANAGER ONLY
// ======================================================

router.get(
  "/manager",
  protect,
  allowRoles("manager"),
  (req, res) => {
    res.json({
      message:
        "Welcome Manager! You can manage projects and tasks.",
    });
  }
);

// ======================================================
// EMPLOYEE ONLY
// ======================================================

router.get(
  "/employee",
  protect,
  allowRoles("employee"),
  (req, res) => {
    res.json({
      message:
        "Welcome Employee! You can access your tasks.",
    });
  }
);

module.exports = router;