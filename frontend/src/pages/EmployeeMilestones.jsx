import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeMilestones = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const milestones = [
    {
      id: 1,
      title: "Homepage UI Completion",
      project: "Website Redesign",
      dueDate: "10 Sep 2026",
      progress: 90,
      status: "In Progress",
      priority: "High",
      owner: "Rahul Mehta",
      description:
        "Complete the homepage user interface and make sure it is responsive on different screen sizes.",
    },
    {
      id: 2,
      title: "Mobile Login Module",
      project: "Mobile App Development",
      dueDate: "12 Sep 2026",
      progress: 70,
      status: "In Progress",
      priority: "High",
      owner: "Priya Shah",
      description:
        "Complete login validation and connect the login screen with the authentication module.",
    },
    {
      id: 3,
      title: "API Documentation",
      project: "ERP Development",
      dueDate: "15 Sep 2026",
      progress: 55,
      status: "In Progress",
      priority: "Medium",
      owner: "Amit Patel",
      description:
        "Prepare and review API documentation for the ERP development team.",
    },
    {
      id: 4,
      title: "Security Audit Completion",
      project: "Security Audit",
      dueDate: "05 Sep 2026",
      progress: 100,
      status: "Completed",
      priority: "High",
      owner: "Neha Joshi",
      description:
        "Complete the security audit and document the identified security issues and solutions.",
    },
    {
      id: 5,
      title: "E-Commerce UI Review",
      project: "E-Commerce Platform",
      dueDate: "20 Sep 2026",
      progress: 40,
      status: "Pending",
      priority: "Medium",
      owner: "Karan Shah",
      description:
        "Review the e-commerce user interface and provide feedback for improvements.",
    },
    {
      id: 6,
      title: "Testing & QA Completion",
      project: "Testing & QA",
      dueDate: "25 Sep 2026",
      progress: 25,
      status: "Pending",
      priority: "Low",
      owner: "Pooja Patel",
      description:
        "Complete testing activities and prepare the final QA report.",
    },
  ];

  const summary = {
    total: milestones.length,
    completed: milestones.filter(
      (milestone) => milestone.status === "Completed"
    ).length,
    inProgress: milestones.filter(
      (milestone) => milestone.status === "In Progress"
    ).length,
    pending: milestones.filter(
      (milestone) => milestone.status === "Pending"
    ).length,
  };

  const filteredMilestones = useMemo(() => {
    return milestones.filter((milestone) => {
      const matchesSearch =
        milestone.title.toLowerCase().includes(search.toLowerCase()) ||
        milestone.project.toLowerCase().includes(search.toLowerCase()) ||
        milestone.owner.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        milestone.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-[#E8F5E9] text-[#2E7D32]";
    }

    if (status === "In Progress") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    return "bg-[#FFF4E5] text-[#A86400]";
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-[#FFF0F0] text-[#A33A3A]";
    }

    if (priority === "Medium") {
      return "bg-[#FFF4E5] text-[#A86400]";
    }

    return "bg-[#EAF5F5] text-[#397477]";
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
            My Milestones
          </h1>
        </div>

        <button
          onClick={() => navigate("/employee-dashboard")}
          className="bg-[#1D546D] hover:bg-[#286B86] px-5 py-2.5 rounded-lg text-sm font-medium transition"
        >
          Dashboard
        </button>

      </header>

      {/* ================= CONTENT ================= */}
      <main className="p-6 md:p-8 max-w-7xl mx-auto">

        {/* Intro */}
        <div className="mb-7">

          <h2 className="text-xl font-semibold text-[#061E29]">
            Project Milestones
          </h2>

          <p className="text-sm text-[#7B8588] mt-1">
            Track the progress and deadlines of your assigned milestones.
          </p>

        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          {/* Total */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Total Milestones
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-1">
                  {summary.total}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center text-xl">
                🎯
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
                  {summary.completed}
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

                <h3 className="text-3xl font-bold text-[#1D546D] mt-1">
                  {summary.inProgress}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center text-xl">
                ⏳
              </div>

            </div>

          </div>

          {/* Pending */}
          <div className="bg-white border border-[#D9E1E2] rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#7B8588]">
                  Pending
                </p>

                <h3 className="text-3xl font-bold text-[#A86400] mt-1">
                  {summary.pending}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#FFF4E5] text-[#A86400] flex items-center justify-center text-xl">
                !
              </div>

            </div>

          </div>

        </section>

        {/* ================= SEARCH + FILTER ================= */}
        <section className="bg-white border border-[#D9E1E2] rounded-xl p-5 mb-7">

          <div className="flex flex-col md:flex-row gap-4">

            {/* Search */}
            <div className="flex-1">

              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Search Milestones
              </label>

              <input
                type="text"
                placeholder="Search by milestone, project or owner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-[#D9E1E2] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1D546D] focus:ring-1 focus:ring-[#1D546D]"
              />

            </div>

            {/* Status */}
            <div className="w-full md:w-56">

              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-[#D9E1E2] rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>

            </div>

          </div>

        </section>

        {/* ================= MILESTONES ================= */}
        <section>

          <div className="flex items-center justify-between mb-4">

            <div>
              <h2 className="text-lg font-semibold text-[#061E29]">
                Milestone List
              </h2>

              <p className="text-sm text-[#7B8588] mt-1">
                {filteredMilestones.length} milestone
                {filteredMilestones.length !== 1 ? "s" : ""} found
              </p>
            </div>

          </div>

          {filteredMilestones.length === 0 ? (

            <div className="bg-white border border-[#D9E1E2] rounded-xl p-10 text-center">

              <div className="text-4xl mb-3">
                🎯
              </div>

              <h3 className="font-semibold text-[#302D30]">
                No milestones found
              </h3>

              <p className="text-sm text-[#7B8588] mt-1">
                Try changing your search or status filter.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {filteredMilestones.map((milestone) => (

                <div
                  key={milestone.id}
                  className="bg-white border border-[#D9E1E2] rounded-xl p-6 hover:shadow-md transition"
                >

                  {/* Top */}
                  <div className="flex items-start justify-between gap-4 mb-4">

                    <div>
                      <h3 className="text-lg font-semibold text-[#302D30]">
                        {milestone.title}
                      </h3>

                      <p className="text-sm text-[#7B8588] mt-1">
                        {milestone.project}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyle(
                        milestone.status
                      )}`}
                    >
                      {milestone.status}
                    </span>

                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-5">

                    <div>
                      <p className="text-xs text-[#7B8588]">
                        Due Date
                      </p>

                      <p className="text-sm font-medium text-[#302D30] mt-1">
                        {milestone.dueDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#7B8588]">
                        Priority
                      </p>

                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityStyle(
                          milestone.priority
                        )}`}
                      >
                        {milestone.priority}
                      </span>
                    </div>

                  </div>

                  {/* Progress */}
                  <div className="mb-5">

                    <div className="flex items-center justify-between mb-2">

                      <span className="text-xs font-medium text-[#5F6668]">
                        Progress
                      </span>

                      <span className="text-sm font-semibold text-[#1D546D]">
                        {milestone.progress}%
                      </span>

                    </div>

                    <div className="w-full h-2 bg-[#E7F0F1] rounded-full overflow-hidden">

                      <div
                        className="h-full bg-[#1D546D] rounded-full transition-all"
                        style={{
                          width: `${milestone.progress}%`,
                        }}
                      ></div>

                    </div>

                  </div>

                  {/* Owner + Button */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#E6EAEB]">

                    <div>

                      <p className="text-xs text-[#7B8588]">
                        Assigned By
                      </p>

                      <p className="text-sm font-medium text-[#302D30] mt-1">
                        {milestone.owner}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        setSelectedMilestone(milestone)
                      }
                      className="px-4 py-2 rounded-lg bg-[#E7F0F1] text-[#1D546D] border border-[#C8D9DB] text-sm font-medium hover:bg-[#1D546D] hover:text-white transition"
                    >
                      👁 View Details
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      {/* ================= VIEW DETAILS MODAL ================= */}
      {selectedMilestone && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D9E1E2]">

              <div>

                <p className="text-xs text-[#7B8588]">
                  Milestone Details
                </p>

                <h2 className="text-xl font-bold text-[#061E29] mt-1">
                  {selectedMilestone.title}
                </h2>

              </div>

              <button
                onClick={() => setSelectedMilestone(null)}
                className="text-2xl text-[#7B8588] hover:text-[#061E29] transition"
              >
                ×
              </button>

            </div>

            {/* Modal Content */}
            <div className="p-6">

              <div className="flex flex-wrap gap-2 mb-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    selectedMilestone.status
                  )}`}
                >
                  {selectedMilestone.status}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityStyle(
                    selectedMilestone.priority
                  )}`}
                >
                  {selectedMilestone.priority}
                </span>

              </div>

              <div className="space-y-4">

                <div>
                  <p className="text-xs text-[#7B8588]">
                    Project
                  </p>

                  <p className="text-sm font-medium text-[#302D30] mt-1">
                    {selectedMilestone.project}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#7B8588]">
                    Due Date
                  </p>

                  <p className="text-sm font-medium text-[#302D30] mt-1">
                    {selectedMilestone.dueDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#7B8588]">
                    Assigned By
                  </p>

                  <p className="text-sm font-medium text-[#302D30] mt-1">
                    {selectedMilestone.owner}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#7B8588] mb-2">
                    Progress
                  </p>

                  <div className="flex items-center gap-3">

                    <div className="flex-1 h-2 bg-[#E7F0F1] rounded-full overflow-hidden">

                      <div
                        className="h-full bg-[#1D546D] rounded-full"
                        style={{
                          width: `${selectedMilestone.progress}%`,
                        }}
                      ></div>

                    </div>

                    <span className="text-sm font-semibold text-[#1D546D]">
                      {selectedMilestone.progress}%
                    </span>

                  </div>

                </div>

                <div>
                  <p className="text-xs text-[#7B8588]">
                    Description
                  </p>

                  <p className="text-sm text-[#302D30] leading-6 mt-1">
                    {selectedMilestone.description}
                  </p>
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#D9E1E2] flex justify-end">

              <button
                onClick={() => setSelectedMilestone(null)}
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

export default EmployeeMilestones;