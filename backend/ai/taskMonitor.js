const Task = require("../models/Task");
const Notification = require("../models/Notification");

// =====================================================
// AI TASK MONITOR
// Detects:
// 1. Upcoming deadlines
// 2. Overdue tasks
// =====================================================

const monitorTasks = async () => {
  try {
    console.log("🤖 AI Task Monitor started...");

    const now = new Date();

    // ---------------------------------------------------
    // Find active tasks
    // ---------------------------------------------------

    const tasks = await Task.find({
      status: {
        $in: ["todo", "in-progress"],
      },
      dueDate: {
        $ne: null,
      },
    })
      .populate("assignedTo", "name email")
      .populate("project", "name");

    let upcomingCount = 0;
    let overdueCount = 0;

    // ---------------------------------------------------
    // Check every task
    // ---------------------------------------------------

    for (const task of tasks) {
      if (!task.dueDate) {
        continue;
      }

      const dueDate = new Date(task.dueDate);

      // Difference in hours
      const differenceInMs = dueDate.getTime() - now.getTime();

      const differenceInHours =
        differenceInMs / (1000 * 60 * 60);

      // =================================================
      // 1. OVERDUE TASK
      // =================================================

      if (differenceInMs < 0) {
        overdueCount++;

        // Only notify if task is assigned to someone
        if (!task.assignedTo) {
          continue;
        }

        // Check if similar unread notification already exists
        const existingNotification =
          await Notification.findOne({
            recipient: task.assignedTo._id,
            relatedTask: task._id,
            type: "task",
            isRead: false,
            title: "Task Overdue",
          });

        if (!existingNotification) {
          await Notification.create({
            recipient: task.assignedTo._id,

            title: "Task Overdue",

            message: `The task "${task.title}" is overdue and requires your attention.`,

            type: "task",

            relatedTask: task._id,

            relatedProject: task.project
              ? task.project._id
              : null,

            createdBy: null,
          });

          console.log(
            `🚨 Overdue notification created: ${task.title}`
          );
        }

        continue;
      }

      // =================================================
      // 2. UPCOMING DEADLINE
      // =================================================

      // Deadline within next 48 hours
      if (differenceInHours <= 48) {
        upcomingCount++;

        // Only notify if task is assigned
        if (!task.assignedTo) {
          continue;
        }

        // Prevent duplicate unread notification
        const existingNotification =
          await Notification.findOne({
            recipient: task.assignedTo._id,
            relatedTask: task._id,
            type: "task",
            isRead: false,
            title: "Deadline Approaching",
          });

        if (!existingNotification) {
          const hoursRemaining = Math.max(
            1,
            Math.ceil(differenceInHours)
          );

          await Notification.create({
            recipient: task.assignedTo._id,

            title: "Deadline Approaching",

            message: `The task "${task.title}" is due within approximately ${hoursRemaining} hours.`,

            type: "task",

            relatedTask: task._id,

            relatedProject: task.project
              ? task.project._id
              : null,

            createdBy: null,
          });

          console.log(
            `⚠️ Deadline notification created: ${task.title}`
          );
        }
      }
    }

    // ---------------------------------------------------
    // Monitoring summary
    // ---------------------------------------------------

    console.log(
      `🤖 AI Task Monitor completed | Upcoming: ${upcomingCount} | Overdue: ${overdueCount}`
    );

    return {
      success: true,
      upcomingCount,
      overdueCount,
    };
  } catch (error) {
    console.error("❌ AI Task Monitor error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = {
  monitorTasks,
};