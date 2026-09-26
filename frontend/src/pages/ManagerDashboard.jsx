import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const projects = [
    {
      name: "Website Redesign",
      progress: 75,
      status: "In Progress",
    },
    {
      name: "Mobile Application",
      progress: 55,
      status: "In Progress",
    },
    {
      name: "Marketing Campaign",
      progress: 90,
      status: "Almost Done",
    },
    {
      name: "ERP Development",
      progress: 35,
      status: "In Progress",
    },
  ];

  const activities = [
    {
      name: "Amit Patel",
      action: "completed a task",
      item: "Marketing Banner",
      time: "10 minutes ago",
    },
    {
      name: "Neha Patel",
      action: "updated task status",
      item: "Create Login API",
      time: "35 minutes ago",
    },
    {
      name: "Karan Mehta",
      action: "started a task",
      item: "Mobile UI Screens",
      time: "1 hour ago",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#1D546D]">
                Manager Dashboard
              </p>

              <h1 className="text-3xl font-semibold text-[#061E29] mt-1">
                Welcome, {user?.name || "Manager"} 👋
              </h1>

              <p className="text-sm text-[#5F9598] mt-2">
                Manage your projects, tasks and team activities from here.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/manager-projects")}
              className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
            >
              + New Project
            </button>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {/* My Projects */}
          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#5F9598]">
                My Projects
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                ▤
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-[#061E29] mt-4">
              4
            </h2>

            <p className="text-xs text-[#5F9598] mt-1">
              Active projects
            </p>
          </div>

          {/* Active Tasks */}
          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#5F9598]">
                Active Tasks
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                ✓
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-[#061E29] mt-4">
              28
            </h2>

            <p className="text-xs text-[#5F9598] mt-1">
              Across your projects
            </p>
          </div>

          {/* Team Members */}
          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#5F9598]">
                Team Members
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                ♙
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-[#061E29] mt-4">
              8
            </h2>

            <p className="text-xs text-[#5F9598] mt-1">
              Your project team
            </p>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#5F9598]">
                Pending Tasks
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                ◷
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-[#061E29] mt-4">
              9
            </h2>

            <p className="text-xs text-[#5F9598] mt-1">
              Need your attention
            </p>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ================= PROJECT PROGRESS ================= */}
          <div className="xl:col-span-2 bg-white border border-[#D9E1E2] rounded-2xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#061E29]">
                  Project Progress
                </h2>

                <p className="text-xs text-[#5F9598] mt-1">
                  Overview of your current projects
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/manager-projects")}
                className="text-sm font-medium text-[#1D546D] hover:text-[#061E29] transition"
              >
                View All
              </button>
            </div>

            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.name}>

                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-[#061E29]">
                        {project.name}
                      </p>

                      <p className="text-xs text-[#5F9598] mt-1">
                        {project.status}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-[#1D546D]">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#E5EAEB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1D546D] rounded-full transition-all"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-[#061E29]">
              Quick Actions
            </h2>

            <p className="text-xs text-[#5F9598] mt-1 mb-6">
              Common manager actions
            </p>

            <div className="space-y-3">

              <button
                type="button"
                onClick={() => navigate("/manager-projects")}
                className="w-full text-left px-4 py-4 rounded-xl bg-[#F3F4F4] hover:bg-[#E8F1F3] transition"
              >
                <p className="text-sm font-semibold text-[#061E29]">
                  + Create Project
                </p>

                <p className="text-xs text-[#5F9598] mt-1">
                  Start a new project
                </p>
              </button>

              <button
                type="button"
                onClick={() => navigate("/manager-tasks")}
                className="w-full text-left px-4 py-4 rounded-xl bg-[#F3F4F4] hover:bg-[#E8F1F3] transition"
              >
                <p className="text-sm font-semibold text-[#061E29]">
                  + Create Task
                </p>

                <p className="text-xs text-[#5F9598] mt-1">
                  Assign work to your team
                </p>
              </button>

              <button
                type="button"
                onClick={() => navigate("/manager-team")}
                className="w-full text-left px-4 py-4 rounded-xl bg-[#F3F4F4] hover:bg-[#E8F1F3] transition"
              >
                <p className="text-sm font-semibold text-[#061E29]">
                  View Team
                </p>

                <p className="text-xs text-[#5F9598] mt-1">
                  Check team members
                </p>
              </button>

              <button
                type="button"
                onClick={() => navigate("/manager-reports")}
                className="w-full text-left px-4 py-4 rounded-xl bg-[#F3F4F4] hover:bg-[#E8F1F3] transition"
              >
                <p className="text-sm font-semibold text-[#061E29]">
                  View Reports
                </p>

                <p className="text-xs text-[#5F9598] mt-1">
                  Track project performance
                </p>
              </button>

            </div>
          </div>
        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-6 shadow-sm mt-6">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-[#061E29]">
                Recent Activity
              </h2>

              <p className="text-xs text-[#5F9598] mt-1">
                Latest activity from your team
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/manager-activity")}
              className="text-sm font-medium text-[#1D546D] hover:text-[#061E29] transition"
            >
              View All
            </button>
          </div>

          <div className="space-y-1">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-3 border-b border-[#E5EAEB] last:border-0"
              >

                <div className="w-9 h-9 rounded-full bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {activity.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#302D30]">
                    <span className="font-semibold text-[#061E29]">
                      {activity.name}
                    </span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium text-[#1D546D]">
                      {activity.item}
                    </span>
                  </p>

                  <p className="text-xs text-[#5F9598] mt-1">
                    {activity.time}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;