import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeNotifications = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Task Assigned",
      message:
        "A new task 'Create Homepage UI' has been assigned to you.",
      type: "Task",
      time: "2 hours ago",
      date: "07 Sep 2026",
      read: false,
    },
    {
      id: 2,
      title: "Project Updated",
      message:
        "The Website Redesign project has been updated by the project manager.",
      type: "Project",
      time: "5 hours ago",
      date: "07 Sep 2026",
      read: false,
    },
    {
      id: 3,
      title: "Task Deadline Reminder",
      message:
        "Your task 'Fix Login Validation' is due on 12 Sep 2026.",
      type: "Reminder",
      time: "Yesterday",
      date: "06 Sep 2026",
      read: false,
    },
    {
      id: 4,
      title: "Milestone Completed",
      message:
        "The Security Audit milestone has been successfully completed.",
      type: "Milestone",
      time: "Yesterday",
      date: "06 Sep 2026",
      read: true,
    },
    {
      id: 5,
      title: "Team Meeting",
      message:
        "Mobile App Development team meeting is scheduled for 12 Sep 2026 at 11:00 AM.",
      type: "Meeting",
      time: "2 days ago",
      date: "05 Sep 2026",
      read: true,
    },
    {
      id: 6,
      title: "Project Assignment",
      message:
        "You have been added to the ERP Development project team.",
      type: "Project",
      time: "3 days ago",
      date: "04 Sep 2026",
      read: true,
    },
    {
      id: 7,
      title: "Task Completed",
      message:
        "Your task 'Fix Responsive Issues' has been marked as completed.",
      type: "Task",
      time: "4 days ago",
      date: "03 Sep 2026",
      read: true,
    },
  ]);

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const readCount = notifications.filter(
    (notification) => notification.read
  ).length;

  const taskCount = notifications.filter(
    (notification) => notification.type === "Task"
  ).length;

  const projectCount = notifications.filter(
    (notification) => notification.type === "Project"
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.type
          .toLowerCase()
          .includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === "Unread") {
        matchesFilter = !notification.read;
      }

      if (filter === "Read") {
        matchesFilter = notification.read;
      }

      if (
        filter !== "All" &&
        filter !== "Unread" &&
        filter !== "Read"
      ) {
        matchesFilter = notification.type === filter;
      }

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  const getTypeStyle = (type) => {
    if (type === "Task") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (type === "Project") {
      return "bg-[#EAF5F5] text-[#397477]";
    }

    if (type === "Reminder") {
      return "bg-[#FFF4E5] text-[#A86400]";
    }

    if (type === "Milestone") {
      return "bg-[#E8F5E9] text-[#2E7D32]";
    }

    if (type === "Meeting") {
      return "bg-[#F1ECF8] text-[#6B4C8A]";
    }

    return "bg-[#F3F4F4] text-[#5F6668]";
  };

  const getIcon = (type) => {
    if (type === "Task") return "✓";
    if (type === "Project") return "📁";
    if (type === "Reminder") return "⏰";
    if (type === "Milestone") return "🎯";
    if (type === "Meeting") return "👥";

    return "🔔";
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );

    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* ================= HEADER ================= */}
      <header className="bg-[#061E29] text-white px-6 md:px-10 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <p className="text-sm text-[#B8C9CB]">
            Employee Workspace
          </p>

          <h1 className="text-2xl font-bold mt-1">
            Notifications
          </h1>
        </div>

        <button
          onClick={() => navigate("/employee-dashboard")}
          className="bg-[#1D546D] hover:bg-[#286B86] px-5 py-2.5 rounded-lg text-sm font-medium transition"
        >
          Dashboard
        </button>

      </header>

      {/* ================= CONTENT ================= */}
      <main className="p-6 md:p-8 max-w-7xl mx-auto">

        {/* INTRO */}
        <div className="mb-7">

          <h2 className="text-xl font-semibold text-[#061E29]">
            My Notifications
          </h2>

          <p className="text-sm text-[#7B8588] mt-1">
            Stay updated with your tasks, projects, meetings and
            milestones.
          </p>

        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          {/* Total */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Total Notifications
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-1">
                  {notifications.length}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center text-xl">
                🔔
              </div>

            </div>

          </div>

          {/* Unread */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Unread
                </p>

                <h3 className="text-3xl font-bold text-[#A86400] mt-1">
                  {unreadCount}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#FFF4E5] text-[#A86400] flex items-center justify-center text-xl">
                !
              </div>

            </div>

          </div>

          {/* Read */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Read
                </p>

                <h3 className="text-3xl font-bold text-[#2E7D32] mt-1">
                  {readCount}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center text-xl">
                ✓
              </div>

            </div>

          </div>

          {/* Tasks */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Task Alerts
                </p>

                <h3 className="text-3xl font-bold text-[#1D546D] mt-1">
                  {taskCount}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center text-xl">
                ✓
              </div>

            </div>

          </div>

        </section>

        {/* ================= SEARCH + FILTER ================= */}
        <section className="bg-white border border-[#D9E1E2] rounded-xl p-5 mb-7">

          <div className="flex flex-col lg:flex-row gap-4 lg:items-end">

            <div className="flex-1">

              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Search Notifications
              </label>

              <input
                type="text"
                placeholder="Search notifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-[#D9E1E2] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1D546D] focus:ring-1 focus:ring-[#1D546D]"
              />

            </div>

            <div className="w-full lg:w-52">

              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Filter
              </label>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border border-[#D9E1E2] rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Notifications</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
                <option value="Task">Tasks</option>
                <option value="Project">Projects</option>
                <option value="Reminder">Reminders</option>
                <option value="Milestone">Milestones</option>
                <option value="Meeting">Meetings</option>
              </select>

            </div>

            <button
              onClick={markAllAsRead}
              className="bg-[#1D546D] hover:bg-[#286B86] text-white px-5 py-3 rounded-lg text-sm font-medium transition"
            >
              ✓ Mark All as Read
            </button>

          </div>

        </section>

        {/* ================= NOTIFICATIONS LIST ================= */}
        <section>

          <div className="flex items-center justify-between mb-4">

            <div>
              <h2 className="text-lg font-semibold text-[#061E29]">
                Notification List
              </h2>

              <p className="text-sm text-[#7B8588] mt-1">
                {filteredNotifications.length} notification
                {filteredNotifications.length !== 1 ? "s" : ""} found
              </p>
            </div>

          </div>

          {filteredNotifications.length === 0 ? (

            <div className="bg-white border border-[#D9E1E2] rounded-xl p-10 text-center">

              <div className="text-4xl mb-3">
                🔔
              </div>

              <h3 className="font-semibold text-[#302D30]">
                No notifications found
              </h3>

              <p className="text-sm text-[#7B8588] mt-1">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredNotifications.map((notification) => (

                <div
                  key={notification.id}
                  className={`bg-white border rounded-xl p-5 transition hover:shadow-md ${
                    notification.read
                      ? "border-[#D9E1E2]"
                      : "border-[#9ABFC3] bg-[#FBFDFD]"
                  }`}
                >

                  <div className="flex flex-col md:flex-row gap-4">

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl ${getTypeStyle(
                        notification.type
                      )}`}
                    >
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                        <div>

                          <div className="flex items-center gap-2 flex-wrap">

                            <h3 className="font-semibold text-[#302D30]">
                              {notification.title}
                            </h3>

                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-[#1D546D]"></span>
                            )}

                          </div>

                          <p className="text-sm text-[#7B8588] mt-2 leading-6">
                            {notification.message}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTypeStyle(
                            notification.type
                          )}`}
                        >
                          {notification.type}
                        </span>

                      </div>

                      {/* Bottom */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-[#E6EAEB]">

                        <div className="text-xs text-[#7B8588]">
                          {notification.date} •{" "}
                          {notification.time}
                        </div>

                        <div className="flex flex-wrap gap-2">

                          <button
                            onClick={() =>
                              setSelectedNotification(notification)
                            }
                            className="px-4 py-2 rounded-lg bg-[#E7F0F1] text-[#1D546D] border border-[#C8D9DB] text-sm font-medium hover:bg-[#1D546D] hover:text-white transition"
                          >
                            👁 View
                          </button>

                          {!notification.read && (
                            <button
                              onClick={() =>
                                markAsRead(notification.id)
                              }
                              className="px-4 py-2 rounded-lg bg-[#E8F5E9] text-[#2E7D32] border border-[#C9E2CB] text-sm font-medium hover:bg-[#2E7D32] hover:text-white transition"
                            >
                              ✓ Mark Read
                            </button>
                          )}

                          <button
                            onClick={() =>
                              deleteNotification(notification.id)
                            }
                            className="px-4 py-2 rounded-lg bg-[#FFF5F5] text-[#A33A3A] border border-[#F0CACA] text-sm font-medium hover:bg-[#A33A3A] hover:text-white transition"
                          >
                            🗑 Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      {/* ================= VIEW MODAL ================= */}
      {selectedNotification && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D9E1E2]">

              <div>

                <p className="text-xs text-[#7B8588]">
                  Notification Details
                </p>

                <h2 className="text-xl font-bold text-[#061E29] mt-1">
                  {selectedNotification.title}
                </h2>

              </div>

              <button
                onClick={() => setSelectedNotification(null)}
                className="text-2xl text-[#7B8588] hover:text-[#061E29] transition"
              >
                ×
              </button>

            </div>

            {/* Content */}
            <div className="p-6">

              <div className="flex items-center gap-3 mb-5">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${getTypeStyle(
                    selectedNotification.type
                  )}`}
                >
                  {getIcon(selectedNotification.type)}
                </div>

                <div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(
                      selectedNotification.type
                    )}`}
                  >
                    {selectedNotification.type}
                  </span>

                  <p className="text-xs text-[#7B8588] mt-2">
                    {selectedNotification.date} •{" "}
                    {selectedNotification.time}
                  </p>

                </div>

              </div>

              <div>

                <p className="text-xs text-[#7B8588] mb-2">
                  Message
                </p>

                <p className="text-sm text-[#302D30] leading-6">
                  {selectedNotification.message}
                </p>

              </div>

              <div className="mt-5">

                <p className="text-xs text-[#7B8588] mb-2">
                  Status
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedNotification.read
                      ? "bg-[#E8F5E9] text-[#2E7D32]"
                      : "bg-[#FFF4E5] text-[#A86400]"
                  }`}
                >
                  {selectedNotification.read
                    ? "Read"
                    : "Unread"}
                </span>

              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#D9E1E2] flex justify-end gap-3">

              {!selectedNotification.read && (
                <button
                  onClick={() => {
                    markAsRead(selectedNotification.id);
                    setSelectedNotification({
                      ...selectedNotification,
                      read: true,
                    });
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#E8F5E9] text-[#2E7D32] border border-[#C9E2CB] text-sm font-medium hover:bg-[#2E7D32] hover:text-white transition"
                >
                  ✓ Mark as Read
                </button>
              )}

              <button
                onClick={() => setSelectedNotification(null)}
                className="px-5 py-2.5 rounded-lg bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-medium transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default EmployeeNotifications;