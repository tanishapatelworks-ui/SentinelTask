import { useMemo, useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Design Homepage",
    project: "Website Redesign",
    assignee: "Amit Patel",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-09-10",
    description: "Create responsive homepage design for the website.",
  },
  {
    id: 2,
    title: "Create Login API",
    project: "ERP Development",
    assignee: "Neha Patel",
    priority: "High",
    status: "To Do",
    dueDate: "2026-09-12",
    description: "Develop secure login API with authentication.",
  },
  {
    id: 3,
    title: "Mobile UI Screens",
    project: "Mobile Application",
    assignee: "Karan Mehta",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-09-15",
    description: "Create main UI screens for the mobile application.",
  },
  {
    id: 4,
    title: "Marketing Banner",
    project: "Marketing Campaign",
    assignee: "Amit Patel",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-09-08",
    description: "Design promotional banner for the marketing campaign.",
  },
  {
    id: 5,
    title: "Database Design",
    project: "ERP Development",
    assignee: "Neha Patel",
    priority: "Medium",
    status: "To Do",
    dueDate: "2026-09-18",
    description: "Prepare database structure and collection design.",
  },
];

const teamMembers = [
  "Amit Patel",
  "Neha Patel",
  "Karan Mehta",
];

const projects = [
  "Website Redesign",
  "Mobile Application",
  "Marketing Campaign",
  "ERP Development",
];

const emptyForm = {
  title: "",
  project: "",
  assignee: "",
  priority: "Medium",
  status: "To Do",
  dueDate: "",
  description: "",
};

const ManagerTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.project.toLowerCase().includes(searchText) ||
        task.assignee.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter task title.");
      return;
    }

    if (!form.project) {
      alert("Please select a project.");
      return;
    }

    if (!form.assignee) {
      alert("Please assign the task to a team member.");
      return;
    }

    const newTask = {
      id: Date.now(),
      ...form,
    };

    setTasks([newTask, ...tasks]);
    setForm(emptyForm);
    setShowCreateModal(false);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);

    setForm({
      title: task.title,
      project: task.project,
      assignee: task.assignee,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      description: task.description,
    });

    setShowEditModal(true);
  };

  const handleEditTask = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter task title.");
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              ...form,
            }
          : task
      )
    );

    setForm(emptyForm);
    setSelectedTask(null);
    setShowEditModal(false);
  };

  const openViewModal = (task) => {
    setSelectedTask(task);
    setShowViewModal(true);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  const getPriorityClass = (priority) => {
    if (priority === "High") {
      return "bg-red-100 text-red-700";
    }

    if (priority === "Medium") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-emerald-100 text-emerald-700";
  };

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">
      {/* Header */}
      <div className="bg-[#1D546D] px-6 lg:px-10 py-7">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-[#B8C9CB] text-sm mb-1">
              Manager Workspace
            </p>

            <h1 className="text-3xl font-bold text-white">
              Manage Tasks
            </h1>

            <p className="text-[#D9E1E2] mt-2 text-sm">
              Create, assign and monitor tasks for your team.
            </p>
          </div>

          <button
            onClick={() => {
              setForm(emptyForm);
              setShowCreateModal(true);
            }}
            className="bg-[#061E29] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#0B2C3A] transition shadow-sm"
          >
            + Create Task
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5">
            <p className="text-sm text-gray-500">Total Tasks</p>

            <h2 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalTasks}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Across your projects
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5">
            <p className="text-sm text-gray-500">To Do</p>

            <h2 className="text-3xl font-bold text-amber-600 mt-2">
              {pendingTasks}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Waiting to start
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5">
            <p className="text-sm text-gray-500">In Progress</p>

            <h2 className="text-3xl font-bold text-[#1D546D] mt-2">
              {inProgressTasks}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Currently active
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5">
            <p className="text-sm text-gray-500">Completed</p>

            <h2 className="text-3xl font-bold text-emerald-600 mt-2">
              {completedTasks}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Finished tasks
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none"
            >
              <option value="All">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button
              onClick={resetFilters}
              className="px-4 py-3 rounded-xl border border-[#D9E1E2] text-[#1D546D] font-semibold hover:bg-[#F3F4F4]"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">✅</div>

            <h3 className="text-lg font-semibold text-[#061E29]">
              No tasks found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border border-[#D9E1E2] rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h2 className="text-xl font-bold text-[#061E29]">
                        {task.title}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityClass(
                          task.priority
                        )}`}
                      >
                        {task.priority} Priority
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      {task.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">
                          Project
                        </p>

                        <p className="text-sm font-semibold text-[#302D30] mt-1">
                          {task.project}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Assigned To
                        </p>

                        <p className="text-sm font-semibold text-[#302D30] mt-1">
                          {task.assignee}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Due Date
                        </p>

                        <p className="text-sm font-semibold text-[#302D30] mt-1">
                          {task.dueDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap lg:flex-col gap-2 lg:min-w-[125px]">
                    <button
                      onClick={() => openViewModal(task)}
                      className="px-4 py-2 rounded-lg bg-[#E7F0F1] text-[#1D546D] text-sm font-semibold hover:bg-[#D9E1E2]"
                    >
                      View
                    </button>

                    <button
                      onClick={() => openEditModal(task)}
                      className="px-4 py-2 rounded-lg bg-[#061E29] text-white text-sm font-semibold hover:bg-[#0B2C3A]"
                    >
                      Edit
                    </button>

                    {task.status !== "Completed" && (
                      <button
                        onClick={() =>
                          updateTaskStatus(task.id, "Completed")
                        }
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Create Task
                </h2>

                <p className="text-[#B8C9CB] text-sm mt-1">
                  Assign a new task to your team.
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
              onSubmit={handleCreateTask}
              className="p-6 space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="Enter task title"
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Project
                  </label>

                  <select
                    name="project"
                    value={form.project}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none focus:ring-2 focus:ring-[#5F9598]"
                  >
                    <option value="">Select Project</option>

                    {projects.map((project) => (
                      <option key={project} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Assign To
                  </label>

                  <select
                    name="assignee"
                    value={form.assignee}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none focus:ring-2 focus:ring-[#5F9598]"
                  >
                    <option value="">Select Team Member</option>

                    {teamMembers.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">
                      In Progress
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows="4"
                  placeholder="Enter task description"
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none resize-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] font-semibold hover:bg-[#F3F4F4]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] text-white font-semibold hover:bg-[#285F77]"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Edit Task
                </h2>

                <p className="text-[#B8C9CB] text-sm mt-1">
                  Update task details and assignment.
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
              onSubmit={handleEditTask}
              className="p-6 space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Project
                  </label>

                  <select
                    name="project"
                    value={form.project}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none"
                  >
                    {projects.map((project) => (
                      <option key={project} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Assign To
                  </label>

                  <select
                    name="assignee"
                    value={form.assignee}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none"
                  >
                    {teamMembers.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl bg-white outline-none"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">
                      In Progress
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-[#D9E1E2] rounded-xl outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3">
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

      {/* View Task Modal */}
      {showViewModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-xl">
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Task Details
                </h2>

                <p className="text-[#B8C9CB] text-sm mt-1">
                  View complete task information.
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
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityClass(
                      selectedTask.priority
                    )}`}
                  >
                    {selectedTask.priority} Priority
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                      selectedTask.status
                    )}`}
                  >
                    {selectedTask.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#061E29]">
                  {selectedTask.title}
                </h3>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Description
                </p>

                <p className="text-sm text-[#302D30] mt-1">
                  {selectedTask.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Project
                  </p>

                  <p className="text-sm font-bold text-[#061E29] mt-1">
                    {selectedTask.project}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Assigned To
                  </p>

                  <p className="text-sm font-bold text-[#061E29] mt-1">
                    {selectedTask.assignee}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Priority
                  </p>

                  <p className="text-sm font-bold text-[#061E29] mt-1">
                    {selectedTask.priority}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Due Date
                  </p>

                  <p className="text-sm font-bold text-[#061E29] mt-1">
                    {selectedTask.dueDate || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#061E29] text-white font-semibold hover:bg-[#0B2C3A]"
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

export default ManagerTasks;