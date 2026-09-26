
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeActivity = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    {
      id: 1,
      title: "Task Completed",
      description: "Completed the task 'Fix Responsive Issues'.",
      type: "Task",
      project: "Website Redesign",
      date: "07 Sep 2026",
      time: "10:30 AM",
    },
    {
      id: 2,
      title: "Task Updated",
      description: "Updated the progress of 'Create Homepage UI' to 90%.",
      type: "Task",
      project: "Website Redesign",
      date: "07 Sep 2026",
      time: "09:15 AM",
    },
    {
      id: 3,
      title: "Project Activity",
      description: "Viewed and reviewed the Mobile App Development project.",
      type: "Project",
      project: "Mobile App Development",
      date: "06 Sep 2026",
      time: "04:20 PM",
    },
    {
      id: 4,
      title: "Milestone Updated",
      description: "Updated progress of the Mobile Login Module milestone.",
      type: "Milestone",
      project: "Mobile App Development",
      date: "06 Sep 2026",
      time: "01:45 PM",
    },
    {
      id: 5,
      title: "Team Activity",
      description: "Joined the ERP Development project team discussion.",
      type: "Team",
      project: "ERP Development",
      date: "05 Sep 2026",
      time: "03:10 PM",
    },
    {
      id: 6,
      title: "File Activity",
      description: "Viewed the API Documentation file.",
      type: "File",
      project: "ERP Development",
      date: "05 Sep 2026",
      time: "11:25 AM",
    },
    {
      id: 7,
      title: "Task Completed",
      description: "Completed the task 'Test User Registration'.",
      type: "Task",
      project: "Security Audit",
      date: "04 Sep 2026",
      time: "05:00 PM",
    },
    {
      id: 8,
      title: "Project Activity",
      description: "Reviewed the latest E-Commerce Platform updates.",
      type: "Project",
      project: "E-Commerce Platform",
      date: "03 Sep 2026",
      time: "02:30 PM",
    },
  ];

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        activity.project.toLowerCase().includes(search.toLowerCase()) ||
        activity.type.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || activity.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const taskActivities = activities.filter(
    (activity) => activity.type === "Task"
  ).length;

  const projectActivities = activities.filter(
    (activity) => activity.type === "Project"
  ).length;

  const milestoneActivities = activities.filter(
    (activity) => activity.type === "Milestone"
  ).length;

  const getTypeStyle = (type) => {
    if (type === "Task") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (type === "Project") {
      return "bg-[#EAF5F5] text-[#397477]";
    }

    if (type === "Milestone") {
      return "bg-[#FFF4E5] text-[#A86400]";
    }

    if (type === "Team") {
      return "bg-[#F1ECF8] text-[#6B4C8A]";
    }

    if (type === "File") {
      return "bg-[#E8F5E9] text-[#2E7D32]";
    }

    return "bg-[#F3F4F4] text-[#5F6668]";
  };

  const getIcon = (type) => {
    if (type === "Task") return "✓";
    if (type === "Project") return "📁";
    if (type === "Milestone") return "🎯";
    if (type === "Team") return "👥";
    if (type === "File") return "📄";

    return "●";
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
            Activity
          </h1>
        </div>

        <button
          onClick={() => navigate("/employee-dashboard")}
          className="bg-[#1D546D] hover:bg-[#286B86] px-5 py-2.5 rounded-lg text-sm font-medium transition"
        >
          Dashboard
        </button>

      </header>

      {/* ================= MAIN ================= */}
      <main className="p-6 md:p-8 max-w-7xl mx-auto">

        {/* INTRO */}
        <div className="mb-7">
          <h2 className="text-xl font-semibold text-[#061E29]">
            My Activity
          </h2>

          <p className="text-sm text-[#7B8588] mt-1">
            Track your recent tasks, projects, milestones, team and file activities.
          </p>
        </div>

        {/* ================= SUMMARY ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          {/* Total */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Total Activities
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-1">
                  {activities.length}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center text-xl">
                ●
              </div>

            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Task Activities
                </p>

                <h3 className="text-3xl font-bold text-[#1D546D] mt-1">
                  {taskActivities}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center text-xl">
                ✓
              </div>

            </div>
          </div>

          {/* Projects */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Project Activities
                </p>

                <h3 className="text-3xl font-bold text-[#397477] mt-1">
                  {projectActivities}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#EAF5F5] text-[#397477] flex items-center justify-center text-xl">
                📁
              </div>

            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Milestone Activities
                </p>

                <h3 className="text-3xl font-bold text-[#A86400] mt-1">
                  {milestoneActivities}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#FFF4E5] text-[#A86400] flex items-center justify-center text-xl">
                🎯
              </div>

            </div>
          </div>

        </section>

        {/* ================= SEARCH / FILTER ================= */}
        <section className="bg-white border border-[#D9E1E2] rounded-xl p-5 mb-7">

          <div className="flex flex-col lg:flex-row gap-4 lg:items-end">

            <div className="flex-1">

              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Search Activity
              </label>

              <input
                type="text"
                placeholder="Search activity..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-[#D9E1E2] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1D546D] focus:ring-1 focus:ring-[#1D546D]"
              />

            </div>

            <div className="w-full lg:w-56">

              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Activity Type
              </label>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border border-[#D9E1E2] rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Activities</option>
                <option value="Task">Task</option>
                <option value="Project">Project</option>
                <option value="Milestone">Milestone</option>
                <option value="Team">Team</option>
                <option value="File">File</option>
              </select>

            </div>

          </div>

        </section>

        {/* ================= ACTIVITY LIST ================= */}
        <section>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#061E29]">
              Recent Activity
            </h2>

            <p className="text-sm text-[#7B8588] mt-1">
              {filteredActivities.length} activit
              {filteredActivities.length === 1 ? "y" : "ies"} found
            </p>
          </div>

          {filteredActivities.length === 0 ? (

            <div className="bg-white border border-[#D9E1E2] rounded-xl p-10 text-center">

              <div className="text-4xl mb-3">
                ●
              </div>

              <h3 className="font-semibold text-[#302D30]">
                No activity found
              </h3>

              <p className="text-sm text-[#7B8588] mt-1">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="bg-white border border-[#D9E1E2] rounded-xl overflow-hidden">

              {filteredActivities.map((activity, index) => (

                <div
                  key={activity.id}
                  className={`p-5 ${
                    index !== filteredActivities.length - 1
                      ? "border-b border-[#E6EAEB]"
                      : ""
                  } hover:bg-[#FBFDFD] transition`}
                >

                  <div className="flex flex-col md:flex-row md:items-center gap-4">

                    {/* ICON */}
                    <div
                      className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl ${getTypeStyle(
                        activity.type
                      )}`}
                    >
                      {getIcon(activity.type)}
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">

                        <h3 className="font-semibold text-[#302D30]">
                          {activity.title}
                        </h3>

                        <span
                          className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(
                            activity.type
                          )}`}
                        >
                          {activity.type}
                        </span>

                      </div>

                      <p className="text-sm text-[#7B8588] mt-1 leading-6">
                        {activity.description}
                      </p>

                      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-[#7B8588]">

                        <span>
                          📁 {activity.project}
                        </span>

                        <span>
                          📅 {activity.date}
                        </span>

                        <span>
                          🕐 {activity.time}
                        </span>

                      </div>

                    </div>

                    {/* ACTION */}
                    <div>

                      <button
                        onClick={() =>
                          setSelectedActivity(activity)
                        }
                        className="px-4 py-2 rounded-lg bg-[#E7F0F1] text-[#1D546D] border border-[#C8D9DB] text-sm font-medium hover:bg-[#1D546D] hover:text-white transition"
                      >
                        👁 View
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      {/* ================= VIEW MODAL ================= */}
      {selectedActivity && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-[#D9E1E2]">

              <div>
                <p className="text-xs text-[#7B8588]">
                  Activity Details
                </p>

                <h2 className="text-xl font-bold text-[#061E29] mt-1">
                  {selectedActivity.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedActivity(null)}
                className="text-2xl text-[#7B8588] hover:text-[#061E29] transition"
              >
                ×
              </button>

            </div>

            {/* BODY */}
            <div className="p-6">

              <div className="flex items-center gap-3 mb-5">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${getTypeStyle(
                    selectedActivity.type
                  )}`}
                >
                  {getIcon(selectedActivity.type)}
                </div>

                <div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(
                      selectedActivity.type
                    )}`}
                  >
                    {selectedActivity.type}
                  </span>

                  <p className="text-xs text-[#7B8588] mt-2">
                    {selectedActivity.date} •{" "}
                    {selectedActivity.time}
                  </p>

                </div>

              </div>

              <div className="mb-5">

                <p className="text-xs text-[#7B8588] mb-2">
                  Description
                </p>

                <p className="text-sm text-[#302D30] leading-6">
                  {selectedActivity.description}
                </p>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="bg-[#F7F9F9] rounded-lg p-4">

                  <p className="text-xs text-[#7B8588]">
                    Project
                  </p>

                  <p className="text-sm font-medium text-[#302D30] mt-1">
                    {selectedActivity.project}
                  </p>

                </div>

                <div className="bg-[#F7F9F9] rounded-lg p-4">

                  <p className="text-xs text-[#7B8588]">
                    Activity Type
                  </p>

                  <p className="text-sm font-medium text-[#302D30] mt-1">
                    {selectedActivity.type}
                  </p>

                </div>

              </div>

            </div>

            {/* FOOTER */}
            <div className="p-6 border-t border-[#D9E1E2] flex justify-end">

              <button
                onClick={() => setSelectedActivity(null)}
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

export default EmployeeActivity;
