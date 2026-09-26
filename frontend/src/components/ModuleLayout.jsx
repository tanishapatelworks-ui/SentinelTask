import { useNavigate } from "react-router-dom";

const ModuleLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.role === "admin") {
        navigate("/admin-dashboard");
        return;
      }

      if (user?.role === "manager") {
        navigate("/manager-dashboard");
        return;
      }

      if (user?.role === "employee") {
        navigate("/employee-dashboard");
        return;
      }

      // Agar user/role nahi mila
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* ================= TOP BAR ================= */}

      <div className="w-full bg-[#061E29] px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* BRAND */}

        <div>
          <h2 className="text-lg font-bold text-white">
            SentinelTask
          </h2>
        </div>

        {/* DASHBOARD BUTTON */}

        <button
          onClick={handleDashboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1D546D] text-white text-sm font-medium hover:bg-[#285F77] transition"
        >
          <span className="text-base">←</span>
          Dashboard
        </button>

      </div>

      {/* ================= MODULE PAGE ================= */}

      <main className="w-full">
        {children}
      </main>

    </div>
  );
};

export default ModuleLayout;