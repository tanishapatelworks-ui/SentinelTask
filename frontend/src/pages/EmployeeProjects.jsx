import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign and improve the company website UI.",
    status: "In Progress",
    priority: "High",
    progress: 72,
    manager: "Rahul Mehta",
    dueDate: "15 Sep 2026",
    team: 5,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Development of the new mobile application.",
    status: "In Progress",
    priority: "Medium",
    progress: 48,
    manager: "Priya Shah",
    dueDate: "28 Sep 2026",
    team: 6,
  },
  {
    id: 3,
    name: "ERP Development",
    description: "Build modules for the business ERP system.",
    status: "Planning",
    priority: "High",
    progress: 25,
    manager: "Amit Patel",
    dueDate: "10 Oct 2026",
    team: 8,
  },
  {
    id: 4,
    name: "Security Audit",
    description: "Review application security and access control.",
    status: "Completed",
    priority: "High",
    progress: 100,
    manager: "Neha Joshi",
    dueDate: "05 Sep 2026",
    team: 4,
  },
  {
    id: 5,
    name: "E-Commerce Platform",
    description: "Development of an online shopping platform.",
    status: "In Progress",
    priority: "Medium",
    progress: 64,
    manager: "Karan Shah",
    dueDate: "20 Oct 2026",
    team: 7,
  },
  {
    id: 6,
    name: "Testing & QA",
    description: "Testing application features and fixing defects.",
    status: "Planning",
    priority: "Low",
    progress: 15,
    manager: "Priya Shah",
    dueDate: "25 Oct 2026",
    team: 3,
  },
];

function EmployeeProjects() {
  const navigate = useNavigate();

  const [projects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        project.name.toLowerCase().includes(searchText) ||
        project.manager.toLowerCase().includes(searchText) ||
        project.description.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const averageProgress = Math.round(
    projects.reduce((sum, project) => sum + project.progress, 0) /
      projects.length
  );

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-[#E8F4EE] text-[#26734D]";
    }

    if (status === "In Progress") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    return "bg-[#FFF4DF] text-[#9A6817]";
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-[#FFF0F0] text-[#A33A3A]";
    }

    if (priority === "Medium") {
      return "bg-[#FFF4DF] text-[#9A6817]";
    }

    return "bg-[#E9F2F3] text-[#5F9598]";
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4] text-[#302D30]">
      {/* ================= HEADER ================= */}

      <header className="bg-[#061E29] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[#B8C9CB] text-sm font-medium">
              SentinelTask
            </p>

            <h1 className="text-2xl font-bold mt-1">
              Employee Projects
            </h1>
          </div>

          <button
            onClick={() => navigate("/employee-dashboard")}
            className="bg-[#1D546D] hover:bg-[#286B86] px-5 py-2.5 rounded-lg font-semibold transition"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* PAGE TITLE */}

        <div className="mb-7">
          <p className="text-[#5F9598] text-sm font-semibold uppercase tracking-wide">
            Workspace
          </p>

          <h2 className="text-3xl font-bold text-[#061E29] mt-1">
            My Projects
          </h2>

          <p className="text-gray-600 mt-2">
            View the projects assigned to you and track their progress.
          </p>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">
              Total Projects
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalProjects}
            </h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">
              Active Projects
            </p>

            <h3 className="text-3xl font-bold text-[#1D546D] mt-2">
              {activeProjects}
            </h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">
              Completed
            </p>

            <h3 className="text-3xl font-bold text-[#26734D] mt-2">
              {completedProjects}
            </h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">
              Average Progress
            </p>

            <h3 className="text-3xl font-bold text-[#5F9598] mt-2">
              {averageProgress}%
            </h3>
          </div>
        </div>

        {/* ================= SEARCH + FILTER ================= */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-7">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#302D30] mb-2">
                Search Projects
              </label>

              <input
                type="text"
                placeholder="Search by project, manager or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
              />
            </div>

            <div className="md:w-56">
              <label className="block text-sm font-semibold text-[#302D30] mb-2">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Projects</option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= PROJECTS ================= */}

        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">📁</div>

            <h3 className="text-xl font-bold text-[#061E29]">
              No Projects Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Project Header */}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-lg bg-[#E7F0F1] flex items-center justify-center text-xl">
                      📁
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-[#061E29]">
                        {project.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {project.manager}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Description */}

                <p className="text-sm text-gray-600 mt-5 min-h-[42px]">
                  {project.description}
                </p>

                {/* Priority + Due Date */}

                <div className="flex items-center justify-between mt-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(
                      project.priority
                    )}`}
                  >
                    {project.priority} Priority
                  </span>

                  <span className="text-sm text-gray-500">
                    📅 {project.dueDate}
                  </span>
                </div>

                {/* Progress */}

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-700">
                      Progress
                    </span>

                    <span className="font-bold text-[#1D546D]">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1D546D] rounded-full transition-all"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Team */}

                <div className="flex items-center justify-between mt-5 text-sm text-gray-500">
                  <span>👥 {project.team} Team Members</span>
                </div>

                {/* Action */}

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full mt-6 bg-[#E7F0F1] text-[#1D546D] border border-[#B8C9CB] hover:bg-[#1D546D] hover:text-white py-2.5 rounded-lg font-semibold transition"
                >
                  👁 View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= VIEW MODAL ================= */}

      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            {/* Modal Header */}

            <div className="bg-[#061E29] text-white px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[#B8C9CB] text-sm">
                  Project Details
                </p>

                <h3 className="text-xl font-bold mt-1">
                  {selectedProject.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="text-white text-2xl hover:text-[#B8C9CB]"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}

            <div className="p-6">
              <p className="text-gray-600 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#F3F4F4] rounded-lg p-4">
                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedProject.status}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-lg p-4">
                  <p className="text-xs text-gray-500">
                    Priority
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedProject.priority}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-lg p-4">
                  <p className="text-xs text-gray-500">
                    Manager
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedProject.manager}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-lg p-4">
                  <p className="text-xs text-gray-500">
                    Due Date
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedProject.dueDate}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">
                    Project Progress
                  </span>

                  <span className="font-bold text-[#1D546D]">
                    {selectedProject.progress}%
                  </span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1D546D] rounded-full"
                    style={{
                      width: `${selectedProject.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-7">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-[#1D546D] hover:bg-[#286B86] text-white px-5 py-2.5 rounded-lg font-semibold transition"
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

export default EmployeeProjects;