
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= PAGE NAME ================= */

  const getPageName = () => {
    const path = location.pathname;

    if (
      path.includes("admin-dashboard") ||
      path.includes("manager-dashboard") ||
      path.includes("employee-dashboard")
    ) {
      return "Dashboard";
    }

    if (path.includes("projects")) return "Projects";
    if (path.includes("tasks")) return "Tasks";
    if (path.includes("team")) return "Team";
    if (path.includes("calendar")) return "Calendar";
    if (path.includes("milestones")) return "Milestones";
    if (path.includes("notifications")) return "Notifications";
    if (path.includes("reports")) return "Reports";
    if (path.includes("activity")) return "Activity";
    if (path.includes("files")) return "Files";
    if (path.includes("settings")) return "Settings";

    return "SentinelTask";
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="h-20 w-full bg-white border-b border-[#D9E1E2] flex items-center justify-between px-6">

      {/* ================= LEFT ================= */}

      <div>
        <h1 className="text-xl font-semibold text-[#061E29]">
          {getPageName()}
        </h1>

        <p className="text-sm text-[#5F9598] mt-1">
          Manage your workspace
        </p>
      </div>

      {/* ================= RIGHT ================= */}

      <div className="flex items-center gap-4">

        {/* SEARCH */}

        <div className="hidden md:flex items-center bg-[#F3F4F4] border border-[#D9E1E2] rounded-xl px-4 h-10 w-64">

          <span className="text-[#5F9598] mr-2">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full text-[#061E29] placeholder:text-[#5F9598]"
          />

        </div>

        {/* NOTIFICATION */}

        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#5F9598] hover:bg-[#F3F4F4] hover:text-[#1D546D] transition"
        >
          ♧

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1D546D]" />
        </button>

        {/* PROFILE */}

        <div className="relative">

          <button
            type="button"
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 px-2 py-1 rounded-xl hover:bg-[#F3F4F4] transition"
          >

            {/* AVATAR */}

            <div className="w-10 h-10 rounded-full bg-[#5F9598] text-white flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* USER INFO */}

            <div className="hidden sm:block text-left">

              <p className="text-sm font-semibold text-[#061E29]">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-[#5F9598] capitalize">
                {user?.role || "employee"}
              </p>

            </div>

            <span className="text-xs text-[#5F9598]">
              ▼
            </span>

          </button>

          {/* ================= DROPDOWN ================= */}

          {showProfile && (

            <div className="absolute right-0 mt-3 w-56 bg-white border border-[#D9E1E2] rounded-xl shadow-lg overflow-hidden z-50">

              <div className="px-4 py-4 border-b border-[#D9E1E2]">

                <p className="font-semibold text-[#061E29]">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-[#5F9598] mt-1">
                  {user?.email || ""}
                </p>

              </div>

              {/* SETTINGS */}

              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/settings");
                }}
                className="w-full text-left px-4 py-3 text-sm text-[#061E29] hover:bg-[#F3F4F4] hover:text-[#1D546D]"
              >
                ⚙ Settings
              </button>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-[#1D546D] hover:bg-[#F3F4F4]"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
};

export default Header;
