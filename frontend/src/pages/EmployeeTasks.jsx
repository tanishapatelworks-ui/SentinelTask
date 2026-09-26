import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialTasks = [
  {
    id: 1,
    title: "Create Homepage UI",
    description: "Design the responsive homepage for the company website.",
    project: "Website Redesign",
    priority: "High",
    status: "In Progress",
    dueDate: "10 Sep 2026",
    assignedBy: "Rahul Mehta",
  },
  {
    id: 2,
    title: "Fix Login Validation",
    description: "Resolve validation issues in the login form.",
    project: "Mobile App Development",
    priority: "High",
    status: "Pending",
    dueDate: "12 Sep 2026",
    assignedBy: "Priya Shah",
  },
  {
    id: 3,
    title: "Prepare API Documentation",
    description: "Document the APIs used by the application.",
    project: "ERP Development",
    priority: "Medium",
    status: "In Progress",
    dueDate: "15 Sep 2026",
    assignedBy: "Amit Patel",
  },
  {
    id: 4,
    title: "Test User Registration",
    description: "Perform functional testing of user registration.",
    project: "Security Audit",
    priority: "Medium",
    status: "Completed",
    dueDate: "06 Sep 2026",
    assignedBy: "Neha Joshi",
  },
  {
    id: 5,
    title: "Create Product Cards",
    description: "Develop reusable product cards for the e-commerce page.",
    project: "E-Commerce Platform",
    priority: "Low",
    status: "Pending",
    dueDate: "18 Sep 2026",
    assignedBy: "Karan Shah",
  },
  {
    id: 6,
    title: "Fix Responsive Issues",
    description: "Check and fix responsive layout issues on mobile devices.",
    project: "Website Redesign",
    priority: "Medium",
    status: "Completed",
    dueDate: "05 Sep 2026",
    assignedBy: "Rahul Mehta",
  },
];

function EmployeeTasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.project.toLowerCase().includes(searchText) ||
        task.assignedBy.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

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

  const markAsCompleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "Completed",
            }
          : task
      )
    );

    setSelectedTask((currentTask) =>
      currentTask && currentTask.id === taskId
        ? {
            ...currentTask,
            status: "Completed",
          }
        : currentTask
    );
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
              Employee Tasks
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
            My Tasks
          </h2>

          <p className="text-gray-600 mt-2">
            View your assigned tasks and keep track of your work.
          </p>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">
              Total Tasks
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalTasks}
            </h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">
              Pending
            </p>

            <h3 className="text-3xl font-bold text-[#9A6817] mt-2">
              {pendingTasks}
            </h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">
              In Progress
            </p>

            <h3 className="text-3xl font-bold text-[#1D546D] mt-2">
              {inProgressTasks}
            </h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">
              Completed
            </p>

            <h3 className="text-3xl font-bold text-[#26734D] mt-2">
              {completedTasks}
            </h3>
          </div>
        </div>

        {/* ================= SEARCH + FILTER ================= */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Search Tasks
              </label>

              <input
                type="text"
                placeholder="Search task, project or manager..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Priority
              </label>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= TASK LIST ================= */}

        {filteredTasks.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">📋</div>

            <h3 className="text-xl font-bold text-[#061E29]">
              No Tasks Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  {/* Task Info */}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E7F0F1] flex items-center justify-center text-lg">
                        📋
                      </div>

                      <h3 className="text-lg font-bold text-[#061E29]">
                        {task.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mt-3">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-500">
                      <span>
                        📁 {task.project}
                      </span>

                      <span>
                        👤 {task.assignedBy}
                      </span>

                      <span>
                        📅 Due: {task.dueDate}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="flex gap-2 lg:flex-col xl:flex-row">
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="px-4 py-2.5 rounded-lg bg-[#E7F0F1] text-[#1D546D] border border-[#B8C9CB] hover:bg-[#1D546D] hover:text-white font-semibold transition whitespace-nowrap"
                    >
                      👁 View
                    </button>

                    {task.status !== "Completed" && (
                      <button
                        onClick={() => markAsCompleted(task.id)}
                        className="px-4 py-2.5 rounded-lg bg-[#E8F4EE] text-[#26734D] border border-[#B7D8C5] hover:bg-[#26734D] hover:text-white font-semibold transition whitespace-nowrap"
                      >
                        ✓ Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= VIEW MODAL ================= */}

      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            {/* Modal Header */}

            <div className="bg-[#061E29] text-white px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[#B8C9CB] text-sm">
                  Task Details
                </p>

                <h3 className="text-xl font-bold mt-1">
                  {selectedTask.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedTask(null)}
                className="text-white text-2xl hover:text-[#B8C9CB]"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}

            <div className="p-6">
              <p className="text-gray-600 leading-relaxed">
                {selectedTask.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#F3F4F4] rounded-lg p-4">
                  <p className="text-xs text-gray-500">
                    Project
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedTask.project}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-lg p-4">
                  <p className="text-xs text-gray-500">
                    Priority
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedTask.priority}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-lg p-4">
                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedTask.status}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-lg p-4">
                  <p className="text-xs text-gray-500">
                    Due Date
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedTask.dueDate}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-lg p-4 col-span-2">
                  <p className="text-xs text-gray-500">
                    Assigned By
                  </p>

                  <p className="font-semibold mt-1">
                    {selectedTask.assignedBy}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-7">
                {selectedTask.status !== "Completed" && (
                  <button
                    onClick={() =>
                      markAsCompleted(selectedTask.id)
                    }
                    className="bg-[#26734D] hover:bg-[#1F6040] text-white px-5 py-2.5 rounded-lg font-semibold transition"
                  >
                    ✓ Mark Completed
                  </button>
                )}

                <button
                  onClick={() => setSelectedTask(null)}
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

export default EmployeeTasks;