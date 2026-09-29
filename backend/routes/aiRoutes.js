const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { monitorTasks } = require("../ai/taskMonitor");

// =====================================================
// AI TASK MONITOR TEST
// =====================================================

router.post("/monitor-tasks", protect, async (req, res) => {
  try {
    const result = await monitorTasks();

    res.json({
      message: "AI task monitoring completed",
      result,
    });
  } catch (error) {
    console.error("AI monitor route error:", error);

    res.status(500).json({
      message: "AI task monitoring failed",
      error: error.message,
    });
  }
});

module.exports = router;