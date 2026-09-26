const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");
const { protect } = require("../middleware/authMiddleware");

// =====================================================
// GET ALL NOTIFICATIONS FOR LOGGED-IN USER
// =====================================================
router.get("/", protect, async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .populate("relatedTask", "title status")
      .populate("relatedProject", "name status")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
});

// =====================================================
// GET UNREAD NOTIFICATION COUNT
// =====================================================
router.get("/unread-count", protect, async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });

    res.json({ count });
  } catch (error) {
    console.error("Unread count error:", error);
    res.status(500).json({
      message: "Failed to get unread notification count",
      error: error.message,
    });
  }
});

// =====================================================
// MARK ONE NOTIFICATION AS READ
// =====================================================
router.put("/:id/read", protect, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        recipient: req.user._id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Mark notification read error:", error);
    res.status(500).json({
      message: "Failed to update notification",
      error: error.message,
    });
  }
});

// =====================================================
// MARK ALL NOTIFICATIONS AS READ
// =====================================================
router.put("/read-all", protect, async (req, res) => {
  try {
    await Notification.updateMany(
      {
        recipient: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark all notifications read error:", error);
    res.status(500).json({
      message: "Failed to update notifications",
      error: error.message,
    });
  }
});

// =====================================================
// DELETE ONE NOTIFICATION
// =====================================================
router.delete("/:id", protect, async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error);
    res.status(500).json({
      message: "Failed to delete notification",
      error: error.message,
    });
  }
});

module.exports = router;