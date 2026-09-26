
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeReports = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      title: "My Task Performance",
      type: "Task",
      project: "All Projects",
      period: "September 2026",
      status: "Completed",
      total: 24,
      completed: 16,
      progress: 67,
      description:
        "Shows your assigned tasks, completed tasks, pending tasks and overall task progress.",
    },
    {
      id: 2,
      title: "Project Progress Report",
      type: "Project",
      project: "Website Redesign",
      period: "September 2026",
      status: "In Progress",
      total: 1,
      completed: 0,
      progress: 72,
      description:
        "Shows your contribution and progress in the Website Redesign project.",
    },
    {
      id: 3,
      title: "Milestone Progress Report",
      type: "Milestone",
      project: "All Projects",
      period: "September 2026",
      status: "In Progress",
      total: 6,
      completed: 1,
      progress: 63,
      description:
        "Provides an overview of assigned milestones and their completion progress.",
    },
    {
      id: 4,
      title: "Team Contribution Report",
      type: "Team",
      project: "Development Team",
      period: "September 2026",
      status: "Completed",
      total: 18,
      completed: 13,
      progress: 72,
      description:
        "Displays your contribution to team activities, tasks and project work.",
    },
    {
      id: 5,
      title: "Monthly Work Summary",
      type: "Summary",
      project: "All Projects",
      period: "August 2026",
      status: "Completed",
      total: 30,
      completed: 25,
      progress: 83,
      description:
        "Monthly summary of your overall work, completed tasks and project activities.",
    },
    {
      id: 6,
      title: "Pending Work Report",
      type: "Task",
      project: "All Projects",
      period: "September 2026",
      status: "In Progress",
      total: 8,
      completed: 0,
      progress: 0,
      description:
        "Shows the tasks and work items that are currently pending.",
    },
  ];

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(search.toLowerCase()) ||
        report.project.toLowerCase().includes(search.toLowerCase()) ||
        report.type.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || report.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const completedReports = reports.filter(
    (report) => report.status === "Completed"
  ).length;

  const inProgressReports = reports.filter(
    (report) => report.status === "In Progress"
  ).length;

  const averageProgress = Math.round(
    reports.reduce((sum, report) => sum + report.progress, 0) /
      reports.length
  );

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

    return "bg-[#E8F5E9] text-[#2E7D32]";
  };

  const getIcon = (type) => {
    if (type === "Task") return "✓";
    if (type === "Project") return "📁";
    if (type === "Milestone") return "🎯";
    if (type === "Team") return "👥";
    return "📊";
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
            Reports
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
            My Reports
          </h2>

          <p className="text-sm text-[#7B8588] mt-1">
            View your task, project, milestone and work performance reports.
          </p>
        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          {/* Total Reports */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Total Reports
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-1">
                  {reports.length}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center text-xl">
                📊
              </div>

            </div>
          </div>

          {/* Completed */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Completed
                </p>

                <h3 className="text-3xl font-bold text-[#2E7D32] mt-1">
                  {completedReports}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center text-xl">
                ✓
              </div>

            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  In Progress
                </p>

                <h3 className="text-3xl font-bold text-[#A86400] mt-1">
                  {inProgressReports}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#FFF4E5] text-[#A86400] flex items-center justify-center text-xl">
                ⏳
              </div>

            </div>
          </div>

          {/* Average Progress */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Average Progress
                </p>

                <h3 className="text-3xl font-bold text-[#1D546D] mt-1">
                  {averageProgress}%
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center text-xl">
                %
              </div>

            </div>
          </div>

        </section>

        {/* ================= SEARCH & FILTER ================= */}
        <section className="bg-white border border-[#D9E1E2] rounded-xl p-5 mb-7">

          <div className="flex flex-col lg:flex-row gap-4 lg:items-end">

            <div className="flex-1">

              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Search Reports
              </label>

              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-[#D9E1E2] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1D546D] focus:ring-1 focus:ring-[#1D546D]"
              />

            </div>

            <div className="w-full lg:w-56">

              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Report Type
              </label>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border border-[#D9E1E2] rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Reports</option>
                <option value="Task">Task Reports</option>
                <option value="Project">Project Reports</option>
                <option value="Milestone">
                  Milestone Reports
                </option>
                <option value="Team">Team Reports</option>
                <option value="Summary">Summary Reports</option>
              </select>

            </div>

          </div>

        </section>

        {/* ================= REPORT LIST ================= */}
        <section>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#061E29]">
              Available Reports
            </h2>

            <p className="text-sm text-[#7B8588] mt-1">
              {filteredReports.length} report
              {filteredReports.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredReports.length === 0 ? (

            <div className="bg-white border border-[#D9E1E2] rounded-xl p-10 text-center">

              <div className="text-4xl mb-3">
                📊
              </div>

              <h3 className="font-semibold text-[#302D30]">
                No reports found
              </h3>

              <p className="text-sm text-[#7B8588] mt-1">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {filteredReports.map((report) => (

                <div
                  key={report.id}
                  className="bg-white border border-[#D9E1E2] rounded-xl p-5 hover:shadow-md transition"
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${getTypeStyle(
                          report.type
                        )}`}
                      >
                        {getIcon(report.type)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#302D30]">
                          {report.title}
                        </h3>

                        <p className="text-xs text-[#7B8588] mt-1">
                          {report.project}
                        </p>
                      </div>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(
                        report.type
                      )}`}
                    >
                      {report.type}
                    </span>

                  </div>

                  {/* INFO */}
                  <div className="grid grid-cols-2 gap-4 mt-5">

                    <div className="bg-[#F7F9F9] rounded-lg p-3">
                      <p className="text-xs text-[#7B8588]">
                        Period
                      </p>

                      <p className="text-sm font-medium text-[#302D30] mt-1">
                        {report.period}
                      </p>
                    </div>

                    <div className="bg-[#F7F9F9] rounded-lg p-3">
                      <p className="text-xs text-[#7B8588]">
                        Status
                      </p>

                      <p
                        className={`text-sm font-medium mt-1 ${
                          report.status === "Completed"
                            ? "text-[#2E7D32]"
                            : "text-[#A86400]"
                        }`}
                      >
                        {report.status}
                      </p>
                    </div>

                  </div>

                  {/* PROGRESS */}
                  <div className="mt-5">

                    <div className="flex justify-between text-xs mb-2">

                      <span className="text-[#7B8588]">
                        Progress
                      </span>

                      <span className="font-semibold text-[#1D546D]">
                        {report.progress}%
                      </span>

                    </div>

                    <div className="w-full h-2 bg-[#E6EAEB] rounded-full overflow-hidden">

                      <div
                        className="h-full bg-[#1D546D] rounded-full"
                        style={{
                          width: `${report.progress}%`,
                        }}
                      ></div>

                    </div>

                  </div>

                  {/* BOTTOM */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#E6EAEB]">

                    <div className="text-xs text-[#7B8588]">
                      {report.completed} / {report.total} completed
                    </div>

                    <button
                      onClick={() => setSelectedReport(report)}
                      className="px-4 py-2 rounded-lg bg-[#E7F0F1] text-[#1D546D] border border-[#C8D9DB] text-sm font-medium hover:bg-[#1D546D] hover:text-white transition"
                    >
                      👁 View Report
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      {/* ================= VIEW REPORT MODAL ================= */}
      {selectedReport && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-[#D9E1E2]">

              <div>
                <p className="text-xs text-[#7B8588]">
                  Report Details
                </p>

                <h2 className="text-xl font-bold text-[#061E29] mt-1">
                  {selectedReport.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="text-2xl text-[#7B8588] hover:text-[#061E29] transition"
              >
                ×
              </button>

            </div>

            {/* MODAL BODY */}
            <div className="p-6">

              <div className="flex items-center gap-3 mb-5">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${getTypeStyle(
                    selectedReport.type
                  )}`}
                >
                  {getIcon(selectedReport.type)}
                </div>

                <div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(
                      selectedReport.type
                    )}`}
                  >
                    {selectedReport.type}
                  </span>

                  <p className="text-xs text-[#7B8588] mt-2">
                    {selectedReport.period}
                  </p>

                </div>

              </div>

              <div className="mb-5">

                <p className="text-xs text-[#7B8588] mb-2">
                  Project
                </p>

                <p className="text-sm font-medium text-[#302D30]">
                  {selectedReport.project}
                </p>

              </div>

              <div className="mb-5">

                <p className="text-xs text-[#7B8588] mb-2">
                  Description
                </p>

                <p className="text-sm text-[#302D30] leading-6">
                  {selectedReport.description}
                </p>

              </div>

              <div className="grid grid-cols-3 gap-3">

                <div className="bg-[#F7F9F9] rounded-lg p-3 text-center">
                  <p className="text-xs text-[#7B8588]">
                    Total
                  </p>

                  <p className="text-xl font-bold text-[#061E29] mt-1">
                    {selectedReport.total}
                  </p>
                </div>

                <div className="bg-[#F7F9F9] rounded-lg p-3 text-center">
                  <p className="text-xs text-[#7B8588]">
                    Completed
                  </p>

                  <p className="text-xl font-bold text-[#2E7D32] mt-1">
                    {selectedReport.completed}
                  </p>
                </div>

                <div className="bg-[#F7F9F9] rounded-lg p-3 text-center">
                  <p className="text-xs text-[#7B8588]">
                    Progress
                  </p>

                  <p className="text-xl font-bold text-[#1D546D] mt-1">
                    {selectedReport.progress}%
                  </p>
                </div>

              </div>

            </div>

            {/* MODAL FOOTER */}
            <div className="p-6 border-t border-[#D9E1E2] flex justify-end">

              <button
                onClick={() => setSelectedReport(null)}
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

export default EmployeeReports;

