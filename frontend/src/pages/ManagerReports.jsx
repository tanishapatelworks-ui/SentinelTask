
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialReports = [
  {
    id: 1,
    project: "Website Redesign",
    manager: "Rahul Mehta",
    totalTasks: 24,
    completedTasks: 18,
    pendingTasks: 4,
    inProgressTasks: 2,
    progress: 75,
    status: "On Track",
    deadline: "2026-09-20",
  },
  {
    id: 2,
    project: "Mobile App Development",
    manager: "Priya Shah",
    totalTasks: 32,
    completedTasks: 20,
    pendingTasks: 7,
    inProgressTasks: 5,
    progress: 62,
    status: "In Progress",
    deadline: "2026-10-05",
  },
  {
    id: 3,
    project: "ERP Development",
    manager: "Amit Patel",
    totalTasks: 40,
    completedTasks: 34,
    pendingTasks: 3,
    inProgressTasks: 3,
    progress: 85,
    status: "On Track",
    deadline: "2026-09-28",
  },
  {
    id: 4,
    project: "Security Audit",
    manager: "Neha Joshi",
    totalTasks: 18,
    completedTasks: 10,
    pendingTasks: 6,
    inProgressTasks: 2,
    progress: 55,
    status: "Delayed",
    deadline: "2026-09-15",
  },
  {
    id: 5,
    project: "E-Commerce Platform",
    manager: "Karan Shah",
    totalTasks: 28,
    completedTasks: 25,
    pendingTasks: 1,
    inProgressTasks: 2,
    progress: 90,
    status: "On Track",
    deadline: "2026-10-12",
  },
];

function ManagerReports() {
  const navigate = useNavigate();

  const [reports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const totalProjects = reports.length;

  const totalTasks = reports.reduce(
    (sum, report) => sum + report.totalTasks,
    0
  );

  const completedTasks = reports.reduce(
    (sum, report) => sum + report.completedTasks,
    0
  );

  const pendingTasks = reports.reduce(
    (sum, report) => sum + report.pendingTasks,
    0
  );

  const inProgressTasks = reports.reduce(
    (sum, report) => sum + report.inProgressTasks,
    0
  );

  const overallProgress = Math.round(
    reports.reduce((sum, report) => sum + report.progress, 0) /
      reports.length
  );

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        report.project.toLowerCase().includes(searchText) ||
        report.manager.toLowerCase().includes(searchText) ||
        report.status.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, search, statusFilter]);

  const getStatusStyle = (status) => {
    if (status === "On Track") {
      return "bg-[#E8F3EE] text-[#276749]";
    }

    if (status === "In Progress") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (status === "Delayed") {
      return "bg-[#F8ECEC] text-[#9B3D3D]";
    }

    return "bg-[#F3F4F4] text-[#302D30]";
  };

  const getProgressStyle = (progress) => {
    if (progress >= 80) {
      return "bg-[#276749]";
    }

    if (progress >= 60) {
      return "bg-[#1D546D]";
    }

    return "bg-[#9B3D3D]";
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
            Manager Reports
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
            Reports & Analytics
          </h2>

          <p className="text-sm text-[#5F9598] mt-1">
            Monitor project performance and task progress.
          </p>
        </div>


        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Total Projects
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalProjects}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Active project reports
            </p>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Total Tasks
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalTasks}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Across all projects
            </p>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Completed Tasks
            </p>

            <h3 className="text-3xl font-bold text-[#276749] mt-2">
              {completedTasks}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Successfully completed
            </p>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Overall Progress
            </p>

            <h3 className="text-3xl font-bold text-[#1D546D] mt-2">
              {overallProgress}%
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Average project progress
            </p>
          </div>

        </div>


        {/* ================= TASK OVERVIEW ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-6">

            <p className="text-sm font-semibold text-[#061E29]">
              Completed Tasks
            </p>

            <div className="flex items-end justify-between mt-4">
              <h3 className="text-3xl font-bold text-[#276749]">
                {completedTasks}
              </h3>

              <span className="text-xs text-[#5F9598]">
                Completed
              </span>
            </div>

            <div className="w-full h-2 bg-[#E8F3EE] rounded-full mt-4">
              <div
                className="h-2 bg-[#276749] rounded-full"
                style={{
                  width: `${
                    totalTasks
                      ? (completedTasks / totalTasks) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-6">

            <p className="text-sm font-semibold text-[#061E29]">
              In Progress
            </p>

            <div className="flex items-end justify-between mt-4">
              <h3 className="text-3xl font-bold text-[#1D546D]">
                {inProgressTasks}
              </h3>

              <span className="text-xs text-[#5F9598]">
                Working
              </span>
            </div>

            <div className="w-full h-2 bg-[#E7F0F1] rounded-full mt-4">
              <div
                className="h-2 bg-[#1D546D] rounded-full"
                style={{
                  width: `${
                    totalTasks
                      ? (inProgressTasks / totalTasks) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-6">

            <p className="text-sm font-semibold text-[#061E29]">
              Pending Tasks
            </p>

            <div className="flex items-end justify-between mt-4">
              <h3 className="text-3xl font-bold text-[#9B3D3D]">
                {pendingTasks}
              </h3>

              <span className="text-xs text-[#5F9598]">
                Remaining
              </span>
            </div>

            <div className="w-full h-2 bg-[#F8ECEC] rounded-full mt-4">
              <div
                className="h-2 bg-[#9B3D3D] rounded-full"
                style={{
                  width: `${
                    totalTasks
                      ? (pendingTasks / totalTasks) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

          </div>

        </div>


        {/* ================= FILTERS ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search projects or managers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none focus:border-[#5F9598]"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none"
            >
              <option value="All">
                All Status
              </option>

              <option value="On Track">
                On Track
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Delayed">
                Delayed
              </option>
            </select>

          </div>

        </div>


        {/* ================= PROJECT REPORTS ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

          <div className="px-5 py-5 border-b border-[#D9E1E2]">

            <h3 className="text-lg font-bold text-[#061E29]">
              Project Performance
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              {filteredReports.length} project
              {filteredReports.length !== 1 ? "s" : ""} found
            </p>

          </div>


          {filteredReports.length === 0 ? (

            <div className="text-center py-16 px-5">

              <div className="w-14 h-14 rounded-2xl bg-[#F3F4F4] mx-auto flex items-center justify-center text-[#5F9598] text-2xl">
                📊
              </div>

              <p className="text-sm font-semibold text-[#061E29] mt-4">
                No reports found
              </p>

              <p className="text-xs text-[#5F9598] mt-1">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-[#D9E1E2]">

              {filteredReports.map((report) => (

                <div
                  key={report.id}
                  className="p-5 hover:bg-[#FAFAFA] transition"
                >

                  <div className="flex flex-col xl:flex-row xl:items-center gap-5">

                    {/* PROJECT */}

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h4 className="text-sm font-bold text-[#061E29]">
                          {report.project}
                        </h4>

                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${getStatusStyle(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>

                      </div>

                      <p className="text-xs text-[#5F9598] mt-1">
                        Manager: {report.manager}
                      </p>

                      <p className="text-[10px] text-[#8A999B] mt-1">
                        Deadline: {report.deadline}
                      </p>

                    </div>


                    {/* TASK COUNTS */}

                    <div className="grid grid-cols-3 gap-5 text-center">

                      <div>
                        <p className="text-lg font-bold text-[#276749]">
                          {report.completedTasks}
                        </p>

                        <p className="text-[10px] text-[#8A999B]">
                          Completed
                        </p>
                      </div>

                      <div>
                        <p className="text-lg font-bold text-[#1D546D]">
                          {report.inProgressTasks}
                        </p>

                        <p className="text-[10px] text-[#8A999B]">
                          Progress
                        </p>
                      </div>

                      <div>
                        <p className="text-lg font-bold text-[#9B3D3D]">
                          {report.pendingTasks}
                        </p>

                        <p className="text-[10px] text-[#8A999B]">
                          Pending
                        </p>
                      </div>

                    </div>


                    {/* PROGRESS */}

                    <div className="w-full xl:w-48">

                      <div className="flex items-center justify-between mb-2">

                        <span className="text-xs font-semibold text-[#302D30]">
                          Progress
                        </span>

                        <span className="text-xs font-bold text-[#061E29]">
                          {report.progress}%
                        </span>

                      </div>

                      <div className="w-full h-2.5 bg-[#EAEDED] rounded-full overflow-hidden">

                        <div
                          className={`h-2.5 rounded-full ${getProgressStyle(
                            report.progress
                          )}`}
                          style={{
                            width: `${report.progress}%`,
                          }}
                        />

                      </div>

                    </div>


                    {/* VIEW BUTTON */}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedReport(report)
                      }
                      className="px-4 py-2.5 rounded-xl border border-[#D9E1E2] text-[#1D546D] text-xs font-semibold hover:bg-[#E7F0F1] transition"
                    >
                      View Report
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>


      {/* ================= VIEW MODAL ================= */}

      {selectedReport && (

        <div className="fixed inset-0 bg-[#061E29]/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <div>

                <p className="text-xs text-[#5F9598]">
                  Project Report
                </p>

                <h3 className="text-lg font-bold text-[#061E29] mt-1">
                  {selectedReport.project}
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="text-[#5F9598] hover:text-[#061E29] text-xl"
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-xs text-[#5F9598]">
                    Project Status
                  </p>

                  <span
                    className={`inline-flex mt-2 px-3 py-1 rounded-lg text-xs font-semibold ${getStatusStyle(
                      selectedReport.status
                    )}`}
                  >
                    {selectedReport.status}
                  </span>

                </div>

                <div className="text-right">

                  <p className="text-xs text-[#5F9598]">
                    Overall Progress
                  </p>

                  <p className="text-2xl font-bold text-[#1D546D] mt-1">
                    {selectedReport.progress}%
                  </p>

                </div>

              </div>


              {/* PROGRESS BAR */}

              <div className="mb-6">

                <div className="w-full h-3 bg-[#EAEDED] rounded-full overflow-hidden">

                  <div
                    className={`h-3 rounded-full ${getProgressStyle(
                      selectedReport.progress
                    )}`}
                    style={{
                      width: `${selectedReport.progress}%`,
                    }}
                  />

                </div>

              </div>


              {/* DETAILS */}

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-[#5F9598]">
                    Manager
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedReport.manager}
                  </p>
                </div>


                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-[#5F9598]">
                    Deadline
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedReport.deadline}
                  </p>
                </div>


                <div className="bg-[#E8F3EE] rounded-xl p-4">
                  <p className="text-xs text-[#276749]">
                    Completed
                  </p>

                  <p className="text-xl font-bold text-[#276749] mt-1">
                    {selectedReport.completedTasks}
                  </p>
                </div>


                <div className="bg-[#F8ECEC] rounded-xl p-4">
                  <p className="text-xs text-[#9B3D3D]">
                    Pending
                  </p>

                  <p className="text-xl font-bold text-[#9B3D3D] mt-1">
                    {selectedReport.pendingTasks}
                  </p>
                </div>


                <div className="bg-[#E7F0F1] rounded-xl p-4">
                  <p className="text-xs text-[#1D546D]">
                    In Progress
                  </p>

                  <p className="text-xl font-bold text-[#1D546D] mt-1">
                    {selectedReport.inProgressTasks}
                  </p>
                </div>


                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-[#5F9598]">
                    Total Tasks
                  </p>

                  <p className="text-xl font-bold text-[#061E29] mt-1">
                    {selectedReport.totalTasks}
                  </p>
                </div>

              </div>


              {/* CLOSE */}

              <div className="flex justify-end mt-7">

                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
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

export default ManagerReports;

