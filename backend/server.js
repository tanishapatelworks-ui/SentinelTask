const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// ======================================================
// LOAD ENVIRONMENT VARIABLES
// ======================================================

dotenv.config();

// ======================================================
// ROUTES
// ======================================================

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const milestoneRoutes = require("./routes/milestoneRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const aiRoutes = require("./routes/aiRoutes");

// ======================================================
// CREATE EXPRESS APP
// ======================================================

const app = express();

// ======================================================
// CORS CONFIGURATION
// ======================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(express.json());

// ======================================================
// BASIC SERVER TEST
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SentinelTask Backend is running!",
  });
});

// ======================================================
// API ROUTES
// ======================================================

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/users", userRoutes);

app.use("/api/milestones", milestoneRoutes);

app.use("/api/notifications", notificationRoutes);

// ======================================================
// AI MONITORING ROUTES
// ======================================================

app.use("/api/ai", aiRoutes);

// ======================================================
// PROJECT API TEST
// ======================================================

app.get("/api/projects-test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Projects API path is working",
  });
});

// ======================================================
// API STATUS TEST
// ======================================================

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SentinelTask API is working",

    routes: {
      auth: "/api/auth",
      projects: "/api/projects",
      tasks: "/api/tasks",
      users: "/api/users",
      milestones: "/api/milestones",
      notifications: "/api/notifications",
      ai: "/api/ai",
    },
  });
});

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    method: req.method,
    path: req.originalUrl,
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  console.error("======================================");
  console.error("SERVER ERROR:");
  console.error(err);
  console.error("======================================");

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

// ======================================================
// START SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect MongoDB first
    await connectDB();

    app.listen(PORT, () => {
      console.log("");
      console.log("======================================");
      console.log("     SENTINELTASK BACKEND STARTED");
      console.log("======================================");
      console.log(`Server: http://localhost:${PORT}`);
      console.log("");
      console.log("API ROUTES:");
      console.log("--------------------------------------");
      console.log("Auth          : /api/auth");
      console.log("Projects      : /api/projects");
      console.log("Tasks         : /api/tasks");
      console.log("Users         : /api/users");
      console.log("Milestones    : /api/milestones");
      console.log("Notifications : /api/notifications");
      console.log("AI Monitor    : /api/ai");
      console.log("--------------------------------------");
      console.log("Project Test  : /api/projects-test");
      console.log("API Test      : /api/test");
      console.log("======================================");
      console.log("");
    });
  } catch (error) {
    console.error("");
    console.error("======================================");
    console.error("     BACKEND START FAILED");
    console.error("======================================");
    console.error(error);
    console.error("======================================");
  }
};

startServer();