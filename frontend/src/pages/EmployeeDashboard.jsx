import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

// ===============================
// MINIMAL ICONS
// ===============================

const FolderIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-10Z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const BellIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
    <path d="M10 21h4" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2.4v-.2a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 0 0 8.46 15a1.7 1.7 0 0 0-1.56-1.03H6v-2.4h.9A1.7 1.7 0 0 0 8.46 10a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.7-1.7.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V4h2.4v1.2a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.7 1.7-.06.06A1.7 1.7 0 0 0 19.4 10c.23.62.82 1.03 1.48 1.03H22v2.4h-1.12A1.7 1.7 0 0 0 19.4 15Z" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m14 4 6 6" />
    <path d="m17 7-8.5 8.5" />
    <path d="m5 19 4-4" />
    <path d="m4 20 4-1 9-9-3-3-9 9-1 4Z" />
  </svg>
);

const ActivityIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12h4l2-7 4 14 2-7h6" />
  </svg>
);

// ===============================
// COMPONENT
// ===============================

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ===============================
  // PROJECTS
  // ===============================

  const projects = [
    {
      name: "Website Redesign",
      progress: 72,
      status: "In Progress",
    },
    {
      name: "Mobile App Development",
      progress: 48,
      status: "In Progress",
    },
    {
      name: "ERP Development",
      progress: 25,
      status: "Planning",
    },
    {
      name: "E-Commerce Platform",
      progress: 64,
      status: "In Progress",
    },
  ];

  // ===============================
  // ACTIVITIES
  // ===============================

  const activities = [
    {
      name: user?.name || "You",
      action: "completed",
      item: "Fix Responsive Issues",
      time: "2 hours ago",
      icon: <CheckIcon />,
    },
    {
      name: "System",
      action: "assigned you",
      item: "Create Homepage UI",
      time: "5 hours ago",
      icon: <PinIcon />,
    },
    {
      name: "Project",
      action: "updated",
      item: "Website Redesign",
      time: "Yesterday",
      icon: <FolderIcon />,
    },
    {
      name: "Team",
      action: "added you to",
      item: "ERP Development",
      time: "2 days ago",
      icon: <UsersIcon />,
    },
  ];

  // ===============================
  // STATS
  // ===============================

  const stats = [
    {
      title: "My Projects",
      value: "6",
      icon: <FolderIcon />,
      description: "Assigned projects",
    },
    {
      title: "Total Tasks",
      value: "24",
      icon: <CheckIcon />,
      description: "Assigned to me",
    },
    {
      title: "In Progress",
      value: "8",
      icon: <ClockIcon />,
      description: "Tasks in progress",
    },
    {
      title: "Completed",
      value: "16",
      icon: <CheckIcon />,
      description: "Tasks completed",
    },
  ];

  // ===============================
  // QUICK ACTIONS
  // ===============================

  const quickActions = [
    {
      title: "My Projects",
      description: "View your assigned projects",
      icon: <FolderIcon />,
      path: "/employee-projects",
    },
    {
      title: "My Tasks",
      description: "Manage your tasks",
      icon: <CheckIcon />,
      path: "/employee-tasks",
    },
    {
      title: "Notifications",
      description: "Check latest notifications",
      icon: <BellIcon />,
      path: "/employee-notifications",
    },
    {
      title: "Settings",
      description: "Manage your account settings",
      icon: <SettingsIcon />,
      path: "/employee-settings",
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
                Employee Dashboard
              </p>

              <h1 className="text-3xl font-semibold text-[#061E29] mt-1">
                Welcome, {user?.name || "Employee"}
              </h1>

              <p className="text-sm text-[#5F9598] mt-2">
                Track your projects, tasks and daily activities from here.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/employee-projects")}
              className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
            >
              View Projects
            </button>

          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <p className="text-sm text-[#5F9598]">
                  {stat.title}
                </p>

                <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                  {stat.icon}
                </span>

              </div>

              <h2 className="text-3xl font-semibold text-[#061E29] mt-4">
                {stat.value}
              </h2>

              <p className="text-xs text-[#5F9598] mt-1">
                {stat.description}
              </p>

            </div>
          ))}

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
                  Overview of your assigned projects
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/employee-projects")}
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
              Common employee actions
            </p>

            <div className="space-y-3">

              {quickActions.map((action) => (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => navigate(action.path)}
                  className="w-full text-left px-4 py-4 rounded-xl bg-[#F3F4F4] hover:bg-[#E8F1F3] transition"
                >

                  <div className="flex items-start gap-3">

                    <span className="w-9 h-9 rounded-lg bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center flex-shrink-0">
                      {action.icon}
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-[#061E29]">
                        {action.title}
                      </p>

                      <p className="text-xs text-[#5F9598] mt-1">
                        {action.description}
                      </p>
                    </div>

                  </div>

                </button>
              ))}

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
                Latest activity from your workspace
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/employee-activity")}
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

                <div className="w-9 h-9 rounded-full bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center flex-shrink-0">
                  {activity.icon}
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

export default EmployeeDashboard;