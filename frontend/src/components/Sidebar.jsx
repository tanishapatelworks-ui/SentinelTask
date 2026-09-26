import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || "admin";

  // ===============================
  // ADMIN MENU
  // ===============================

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: "⌂",
    },
    {
      name: "Projects",
      path: "/projects",
      icon: "▣",
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: "✓",
    },
    {
      name: "Team",
      path: "/team",
      icon: "♧",
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: "□",
    },
    {
      name: "Milestones",
      path: "/milestones",
      icon: "◇",
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: "○",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "▥",
    },
    {
      name: "Activity",
      path: "/activity",
      icon: "◌",
    },
    {
      name: "Files",
      path: "/files",
      icon: "▱",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙",
    },
  ];

  // ===============================
  // MANAGER MENU
  // ===============================

  const managerMenu = [
    {
      name: "Dashboard",
      path: "/manager-dashboard",
      icon: "⌂",
    },
    {
      name: "Projects",
      path: "/manager-projects",
      icon: "▣",
    },
    {
      name: "Tasks",
      path: "/manager-tasks",
      icon: "✓",
    },
    {
      name: "Team",
      path: "/manager-team",
      icon: "♧",
    },
    {
      name: "Calendar",
      path: "/manager-calendar",
      icon: "□",
    },
    {
      name: "Milestones",
      path: "/manager-milestones",
      icon: "◇",
    },
    {
      name: "Notifications",
      path: "/manager-notifications",
      icon: "○",
    },
    {
      name: "Reports",
      path: "/manager-reports",
      icon: "▥",
    },
    {
      name: "Activity",
      path: "/manager-activity",
      icon: "◌",
    },
    {
      name: "Files",
      path: "/manager-files",
      icon: "▱",
    },
    {
      name: "Settings",
      path: "/manager-settings",
      icon: "⚙",
    },
  ];

  // ===============================
  // EMPLOYEE MENU
  // ===============================

  const employeeMenu = [
    {
      name: "Dashboard",
      path: "/employee-dashboard",
      icon: "⌂",
    },
    {
      name: "My Projects",
      path: "/employee-projects",
      icon: "▣",
    },
    {
      name: "My Tasks",
      path: "/employee-tasks",
      icon: "✓",
    },
    {
      name: "Calendar",
      path: "/employee-calendar",
      icon: "□",
    },
    {
      name: "Milestones",
      path: "/employee-milestones",
      icon: "◇",
    },
    {
      name: "Notifications",
      path: "/employee-notifications",
      icon: "○",
    },
    {
      name: "Activity",
      path: "/employee-activity",
      icon: "◌",
    },
    {
      name: "Files",
      path: "/employee-files",
      icon: "▱",
    },
    {
      name: "Settings",
      path: "/employee-settings",
      icon: "⚙",
    },
  ];

  // ===============================
  // SELECT MENU BY ROLE
  // ===============================

  let menu = adminMenu;

  if (role === "manager") {
    menu = managerMenu;
  }

  if (role === "employee") {
    menu = employeeMenu;
  }

  return (
    <div className="min-h-full bg-[#061E29]">

      {/* ================= BRAND ================= */}

      <div className="px-6 py-6 border-b border-white/10">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#1D546D] flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              S
            </span>
          </div>

          <div>
            <h1 className="text-white font-semibold">
              SentinelTask
            </h1>

            <p className="text-[#5F9598] text-xs mt-1 capitalize">
              {role} workspace
            </p>
          </div>

        </div>

      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="px-4 py-5 space-y-1">

        {menu.map((item) => (

          <NavLink
            key={item.path + item.name}
            to={item.path}
            end={item.name.includes("Dashboard")}
            className={({ isActive }) => `
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-sm
              transition-all

              ${
                isActive
                  ? "bg-[#1D546D] text-white font-semibold"
                  : "text-[#B8C9CB] hover:bg-[#123B4D] hover:text-white"
              }
            `}
          >

            <span className="w-5 text-center text-base">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>

      {/* ================= FOOTER ================= */}

      <div className="px-4 pb-6">

        <div className="rounded-xl bg-[#0D2D3A] px-4 py-3">

          <p className="text-xs text-[#5F9598]">
            Workspace
          </p>

          <p className="text-sm text-white font-medium mt-1">
            SentinelTask
          </p>

        </div>

      </div>

    </div>
  );
};

export default Sidebar;

