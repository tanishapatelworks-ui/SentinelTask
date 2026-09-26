
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialActivities = [
  {
    id: 1,
    type: "Task",
    title: "Task Completed",
    description:
      'Rahul Mehta completed the task "Create Homepage UI" in Website Redesign.',
    user: "Rahul Mehta",
    project: "Website Redesign",
    time: "10 minutes ago",
    date: "2026-09-07",
  },
  {
    id: 2,
    type: "Project",
    title: "Project Updated",
    description:
      'The project "Mobile App Development" progress was updated to 62%.',
    user: "Priya Shah",
    project: "Mobile App Development",
    time: "1 hour ago",
    date: "2026-09-07",
  },
  {
    id: 3,
    type: "Team",
    title: "Team Member Added",
    description:
      "Amit Patel was added to the ERP Development project team.",
    user: "Amit Patel",
    project: "ERP Development",
    time: "3 hours ago",
    date: "2026-09-07",
  },
  {
    id: 4,
    type: "Task",
    title: "New Task Created",
    description:
      'A new task "API Integration" was created for the ERP Development project.',
    user: "Neha Joshi",
    project: "ERP Development",
    time: "Yesterday",
    date: "2026-09-06",
  },
  {
    id: 5,
    type: "Project",
    title: "Project Created",
    description:
      'The new project "Security Audit" was created successfully.',
    user: "Karan Shah",
    project: "Security Audit",
    time: "Yesterday",
    date: "2026-09-06",
  },
  {
    id: 6,
    type: "Task",
    title: "Task Status Changed",
    description:
      'The task "Database Configuration" was moved to In Progress.',
    user: "Rahul Mehta",
    project: "Website Redesign",
    time: "2 days ago",
    date: "2026-09-05",
  },
  {
    id: 7,
    type: "Team",
    title: "Team Member Removed",
    description:
      "A team member was removed from the Security Audit project.",
    user: "Manager",
    project: "Security Audit",
    time: "3 days ago",
    date: "2026-09-04",
  },
  {
    id: 8,
    type: "Project",
    title: "Project Completed",
    description:
      'The project "E-Commerce Platform" reached 90% completion.',
    user: "Karan Shah",
    project: "E-Commerce Platform",
    time: "4 days ago",
    date: "2026-09-03",
  },
];

function ManagerActivity() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState(null);

  const totalActivities = activities.length;

  const taskActivities = activities.filter(
    (activity) => activity.type === "Task"
  ).length;

  const projectActivities = activities.filter(
    (activity) => activity.type === "Project"
  ).length;

  const teamActivities = activities.filter(
    (activity) => activity.type === "Team"
  ).length;

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        activity.title.toLowerCase().includes(searchText) ||
        activity.description.toLowerCase().includes(searchText) ||
        activity.user.toLowerCase().includes(searchText) ||
        activity.project.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All" || activity.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [activities, search, typeFilter]);

  const deleteActivity = (id) => {
    setActivities((prev) =>
      prev.filter((activity) => activity.id !== id)
    );

    setSelectedActivity(null);
  };

  const getTypeStyle = (type) => {
    if (type === "Task") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (type === "Project") {
      return "bg-[#E8F3EE] text-[#276749]";
    }

    if (type === "Team") {
      return "bg-[#F2EDF7] text-[#6B4F8A]";
    }

    return "bg-[#F3F4F4] text-[#302D30]";
  };

  const getTypeIcon = (type) => {
    if (type === "Task") return "T";
    if (type === "Project") return "P";
    if (type === "Team") return "M";

    return "A";
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
            Manager Activity
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

      {/* ================= MAIN ================= */}

      <main className="p-6 lg:p-8">

        {/* PAGE TITLE */}

        <div className="mb-7">
          <h2 className="text-2xl font-bold text-[#061E29]">
            Activity
          </h2>

          <p className="text-sm text-[#5F9598] mt-1">
            Track recent project, task and team activities.
          </p>
        </div>

        {/* ================= SUMMARY ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Total Activities
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalActivities}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Recent system activities
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Task Activities
            </p>

            <h3 className="text-3xl font-bold text-[#1D546D] mt-2">
              {taskActivities}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Task related updates
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Project Activities
            </p>

            <h3 className="text-3xl font-bold text-[#276749] mt-2">
              {projectActivities}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Project related updates
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Team Activities
            </p>

            <h3 className="text-3xl font-bold text-[#6B4F8A] mt-2">
              {teamActivities}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Team related updates
            </p>
          </div>

        </div>

        {/* ================= FILTERS ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none focus:border-[#5F9598]"
            />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none"
            >
              <option value="All">
                All Activities
              </option>

              <option value="Task">
                Task
              </option>

              <option value="Project">
                Project
              </option>

              <option value="Team">
                Team
              </option>
            </select>

          </div>

        </div>

        {/* ================= ACTIVITY LIST ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

          <div className="px-5 py-5 border-b border-[#D9E1E2]">

            <h3 className="text-lg font-bold text-[#061E29]">
              Recent Activity
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              {filteredActivities.length} activit
              {filteredActivities.length === 1 ? "y" : "ies"} found
            </p>

          </div>

          {filteredActivities.length === 0 ? (

            <div className="text-center py-16 px-5">

              <div className="w-14 h-14 rounded-2xl bg-[#F3F4F4] mx-auto flex items-center justify-center text-[#5F9598] text-xl font-bold">
                A
              </div>

              <p className="text-sm font-semibold text-[#061E29] mt-4">
                No activities found
              </p>

              <p className="text-xs text-[#5F9598] mt-1">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-[#D9E1E2]">

              {filteredActivities.map((activity) => (

                <div
                  key={activity.id}
                  className="p-5 hover:bg-[#FAFAFA] transition"
                >

                  <div className="flex items-start gap-4">

                    {/* ICON */}

                    <div
                      className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold ${getTypeStyle(
                        activity.type
                      )}`}
                    >
                      {getTypeIcon(activity.type)}
                    </div>

                    {/* CONTENT */}

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold ${getTypeStyle(
                            activity.type
                          )}`}
                        >
                          {activity.type}
                        </span>

                        <span className="text-[10px] text-[#8A999B]">
                          {activity.time}
                        </span>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedActivity(activity)
                        }
                        className="text-left text-sm font-bold text-[#061E29] mt-2 hover:text-[#1D546D]"
                      >
                        {activity.title}
                      </button>

                      <p className="text-xs text-[#5F9598] mt-1 line-clamp-2">
                        {activity.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-3">

                        <p className="text-[10px] text-[#8A999B]">
                          User:{" "}
                          <span className="font-semibold text-[#302D30]">
                            {activity.user}
                          </span>
                        </p>

                        <p className="text-[10px] text-[#8A999B]">
                          Project:{" "}
                          <span className="font-semibold text-[#302D30]">
                            {activity.project}
                          </span>
                        </p>

                      </div>

                    </div>

                    {/* ================= IMPROVED ACTIONS ================= */}

                    <div className="flex items-center gap-2 flex-shrink-0">

                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedActivity(activity)
                        }
                        className="inline-flex items-center justify-center gap-1.5 min-w-[76px] h-9 px-3 rounded-lg bg-[#E7F0F1] text-[#1D546D] border border-[#C9DDDF] text-xs font-semibold hover:bg-[#1D546D] hover:text-white hover:border-[#1D546D] transition-all duration-200"
                      >
                        <span className="text-sm">
                          👁
                        </span>

                        <span>
                          View
                        </span>
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          deleteActivity(activity.id)
                        }
                        className="inline-flex items-center justify-center gap-1.5 min-w-[78px] h-9 px-3 rounded-lg bg-[#FFF5F5] text-[#A33A3A] border border-[#F0CCCC] text-xs font-semibold hover:bg-[#A33A3A] hover:text-white hover:border-[#A33A3A] transition-all duration-200"
                      >
                        <span className="text-sm">
                          🗑
                        </span>

                        <span>
                          Delete
                        </span>
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

      {/* ================= VIEW MODAL ================= */}

      {selectedActivity && (

        <div className="fixed inset-0 bg-[#061E29]/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">

            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <div>

                <p className="text-xs text-[#5F9598]">
                  Activity Details
                </p>

                <h3 className="text-lg font-bold text-[#061E29] mt-1">
                  {selectedActivity.title}
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5F9598] hover:bg-[#F3F4F4] hover:text-[#061E29] text-xl transition"
              >
                ×
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="p-6">

              <span
                className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${getTypeStyle(
                  selectedActivity.type
                )}`}
              >
                {selectedActivity.type}
              </span>

              <p className="text-sm leading-6 text-[#302D30] mt-5">
                {selectedActivity.description}
              </p>

              <div className="mt-6 space-y-4">

                <div>
                  <p className="text-xs text-[#5F9598]">
                    User
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedActivity.user}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Project
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedActivity.project}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Date
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedActivity.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Time
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedActivity.time}
                  </p>
                </div>

              </div>

              {/* MODAL ACTIONS */}

              <div className="flex justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={() =>
                    deleteActivity(selectedActivity.id)
                  }
                  className="inline-flex items-center justify-center gap-2 min-w-[100px] h-10 px-4 rounded-xl bg-[#FFF5F5] border border-[#F0CCCC] text-[#A33A3A] text-sm font-semibold hover:bg-[#A33A3A] hover:text-white hover:border-[#A33A3A] transition-all duration-200"
                >
                  <span>
                    🗑
                  </span>

                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  className="inline-flex items-center justify-center min-w-[90px] h-10 px-4 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition-all duration-200"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManagerActivity;

