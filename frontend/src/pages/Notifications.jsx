import React, { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api/notifications";

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
};

const getNotificationIcon = (type) => {
  switch (type) {
    case "task":
      return "✓";
    case "project":
      return "▣";
    case "team":
      return "👥";
    case "report":
      return "▤";
    case "system":
      return "⚙";
    default:
      return "🔔";
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case "task":
      return "Task";
    case "project":
      return "Project";
    case "team":
      return "Team";
    case "report":
      return "Report";
    case "system":
      return "System";
    default:
      return "General";
  }
};

const formatDate = (date) => {
  if (!date) return "";

  const notificationDate = new Date(date);
  const now = new Date();

  const diff = now - notificationDate;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  return notificationDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getTypeStyle = (type) => {
  switch (type) {
    case "task":
      return {
        background: "#E7F2F3",
        color: "#1D546D",
      };

    case "project":
      return {
        background: "#E9EEF1",
        color: "#061E29",
      };

    case "team":
      return {
        background: "#EEF3F3",
        color: "#5F9598",
      };

    case "report":
      return {
        background: "#E8F0F2",
        color: "#1D546D",
      };

    case "system":
      return {
        background: "#EDF0F1",
        color: "#061E29",
      };

    default:
      return {
        background: "#F0F3F3",
        color: "#1D546D",
      };
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH NOTIFICATIONS
  // =====================================================
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("Authentication token not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch notifications"
        );
      }

      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Notifications fetch error:", err);
      setError(err.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // =====================================================
  // MARK ONE AS READ
  // =====================================================
  const markAsRead = async (id) => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/${id}/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to mark notification as read"
        );
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Mark read error:", err);
      setError(err.message || "Failed to update notification.");
    }
  };

  // =====================================================
  // MARK ALL AS READ
  // =====================================================
  const markAllAsRead = async () => {
    try {
      setActionLoading(true);
      setError("");

      const token = getToken();

      const response = await fetch(`${API_URL}/read-all`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to mark all notifications as read"
        );
      }

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (err) {
      console.error("Mark all read error:", err);
      setError(err.message || "Failed to update notifications.");
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // DELETE NOTIFICATION
  // =====================================================
  const deleteNotification = async (id) => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete notification"
        );
      }

      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
    } catch (err) {
      console.error("Delete notification error:", err);
      setError(err.message || "Failed to delete notification.");
    }
  };

  // =====================================================
  // FILTER + SEARCH
  // =====================================================
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.message
          ?.toLowerCase()
          .includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === "unread") {
        matchesFilter = !notification.isRead;
      }

      if (filter === "read") {
        matchesFilter = notification.isRead;
      }

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  // =====================================================
  // COUNTS
  // =====================================================
  const totalCount = notifications.length;

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const readCount = notifications.filter(
    (notification) => notification.isRead
  ).length;

  // =====================================================
  // UI
  // =====================================================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3F4F4",
        padding: "28px",
        color: "#061E29",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}
      <div
        style={{
          background: "#1D546D",
          borderRadius: "18px",
          padding: "26px 28px",
          color: "#fff",
          marginBottom: "24px",
          boxShadow: "0 8px 24px rgba(6, 30, 41, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "13px",
                opacity: 0.8,
                marginBottom: "6px",
                letterSpacing: "0.4px",
              }}
            >
              Workspace
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              Notifications
            </h1>

            <p
              style={{
                margin: "7px 0 0",
                fontSize: "14px",
                opacity: 0.85,
              }}
            >
              Stay updated with your projects, tasks and team activity.
            </p>
          </div>

          <button
            onClick={markAllAsRead}
            disabled={actionLoading || unreadCount === 0}
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "11px 17px",
              background:
                unreadCount === 0 ? "#5F9598" : "#061E29",
              color: "#fff",
              fontWeight: 600,
              cursor:
                actionLoading || unreadCount === 0
                  ? "not-allowed"
                  : "pointer",
              opacity: actionLoading ? 0.7 : 1,
            }}
          >
            {actionLoading ? "Updating..." : "✓ Mark All as Read"}
          </button>
        </div>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "20px",
            border: "1px solid #E1E6E7",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#5F6F75",
              marginBottom: "8px",
            }}
          >
            Total Notifications
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#061E29",
            }}
          >
            {totalCount}
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "20px",
            border: "1px solid #E1E6E7",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#5F6F75",
              marginBottom: "8px",
            }}
          >
            Unread
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#1D546D",
            }}
          >
            {unreadCount}
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "20px",
            border: "1px solid #E1E6E7",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#5F6F75",
              marginBottom: "8px",
            }}
          >
            Read
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#5F9598",
            }}
          >
            {readCount}
          </div>
        </div>
      </div>

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "16px",
          border: "1px solid #E1E6E7",
          marginBottom: "18px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, minWidth: "230px" }}>
          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 14px",
              border: "1px solid #D6DEDF",
              borderRadius: "9px",
              outline: "none",
              fontSize: "14px",
              color: "#061E29",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "7px",
            flexWrap: "wrap",
          }}
        >
          {[
            ["all", "All"],
            ["unread", "Unread"],
            ["read", "Read"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              style={{
                border: "1px solid #D6DEDF",
                borderRadius: "9px",
                padding: "10px 15px",
                background:
                  filter === value ? "#1D546D" : "#fff",
                color:
                  filter === value ? "#fff" : "#1D546D",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}
      {error && (
        <div
          style={{
            background: "#FFF2F2",
            border: "1px solid #F0CACA",
            color: "#9B2C2C",
            padding: "13px 15px",
            borderRadius: "10px",
            marginBottom: "18px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {/* =================================================
          LOADING
      ================================================= */}
      {loading ? (
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "50px",
            textAlign: "center",
            border: "1px solid #E1E6E7",
            color: "#5F6F75",
          }}
        >
          Loading notifications...
        </div>
      ) : filteredNotifications.length === 0 ? (
        /* =================================================
            EMPTY STATE
        ================================================= */
        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            padding: "60px 20px",
            textAlign: "center",
            border: "1px solid #E1E6E7",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#E7F2F3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "25px",
            }}
          >
            🔔
          </div>

          <h3
            style={{
              margin: "0 0 8px",
              fontSize: "18px",
              color: "#061E29",
            }}
          >
            No notifications found
          </h3>

          <p
            style={{
              margin: 0,
              color: "#6B7A80",
              fontSize: "14px",
            }}
          >
            {search || filter !== "all"
              ? "Try changing your search or filter."
              : "You're all caught up. New notifications will appear here."}
          </p>
        </div>
      ) : (
        /* =================================================
            NOTIFICATION LIST
        ================================================= */
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {filteredNotifications.map((notification) => {
            const typeStyle = getTypeStyle(notification.type);

            return (
              <div
                key={notification._id}
                style={{
                  background: notification.isRead
                    ? "#fff"
                    : "#F7FAFA",
                  border: notification.isRead
                    ? "1px solid #E1E6E7"
                    : "1px solid #BFD3D5",
                  borderRadius: "14px",
                  padding: "18px",
                  display: "flex",
                  gap: "15px",
                  alignItems: "flex-start",
                  boxShadow: notification.isRead
                    ? "none"
                    : "0 4px 14px rgba(29, 84, 109, 0.06)",
                }}
              >
                {/* ICON */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    minWidth: "44px",
                    borderRadius: "12px",
                    background: typeStyle.background,
                    color: typeStyle.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "17px",
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                {/* CONTENT */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      flexWrap: "wrap",
                      marginBottom: "5px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#061E29",
                      }}
                    >
                      {notification.title}
                    </h3>

                    {!notification.isRead && (
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: "#1D546D",
                          display: "inline-block",
                        }}
                      />
                    )}
                  </div>

                  <p
                    style={{
                      margin: "0 0 9px",
                      fontSize: "14px",
                      lineHeight: 1.55,
                      color: "#5D6D73",
                    }}
                  >
                    {notification.message}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "4px 8px",
                        borderRadius: "6px",
                        background: typeStyle.background,
                        color: typeStyle.color,
                      }}
                    >
                      {getTypeLabel(notification.type)}
                    </span>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "#7A888D",
                      }}
                    >
                      {formatDate(notification.createdAt)}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display: "flex",
                    gap: "7px",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {!notification.isRead && (
                    <button
                      onClick={() =>
                        markAsRead(notification._id)
                      }
                      title="Mark as read"
                      style={{
                        border: "1px solid #C9D7D9",
                        background: "#fff",
                        color: "#1D546D",
                        borderRadius: "8px",
                        padding: "8px 10px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      ✓ Read
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteNotification(notification._id)
                    }
                    title="Delete notification"
                    style={{
                      border: "1px solid #E1D3D3",
                      background: "#fff",
                      color: "#8B4A4A",
                      borderRadius: "8px",
                      padding: "8px 10px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}