import { useMemo, useState } from "react";

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign company website with a modern responsive interface.",
    manager: "Rahul Sharma",
    team: ["Amit Patel", "Neha Patel"],
    progress: 75,
    totalTasks: 24,
    completedTasks: 18,
    status: "In Progress",
    deadline: "2026-09-20",
  },
  {
    id: 2,
    name: "Mobile Application",
    description: "Develop a mobile application for customer services.",
    manager: "Rahul Sharma",
    team: ["Priya Shah", "Karan Mehta"],
    progress: 55,
    totalTasks: 20,
    completedTasks: 11,
    status: "In Progress",
    deadline: "2026-09-28",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Plan and execute the upcoming digital marketing campaign.",
    manager: "Rahul Sharma",
    team: ["Amit Patel"],
    progress: 90,
    totalTasks: 30,
    completedTasks: 27,
    status: "Almost Done",
    deadline: "2026-09-15",
  },
  {
    id: 4,
    name: "ERP Development",
    description: "Develop modules for the internal business ERP system.",
    manager: "Rahul Sharma",
    team: ["Neha Patel", "Karan Mehta"],
    progress: 35,
    totalTasks: 20,
    completedTasks: 7,
    status: "In Progress",
    deadline: "2026-10-10",
  },
];

const emptyForm = {
  name: "",
  description: "",
  deadline: "",
  team: "",
};

const ManagerProjects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const totalProjects = projects.length;

  const inProgress = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const almostDone = projects.filter(
    (project) => project.status === "Almost Done"
  ).length;

  const totalTasks = projects.reduce(
    (total, project) => total + project.totalTasks,
    0
  );

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter project name.");
      return;
    }

    const teamMembers = form.team
      ? form.team
          .split(",")
          .map((member) => member.trim())
          .filter(Boolean)
      : [];

    const newProject = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      manager: "Current Manager",
      team: teamMembers,
      progress: 0,
      totalTasks: 0,
      completedTasks: 0,
      status: "In Progress",
      deadline: form.deadline || "Not set",
    };

    setProjects([newProject, ...projects]);
    setForm(emptyForm);
    setShowCreateModal(false);
  };

  const openEditModal = (project) => {
    setSelectedProject(project);

    setForm({
      name: project.name,
      description: project.description,
      deadline: project.deadline !== "Not set" ? project.deadline : "",
      team: project.team.join(", "),
    });

    setShowEditModal(true);
  };

  const handleEditProject = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter project name.");
      return;
    }

    const teamMembers = form.team
      ? form.team
          .split(",")
          .map((member) => member.trim())
          .filter(Boolean)
      : [];

    setProjects(
      projects.map((project) =>
        project.id === selectedProject.id
          ? {
              ...project,
              name: form.name,
              description: form.description,
              deadline: form.deadline || "Not set",
              team: teamMembers,
            }
          : project
      )
    );

    setForm(emptyForm);
    setSelectedProject(null);
    setShowEditModal(false);
  };

  const openViewModal = (project) => {
    setSelectedProject(project);
    setShowViewModal(true);
  };

  const openTasksModal = (project) => {
    setSelectedProject(project);
    setShowTasksModal(true);
  };

  const getStatusClass = (status) => {
    if (status === "Almost Done") {
      return "bg-amber-100 text-amber-700";
    }

    if (status === "Completed") {
      return "bg-emerald-100 text-emerald-700";
    }

    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">
      {/* Page Header */}
      <div className="bg-[#1D546D] px-6 lg:px-10 py-7">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-[#B8C9CB] text-sm mb-1">Manager Workspace</p>

            <h1 className="text-3xl font-bold text-white">
              My Projects
            </h1>

            <p className="text-[#D9E1E2] mt-2 text-sm">
              Create and manage projects assigned to your team.
            </p>
          </div>

          <button
            onClick={() => {
              setForm(emptyForm);
              setShowCreateModal(true);
            }}
            className="bg-[#061E29] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#0B2C3A] transition shadow-sm"
          >
            + New Project
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5">
            <p className="text-sm text-gray-500">My Projects</p>
            <h2 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalProjects}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Projects managed by you
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5">
            <p className="text-sm text-gray-500">In Progress</p>
            <h2 className="text-3xl font-bold text-[#1D546D] mt-2">
              {inProgress}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Currently active
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5">
            <p className="text-sm text-gray-500">Almost Done</p>
            <h2 className="text-3xl font-bold text-amber-600 mt-2">
              {almostDone}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Near completion
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <h2 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalTasks}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Across my projects
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search my projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none bg-white"
            >
              <option value="All">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Almost Done">Almost Done</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Project Cards */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">📁</div>

            <h3 className="text-lg font-semibold text-[#061E29]">
              No projects found
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-[#D9E1E2] rounded-2xl p-6 hover:shadow-md transition"
              >
                {/* Project Top */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#061E29]">
                      {project.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {project.description}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusClass(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Manager */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D9E1E2] flex items-center justify-center text-[#061E29] font-bold">
                    M
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Project Manager
                    </p>

                    <p className="text-sm font-semibold text-[#302D30]">
                      {project.manager}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#302D30]">
                      Project Progress
                    </span>

                    <span className="text-sm font-bold text-[#1D546D]">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-[#EAEFF0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1D546D] rounded-full"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Task Info */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-[#F3F4F4] rounded-xl p-4">
                    <p className="text-xs text-gray-500">
                      Tasks
                    </p>

                    <p className="text-lg font-bold text-[#061E29] mt-1">
                      {project.totalTasks}
                    </p>
                  </div>

                  <div className="bg-[#F3F4F4] rounded-xl p-4">
                    <p className="text-xs text-gray-500">
                      Completed
                    </p>

                    <p className="text-lg font-bold text-emerald-600 mt-1">
                      {project.completedTasks}
                    </p>
                  </div>
                </div>

                {/* Team */}
                <div className="mt-5">
                  <p className="text-xs text-gray-500 mb-2">
                    Team Members
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.team.length > 0 ? (
                      project.team.map((member, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#E7F0F1] text-[#1D546D] rounded-lg text-xs font-medium"
                        >
                          {member}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">
                        No team members assigned
                      </span>
                    )}
                  </div>
                </div>

                {/* Deadline */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">
                      Deadline
                    </p>

                    <p className="text-sm font-semibold text-[#302D30]">
                      {project.deadline}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 text-right">
                      Tasks Done
                    </p>

                    <p className="text-sm font-semibold text-[#1D546D]">
                      {project.completedTasks}/{project.totalTasks}
                    </p>
                  </div>
                </div>

                {/* Manager Actions */}
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#D9E1E2]">
                  <button
                    onClick={() => openViewModal(project)}
                    className="px-4 py-2 rounded-lg bg-[#E7F0F1] text-[#1D546D] text-sm font-semibold hover:bg-[#D9E1E2] transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => openEditModal(project)}
                    className="px-4 py-2 rounded-lg bg-[#061E29] text-white text-sm font-semibold hover:bg-[#0B2C3A] transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => openTasksModal(project)}
                    className="px-4 py-2 rounded-lg bg-[#1D546D] text-white text-sm font-semibold hover:bg-[#285F77] transition"
                  >
                    Manage Tasks
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Create Project
                </h2>

                <p className="text-[#B8C9CB] text-sm mt-1">
                  Create a new project for your team.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white text-2xl hover:text-[#B8C9CB]"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleCreateProject}
              className="p-6 space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Project Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Enter project name"
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows="3"
                  placeholder="Enter project description"
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Deadline
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Team Members
                </label>

                <input
                  type="text"
                  name="team"
                  value={form.team}
                  onChange={handleFormChange}
                  placeholder="Example: Amit Patel, Neha Patel"
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Separate multiple members with commas.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#302D30] font-semibold hover:bg-[#F3F4F4]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] text-white font-semibold hover:bg-[#285F77]"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Edit Project
                </h2>

                <p className="text-[#B8C9CB] text-sm mt-1">
                  Update project information.
                </p>
              </div>

              <button
                onClick={() => setShowEditModal(false)}
                className="text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleEditProject}
              className="p-6 space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Project Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Deadline
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Team Members
                </label>

                <input
                  type="text"
                  name="team"
                  value={form.team}
                  onChange={handleFormChange}
                  placeholder="Example: Amit Patel, Neha Patel"
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] font-semibold hover:bg-[#F3F4F4]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#061E29] text-white font-semibold hover:bg-[#0B2C3A]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      {showViewModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-xl">
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Project Details
                </h2>

                <p className="text-[#B8C9CB] text-sm mt-1">
                  View project information.
                </p>
              </div>

              <button
                onClick={() => setShowViewModal(false)}
                className="text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <p className="text-xs text-gray-400">
                  Project Name
                </p>

                <h3 className="text-2xl font-bold text-[#061E29] mt-1">
                  {selectedProject.name}
                </h3>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Description
                </p>

                <p className="text-sm text-[#302D30] mt-1">
                  {selectedProject.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Progress
                  </p>

                  <p className="text-xl font-bold text-[#1D546D] mt-1">
                    {selectedProject.progress}%
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p className="text-sm font-bold text-[#302D30] mt-2">
                    {selectedProject.status}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2">
                  Team Members
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-[#E7F0F1] text-[#1D546D] rounded-lg text-sm font-medium"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#061E29] text-white font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Tasks Modal */}
      {showTasksModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-xl">
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Manage Project Tasks
                </h2>

                <p className="text-[#B8C9CB] text-sm mt-1">
                  {selectedProject.name}
                </p>
              </div>

              <button
                onClick={() => setShowTasksModal(false)}
                className="text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-[#F3F4F4] rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500">
                    Total
                  </p>

                  <p className="text-xl font-bold text-[#061E29] mt-1">
                    {selectedProject.totalTasks}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500">
                    Completed
                  </p>

                  <p className="text-xl font-bold text-emerald-600 mt-1">
                    {selectedProject.completedTasks}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500">
                    Pending
                  </p>

                  <p className="text-xl font-bold text-amber-600 mt-1">
                    {selectedProject.totalTasks -
                      selectedProject.completedTasks}
                  </p>
                </div>
              </div>

              <div className="bg-[#E7F0F1] rounded-xl p-5">
                <h3 className="font-bold text-[#061E29]">
                  Manager Task Control
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  From the Tasks module, you will be able to create
                  tasks, assign them to your team members, update
                  priorities and monitor task progress.
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowTasksModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] text-white font-semibold hover:bg-[#285F77]"
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
};

export default ManagerProjects;