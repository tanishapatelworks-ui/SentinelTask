
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialNotifications = [
  {
    id: 1,
    title: "New Task Assigned",
    message:
      "You have been assigned a new task for the Website Redesign project.",
    type: "Task",
    time: "10 minutes ago",
    date: "2026-09-07",
    read: false,
  },
  {
    id: 2,
    title: "Project Deadline Approaching",
    message:
      "The Website Redesign project deadline is approaching on September 20, 2026.",
    type: "Deadline",
    time: "1 hour ago",
    date: "2026-09-07",
    read: false,
  },
  {
    id: 3,
    title: "Milestone Completed",
    message:
      "UI Design Completion milestone has been completed successfully.",
    type: "Milestone",
    time: "3 hours ago",
    date: "2026-09-07",
    read: true,
  },
  {
    id: 4,
    title: "Team Member Added",
    message:
      "Priya Shah has been added to the Website Redesign project team.",
    type: "Team",
    time: "Yesterday",
    date: "2026-09-06",
    read: true,
  },
  {
    id: 5,
    title: "Meeting Scheduled",
    message:
      "A Mobile UI Discussion meeting has been scheduled for September 12.",
    type: "Meeting",
    time: "Yesterday",
    date: "2026-09-06",
    read: false,
  },
  {
    id: 6,
    title: "Task Completed",
    message:
      "The ERP Development Sprint task has been marked as completed.",
    type: "Task",
    time: "2 days ago",
    date: "2026-09-05",
    read: true,
  },
];

const notificationTypes = [
  "Task",
  "Deadline",
  "Milestone",
  "Team",
  "Meeting",
  "Other",
];

function ManagerNotifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [viewNotification, setViewNotification] =
    useState(null);

  const totalNotifications = notifications.length;

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

  const readNotifications = notifications.filter(
    (notification) => notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(searchText) ||
        notification.message
          .toLowerCase()
          .includes(searchText) ||
        notification.type
          .toLowerCase()
          .includes(searchText);

      let matchesFilter = true;

      if (filter === "Unread") {
        matchesFilter = !notification.read;
      }

      if (filter === "Read") {
        matchesFilter = notification.read;
      }

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: false,
            }
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

    setViewNotification(null);
  };

  const openNotification = (notification) => {
    setViewNotification(notification);

    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const getTypeStyle = (type) => {
    if (type === "Task") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (type === "Deadline") {
      return "bg-[#F8ECEC] text-[#9B3D3D]";
    }

    if (type === "Milestone") {
      return "bg-[#E8F3EE] text-[#276749]";
    }

    if (type === "Team") {
      return "bg-[#F2EDF7] text-[#6B4F8A]";
    }

    if (type === "Meeting") {
      return "bg-[#EEF1F7] text-[#4A5A78]";
    }

    return "bg-[#F3F4F4] text-[#302D30]";
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* ================= HEADER ================= */}

      <header className="h-20 bg-[#061E29] px-6 lg:px-8 flex items-center justify-between">

        <div>
          <p className="text-sm text-[#B8C9CB]">
            SentinelTask
          </p>

          <h1 className="text-xl font-semibold text-white mt-1">
            Manager Notifications
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/manager-dashboard")}
          className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
        >
          Dashboard
        </button>

      </header>


      {/* ================= CONTENT ================= */}

      <main className="p-6 lg:p-8">

        {/* PAGE HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7">

          <div>
            <h2 className="text-2xl font-bold text-[#061E29]">
              Notifications
            </h2>

            <p className="text-sm text-[#5F9598] mt-1">
              Stay updated with your projects, tasks and team activities.
            </p>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadNotifications === 0}
            className={`px-5 py-3 rounded-xl text-sm font-semibold transition ${
              unreadNotifications === 0
                ? "bg-[#D9E1E2] text-[#7A898B] cursor-not-allowed"
                : "bg-[#1D546D] hover:bg-[#286B86] text-white"
            }`}
          >
            Mark All as Read
          </button>

        </div>


        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Total Notifications
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalNotifications}
            </h3>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Unread
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {unreadNotifications}
            </h3>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Read
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {readNotifications}
            </h3>
          </div>

        </div>


        {/* ================= FILTERS ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none focus:border-[#5F9598]"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none"
            >
              <option value="All">
                All Notifications
              </option>

              <option value="Unread">
                Unread
              </option>

              <option value="Read">
                Read
              </option>
            </select>

          </div>

        </div>


        {/* ================= NOTIFICATION LIST ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

          <div className="px-5 py-5 border-b border-[#D9E1E2]">

            <h3 className="text-lg font-bold text-[#061E29]">
              Recent Notifications
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              {filteredNotifications.length} notification
              {filteredNotifications.length !== 1 ? "s" : ""} found
            </p>

          </div>


          {filteredNotifications.length === 0 ? (

            <div className="text-center py-16 px-5">

              <div className="w-14 h-14 rounded-2xl bg-[#F3F4F4] mx-auto flex items-center justify-center text-[#5F9598] text-2xl">
                ✓
              </div>

              <p className="text-sm font-semibold text-[#061E29] mt-4">
                No notifications found
              </p>

              <p className="text-xs text-[#5F9598] mt-1">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-[#D9E1E2]">

              {filteredNotifications.map(
                (notification) => (

                  <div
                    key={notification.id}
                    className={`p-5 transition hover:bg-[#FAFAFA] ${
                      !notification.read
                        ? "bg-[#F7FAFA]"
                        : "bg-white"
                    }`}
                  >

                    <div className="flex items-start gap-4">

                      {/* ICON */}

                      <div
                        className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold ${getTypeStyle(
                          notification.type
                        )}`}
                      >
                        {notification.type === "Task"
                          ? "T"
                          : notification.type === "Deadline"
                          ? "!"
                          : notification.type === "Milestone"
                          ? "M"
                          : notification.type === "Team"
                          ? "P"
                          : notification.type === "Meeting"
                          ? "C"
                          : "N"}
                      </div>


                      {/* CONTENT */}

                      <div className="flex-1 min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <span
                            className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold ${getTypeStyle(
                              notification.type
                            )}`}
                          >
                            {notification.type}
                          </span>

                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-[#1D546D]" />
                          )}

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openNotification(notification)
                          }
                          className="text-left text-sm font-bold text-[#061E29] mt-2 hover:text-[#1D546D]"
                        >
                          {notification.title}
                        </button>

                        <p className="text-xs text-[#5F9598] mt-1 line-clamp-2">
                          {notification.message}
                        </p>

                        <p className="text-[10px] text-[#8A999B] mt-2">
                          {notification.time}
                        </p>

                      </div>


                      {/* ACTIONS */}

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            openNotification(notification)
                          }
                          className="text-xs font-semibold text-[#1D546D] hover:underline"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            notification.read
                              ? markAsUnread(
                                  notification.id
                                )
                              : markAsRead(
                                  notification.id
                                )
                          }
                          className="text-xs font-semibold text-[#5F9598] hover:text-[#1D546D]"
                        >
                          {notification.read
                            ? "Unread"
                            : "Read"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteNotification(
                              notification.id
                            )
                          }
                          className="text-xs font-semibold text-[#9B3D3D] hover:underline"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </main>


      {/* ================= VIEW MODAL ================= */}

      {viewNotification && (

        <div className="fixed inset-0 bg-[#061E29]/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <div>

                <p className="text-xs text-[#5F9598]">
                  Notification Details
                </p>

                <h3 className="text-lg font-bold text-[#061E29] mt-1">
                  {viewNotification.title}
                </h3>

              </div>

              <button
                type="button"
                onClick={() =>
                  setViewNotification(null)
                }
                className="text-[#5F9598] hover:text-[#061E29] text-xl"
              >
                ×
              </button>

            </div>


            <div className="p-6">

              <span
                className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${getTypeStyle(
                  viewNotification.type
                )}`}
              >
                {viewNotification.type}
              </span>

              <p className="text-sm leading-6 text-[#302D30] mt-5">
                {viewNotification.message}
              </p>


              <div className="mt-6 space-y-4">

                <div>

                  <p className="text-xs text-[#5F9598]">
                    Date
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewNotification.date}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-[#5F9598]">
                    Time
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewNotification.time}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-[#5F9598]">
                    Status
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewNotification.read
                      ? "Read"
                      : "Unread"}
                  </p>

                </div>

              </div>


              <div className="flex justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={() => {
                    viewNotification.read
                      ? markAsUnread(
                          viewNotification.id
                        )
                      : markAsRead(
                          viewNotification.id
                        );

                    setViewNotification({
                      ...viewNotification,
                      read: !viewNotification.read,
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#1D546D] text-sm font-semibold hover:bg-[#F3F4F4]"
                >
                  {viewNotification.read
                    ? "Mark Unread"
                    : "Mark Read"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteNotification(
                      viewNotification.id
                    )
                  }
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#9B3D3D] text-sm font-semibold hover:bg-[#F8ECEC]"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManagerNotifications;

