import { useMemo, useState } from "react";

const initialActivities = [
  {
    id: 1,
    user: "Rahul Sharma",
    role: "Manager",
    action: "created a new project",
    target: "Website Redesign",
    type: "Project",
    time: "Today, 10:30 AM",
    details: "Created the Website Redesign project and added initial project information.",
  },
  {
    id: 2,
    user: "Priya Shah",
    role: "Manager",
    action: "assigned a task",
    target: "Design Homepage",
    type: "Task",
    time: "Today, 09:45 AM",
    details: "Assigned the Design Homepage task to Rahul Sharma.",
  },
  {
    id: 3,
    user: "Amit Patel",
    role: "Employee",
    action: "completed a task",
    target: "Marketing Banner",
    type: "Task",
    time: "Yesterday, 05:20 PM",
    details: "Marked the Marketing Banner task as completed.",
  },
  {
    id: 4,
    user: "Neha Patel",
    role: "Employee",
    action: "updated project progress",
    target: "ERP Development",
    type: "Project",
    time: "Yesterday, 03:15 PM",
    details: "Updated ERP Development project progress from 30% to 35%.",
  },
  {
    id: 5,
    user: "Admin",
    role: "Admin",
    action: "added a new team member",
    target: "Karan Mehta",
    type: "Team",
    time: "02 Sep 2026, 01:10 PM",
    details: "Added Karan Mehta to the SentinelTask workspace.",
  },
  {
    id: 6,
    user: "Rahul Sharma",
    role: "Manager",
    action: "updated milestone",
    target: "UI Design Completed",
    type: "Milestone",
    time: "02 Sep 2026, 11:30 AM",
    details: "Updated the UI Design Completed milestone status to Completed.",
  },
  {
    id: 7,
    user: "Priya Shah",
    role: "Manager",
    action: "updated a task",
    target: "Mobile UI Screens",
    type: "Task",
    time: "01 Sep 2026, 04:40 PM",
    details: "Changed the Mobile UI Screens task status to In Progress.",
  },
  {
    id: 8,
    user: "Admin",
    role: "Admin",
    action: "generated a report",
    target: "Project Performance Report",
    type: "Report",
    time: "01 Sep 2026, 02:00 PM",
    details: "Generated the latest project performance report.",
  },
];

const Activity = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activityTypes = [
    "All",
    "Project",
    "Task",
    "Team",
    "Milestone",
    "Report",
  ];

  const users = [
    "All",
    ...new Set(initialActivities.map((activity) => activity.user)),
  ];

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        activity.user.toLowerCase().includes(searchText) ||
        activity.action.toLowerCase().includes(searchText) ||
        activity.target.toLowerCase().includes(searchText) ||
        activity.type.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All" || activity.type === typeFilter;

      const matchesUser =
        userFilter === "All" || activity.user === userFilter;

      return matchesSearch && matchesType && matchesUser;
    });
  }, [activities, search, typeFilter, userFilter]);

  const projectCount = activities.filter(
    (activity) => activity.type === "Project"
  ).length;

  const taskCount = activities.filter(
    (activity) => activity.type === "Task"
  ).length;

  const teamCount = activities.filter(
    (activity) => activity.type === "Team"
  ).length;

  const milestoneCount = activities.filter(
    (activity) => activity.type === "Milestone"
  ).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case "Project":
        return "📁";
      case "Task":
        return "✓";
      case "Team":
        return "👥";
      case "Milestone":
        return "🎯";
      case "Report":
        return "📊";
      default:
        return "•";
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "Project":
        return "bg-[#E7F0F3] text-[#1D546D]";
      case "Task":
        return "bg-[#E9F4F1] text-[#2D6A63]";
      case "Team":
        return "bg-[#EEF0F6] text-[#4B5694]";
      case "Milestone":
        return "bg-[#F4F0E8] text-[#7A6338]";
      case "Report":
        return "bg-[#ECEFF0] text-[#49565B]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const clearAllActivities = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all activity records?"
    );

    if (confirmClear) {
      setActivities([]);
      setSelectedActivity(null);
    }
  };

  const deleteActivity = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (confirmDelete) {
      setActivities((prev) =>
        prev.filter((activity) => activity.id !== id)
      );

      if (selectedActivity?.id === id) {
        setSelectedActivity(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">
      {/* Header */}
      <div className="w-full bg-[#1D546D] px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-[#D9E1E2] mb-1">
              Workspace
            </p>

            <h1 className="text-3xl font-bold text-white">
              Activity
            </h1>

            <p className="mt-1 text-sm text-[#D9E1E2]">
              Track recent activity across your workspace.
            </p>
          </div>

          <button
            onClick={clearAllActivities}
            disabled={activities.length === 0}
            className="px-5 py-2.5 rounded-lg bg-[#061E29] text-white text-sm font-medium hover:bg-[#0B2C3A] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#777177]">
              Total Activities
            </p>

            <h2 className="text-3xl font-bold text-[#302D30] mt-2">
              {activities.length}
            </h2>

            <p className="text-xs text-[#5F9598] mt-2">
              Workspace activity records
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#777177]">
              Project Activities
            </p>

            <h2 className="text-3xl font-bold text-[#302D30] mt-2">
              {projectCount}
            </h2>

            <p className="text-xs text-[#5F9598] mt-2">
              Project updates
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#777177]">
              Task Activities
            </p>

            <h2 className="text-3xl font-bold text-[#302D30] mt-2">
              {taskCount}
            </h2>

            <p className="text-xs text-[#5F9598] mt-2">
              Task related actions
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#777177]">
              Other Activities
            </p>

            <h2 className="text-3xl font-bold text-[#302D30] mt-2">
              {teamCount + milestoneCount}
            </h2>

            <p className="text-xs text-[#5F9598] mt-2">
              Team & milestone updates
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Search Activity
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user, action or project..."
                className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598] bg-[#F8F9F9]"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Activity Type
              </label>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598] bg-[#F8F9F9]"
              >
                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* User Filter */}
            <div>
              <label className="block text-sm font-medium text-[#302D30] mb-2">
                User
              </label>

              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598] bg-[#F8F9F9]"
              >
                {users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#D9E1E2]">
            <h2 className="text-lg font-semibold text-[#302D30]">
              Recent Activity
            </h2>

            <p className="text-sm text-[#777177] mt-1">
              {filteredActivities.length} activity record
              {filteredActivities.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="py-16 text-center px-6">
              <div className="text-5xl mb-4">📋</div>

              <h3 className="text-lg font-semibold text-[#302D30]">
                No activity found
              </h3>

              <p className="text-sm text-[#777177] mt-2">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5EAEB]">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="px-6 py-5 hover:bg-[#F8F9F9] transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-semibold shrink-0 ${getTypeStyle(
                          activity.type
                        )}`}
                      >
                        {getTypeIcon(activity.type)}
                      </div>

                      {/* Activity Info */}
                      <div>
                        <p className="text-sm text-[#302D30] leading-6">
                          <span className="font-semibold">
                            {activity.user}
                          </span>{" "}
                          {activity.action}{" "}
                          <span className="font-semibold text-[#1D546D]">
                            {activity.target}
                          </span>
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeStyle(
                              activity.type
                            )}`}
                          >
                            {activity.type}
                          </span>

                          <span className="text-xs text-[#777177]">
                            {activity.role}
                          </span>

                          <span className="text-xs text-[#A0A0A0]">
                            •
                          </span>

                          <span className="text-xs text-[#777177]">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 lg:ml-4">
                      <button
                        onClick={() =>
                          setSelectedActivity(activity)
                        }
                        className="px-3.5 py-2 rounded-lg bg-[#E7F0F3] text-[#1D546D] text-sm font-medium hover:bg-[#D8E8EC] transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          deleteActivity(activity.id)
                        }
                        className="px-3.5 py-2 rounded-lg bg-[#FBEAEA] text-[#B23A3A] text-sm font-medium hover:bg-[#F5D7D7] transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* View Activity Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#B8C9CB] uppercase tracking-wide">
                  Activity Details
                </p>

                <h2 className="text-xl font-semibold text-white mt-1">
                  {selectedActivity.type} Activity
                </h2>
              </div>

              <button
                onClick={() => setSelectedActivity(null)}
                className="text-white/80 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <p className="text-xs text-[#777177]">
                  User
                </p>

                <p className="text-sm font-semibold text-[#302D30] mt-1">
                  {selectedActivity.user}
                </p>

                <p className="text-xs text-[#777177] mt-1">
                  {selectedActivity.role}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#777177]">
                  Action
                </p>

                <p className="text-sm text-[#302D30] mt-1">
                  {selectedActivity.action}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#777177]">
                  Target
                </p>

                <p className="text-sm font-semibold text-[#1D546D] mt-1">
                  {selectedActivity.target}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#777177]">
                  Date & Time
                </p>

                <p className="text-sm text-[#302D30] mt-1">
                  {selectedActivity.time}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#777177]">
                  Details
                </p>

                <div className="mt-2 bg-[#F3F4F4] border border-[#D9E1E2] rounded-xl p-4">
                  <p className="text-sm text-[#302D30] leading-6">
                    {selectedActivity.details}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedActivity(null)}
                className="w-full py-2.5 rounded-lg bg-[#1D546D] text-white font-medium hover:bg-[#285F77] transition"
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

export default Activity;