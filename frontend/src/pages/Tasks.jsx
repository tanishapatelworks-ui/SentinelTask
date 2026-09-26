
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api/tasks";
const PROJECT_API_URL = "http://localhost:5000/api/projects";
const EMPLOYEE_API_URL = "http://localhost:5000/api/users/employees";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const emptyTask = {
    title: "",
    description: "",
    project: "",
    assignee: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  };

  const [newTask, setNewTask] = useState(emptyTask);

  // ======================================================
  // GET TOKEN
  // ======================================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwt")
    );
  };

  // ======================================================
  // STATUS LABEL
  // ======================================================

  const getStatusLabel = (status) => {
    switch (status) {
      case "todo":
        return "To Do";

      case "in-progress":
        return "In Progress";

      case "completed":
        return "Completed";

      default:
        return status || "To Do";
    }
  };

  // ======================================================
  // PRIORITY LABEL
  // ======================================================

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "High";

      case "medium":
        return "Medium";

      case "low":
        return "Low";

      default:
        return priority || "Medium";
    }
  };

  // ======================================================
  // PROJECT NAME
  // ======================================================

  const getProjectName = (task) => {
    if (task.project && typeof task.project === "object") {
      return task.project.name || "Unknown Project";
    }

    return "Unknown Project";
  };

  // ======================================================
  // ASSIGNEE NAME
  // ======================================================

  const getAssigneeName = (task) => {
    if (
      task.assignedTo &&
      typeof task.assignedTo === "object"
    ) {
      return task.assignedTo.name || "Unassigned";
    }

    return "Unassigned";
  };

  // ======================================================
  // FETCH TASKS
  // ======================================================

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch tasks"
        );
      }

      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Fetch tasks error:", error);

      setError(
        error.message || "Unable to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // FETCH PROJECTS
  // ======================================================

  const fetchProjects = async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await fetch(PROJECT_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch projects"
        );
      }

      setProjects(data.projects || []);
    } catch (error) {
      console.error(
        "Fetch projects error:",
        error
      );
    }
  };

  // ======================================================
  // FETCH EMPLOYEES
  // ======================================================

  const fetchEmployees = async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await fetch(
        EMPLOYEE_API_URL,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch employees"
        );
      }

      setEmployees(data.employees || []);
    } catch (error) {
      console.error(
        "Fetch employees error:",
        error
      );
    }
  };

  // ======================================================
  // LOAD DATA
  // ======================================================

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchEmployees();
  }, []);

  // ======================================================
  // CREATE TASK
  // ======================================================

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      alert("Please enter task title.");
      return;
    }

    if (!newTask.project) {
      alert("Please select a project.");
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const requestBody = {
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        status: newTask.status,
        priority: newTask.priority,
        dueDate: newTask.dueDate || undefined,
        project: newTask.project,
      };

      // Add employee ID only if selected
      if (newTask.assignee) {
        requestBody.assignedTo =
          newTask.assignee;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create task"
        );
      }

      setTasks((prev) => [
        data.task,
        ...prev,
      ]);

      closeModal();
    } catch (error) {
      console.error(
        "Create task error:",
        error
      );

      alert(
        error.message ||
          "Unable to create task."
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // EDIT TASK
  // ======================================================

  const handleEdit = (task) => {
    setEditingTask(task);

    setNewTask({
      title: task.title || "",

      description:
        task.description || "",

      project:
        typeof task.project === "object"
          ? task.project?._id || ""
          : task.project || "",

      assignee:
        typeof task.assignedTo === "object"
          ? task.assignedTo?._id || ""
          : task.assignedTo || "",

      priority:
        task.priority || "medium",

      status:
        task.status || "todo",

      dueDate: task.dueDate
        ? task.dueDate.substring(0, 10)
        : "",
    });

    setShowModal(true);
  };

  // ======================================================
  // UPDATE TASK
  // ======================================================

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      alert("Please enter task title.");
      return;
    }

    if (!newTask.project) {
      alert("Please select a project.");
      return;
    }

    if (!editingTask?._id) {
      alert("Task ID not found.");
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const requestBody = {
        title: newTask.title.trim(),

        description:
          newTask.description.trim(),

        status: newTask.status,

        priority: newTask.priority,

        dueDate:
          newTask.dueDate || undefined,

        project: newTask.project,

        assignedTo:
          newTask.assignee || null,
      };

      const response = await fetch(
        `${API_URL}/${editingTask._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update task"
        );
      }

      setTasks((prev) =>
        prev.map((task) =>
          task._id === editingTask._id
            ? data.task
            : task
        )
      );

      setShowDetails(data.task);

      closeModal();
    } catch (error) {
      console.error(
        "Update task error:",
        error
      );

      alert(
        error.message ||
          "Unable to update task."
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // DELETE TASK
  // ======================================================

  const handleDelete = async (id) => {
    const task = tasks.find(
      (item) => item._id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete "${task?.title}"?`
    );

    if (!confirmed) return;

    try {
      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete task"
        );
      }

      setTasks((prev) =>
        prev.filter(
          (task) => task._id !== id
        )
      );

      if (
        showDetails?._id === id
      ) {
        setShowDetails(null);
      }
    } catch (error) {
      console.error(
        "Delete task error:",
        error
      );

      alert(
        error.message ||
          "Unable to delete task."
      );
    }
  };

  // ======================================================
  // VIEW TASK
  // ======================================================

  const handleView = async (task) => {
    try {
      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/${task._id}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch task"
        );
      }

      setShowDetails(data.task);
    } catch (error) {
      console.error(
        "View task error:",
        error
      );

      alert(
        error.message ||
          "Unable to load task."
      );
    }
  };

  // ======================================================
  // CLOSE MODAL
  // ======================================================

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setNewTask(emptyTask);
  };

  // ======================================================
  // FILTER TASKS
  // ======================================================

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText =
        search.toLowerCase();

      const projectName =
        getProjectName(task).toLowerCase();

      const assigneeName =
        getAssigneeName(task).toLowerCase();

      const title =
        (task.title || "").toLowerCase();

      const matchesSearch =
        title.includes(searchText) ||
        projectName.includes(searchText) ||
        assigneeName.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority ===
          priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
  ]);

  // ======================================================
  // STATUS STYLE
  // ======================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-[#061E29] text-white";

      case "in-progress":
        return "bg-[#5F9598]/10 text-[#24575B]";

      case "todo":
        return "bg-[#1D546D]/10 text-[#1D546D]";

      default:
        return "bg-[#F3F4F4] text-[#5F9598]";
    }
  };

  // ======================================================
  // PRIORITY STYLE
  // ======================================================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-600";

      case "medium":
        return "bg-amber-50 text-amber-600";

      case "low":
        return "bg-emerald-50 text-emerald-600";

      default:
        return "bg-[#F3F4F4] text-[#5F9598]";
    }
  };

  // ======================================================
  // COUNTS
  // ======================================================

  const totalTasks = tasks.length;

  const toDoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status === "in-progress"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "completed"
    ).length;

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F4]">
        <div className="bg-[#061E29] px-6 lg:px-8 py-7">
          <p className="text-xs uppercase tracking-[0.15em] text-[#5F9598] mb-2">
            Task Management
          </p>

          <h1 className="text-2xl lg:text-3xl font-semibold text-white">
            Tasks
          </h1>

          <p className="text-sm text-[#B8C9CB] mt-2">
            Create, assign and track tasks
            across your projects.
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#D9E1E2] border-t-[#1D546D] rounded-full animate-spin mx-auto" />

            <p className="text-sm text-[#5F9598] mt-4">
              Loading tasks...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ======================================================
  // MAIN UI
  // ======================================================

  return (
    <div className="min-h-full bg-[#F3F4F4]">

      {/* HEADER */}
      <div className="bg-[#061E29] px-6 lg:px-8 py-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#5F9598] mb-2">
              Task Management
            </p>

            <h1 className="text-2xl lg:text-3xl font-semibold text-white">
              Tasks
            </h1>

            <p className="text-sm text-[#B8C9CB] mt-2">
              Create, assign and track tasks
              across your projects.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingTask(null);
              setNewTask(emptyTask);
              setShowModal(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1D546D] text-white text-sm font-semibold hover:bg-[#286B86] transition shadow-lg"
          >
            <span className="text-xl leading-none">
              +
            </span>

            New Task
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8">

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#5F9598]">
                  Total Tasks
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-2">
                  {totalTasks}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#1D546D]/10 flex items-center justify-center text-[#1D546D] text-xl">
                ✓
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#5F9598]">
                  To Do
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-2">
                  {toDoTasks}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#1D546D]/10 flex items-center justify-center text-[#1D546D] text-xl">
                ○
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#5F9598]">
                  In Progress
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-2">
                  {inProgressTasks}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#5F9598]/10 flex items-center justify-center text-[#5F9598] text-xl">
                ◐
              </div>
            </div>
          </div>

          <div className="bg-[#061E29] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#5F9598]">
                  Completed
                </p>

                <h3 className="text-3xl font-bold text-white mt-2">
                  {completedTasks}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#1D546D] flex items-center justify-center text-white text-xl">
                ✓
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6 shadow-sm">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5F9598]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search tasks, projects or employees..."
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-[#D9E1E2] outline-none text-sm text-[#061E29] placeholder:text-gray-400 focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="lg:w-48 h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-sm text-[#061E29] outline-none focus:border-[#1D546D]"
            >
              <option value="All">
                All Status
              </option>

              <option value="todo">
                To Do
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(
                  e.target.value
                )
              }
              className="lg:w-48 h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-sm text-[#061E29] outline-none focus:border-[#1D546D]"
            >
              <option value="All">
                All Priority
              </option>

              <option value="high">
                High
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="low">
                Low
              </option>
            </select>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="bg-white rounded-2xl border border-[#D9E1E2] shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-[#D9E1E2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>
              <h2 className="text-lg font-semibold text-[#061E29]">
                All Tasks
              </h2>

              <p className="text-xs text-[#5F9598] mt-1">
                View and manage your current tasks
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-[#F3F4F4] text-xs font-semibold text-[#1D546D]">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1
                ? "Task"
                : "Tasks"}
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="p-5 lg:p-6 grid grid-cols-1 xl:grid-cols-2 gap-5">

              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="rounded-2xl border border-[#D9E1E2] bg-[#FAFBFB] p-5 hover:border-[#5F9598] hover:shadow-md transition-all"
                >

                  {/* TASK HEADER */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-start gap-3 min-w-0">

                      <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#061E29] flex items-center justify-center text-white font-bold">
                        {(task.title || "T")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">

                        <h3 className="font-semibold text-[#061E29] text-base">
                          {task.title}
                        </h3>

                        <p className="text-xs text-[#5F9598] mt-1">
                          Project:{" "}
                          <span className="font-medium text-[#061E29]">
                            {getProjectName(
                              task
                            )}
                          </span>
                        </p>

                      </div>
                    </div>

                    <span
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
                        task.status
                      )}`}
                    >
                      {getStatusLabel(
                        task.status
                      )}
                    </span>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-[#5F9598] mt-4 line-clamp-2">
                    {task.description ||
                      "No description available."}
                  </p>

                  {/* DETAILS */}
                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <div className="rounded-xl bg-white border border-[#D9E1E2] p-3">

                      <p className="text-xs text-[#5F9598]">
                        Assigned To
                      </p>

                      <p className="text-sm font-semibold text-[#061E29] mt-1 truncate">
                        {getAssigneeName(
                          task
                        )}
                      </p>

                    </div>

                    <div className="rounded-xl bg-white border border-[#D9E1E2] p-3">

                      <p className="text-xs text-[#5F9598]">
                        Priority
                      </p>

                      <span
                        className={`inline-block mt-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${getPriorityStyle(
                          task.priority
                        )}`}
                      >
                        {getPriorityLabel(
                          task.priority
                        )}
                      </span>

                    </div>

                    <div className="rounded-xl bg-white border border-[#D9E1E2] p-3">

                      <p className="text-xs text-[#5F9598]">
                        Due Date
                      </p>

                      <p className="text-sm font-semibold text-[#061E29] mt-1">
                        {task.dueDate
                          ? new Date(
                              task.dueDate
                            ).toLocaleDateString()
                          : "Not Set"}
                      </p>

                    </div>

                    <div className="rounded-xl bg-white border border-[#D9E1E2] p-3">

                      <p className="text-xs text-[#5F9598]">
                        Status
                      </p>

                      <p className="text-sm font-semibold text-[#061E29] mt-1">
                        {getStatusLabel(
                          task.status
                        )}
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#D9E1E2]">

                    <button
                      onClick={() =>
                        handleView(task)
                      }
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#061E29] text-white text-xs font-semibold hover:bg-[#1D546D] transition"
                    >
                      <span>◉</span>
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleEdit(task)
                      }
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#1D546D]/10 text-[#1D546D] text-xs font-semibold hover:bg-[#1D546D] hover:text-white transition"
                    >
                      <span>✎</span>
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          task._id
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#F3F4F4] text-[#061E29] text-xs font-semibold border border-[#D9E1E2] hover:bg-[#061E29] hover:text-white transition"
                    >
                      <span>⌫</span>
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <div className="p-14 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#061E29] flex items-center justify-center text-white text-2xl">
                ✓
              </div>

              <h3 className="font-semibold text-[#061E29] mt-4">
                No Tasks Found
              </h3>

              <p className="text-sm text-[#5F9598] mt-2">
                Try changing your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setPriorityFilter("All");
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#1D546D] text-white text-sm font-semibold hover:bg-[#061E29] transition"
              >
                Clear Filters
              </button>

            </div>
          )}

        </div>
      </div>

      {/* ==================================================
          CREATE / EDIT MODAL
      ================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#061E29]/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-[#5F9598]">
                  Task Management
                </p>

                <h3 className="text-xl font-semibold text-white mt-1">
                  {editingTask
                    ? "Edit Task"
                    : "Create New Task"}
                </h3>
              </div>

              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-lg bg-white/10 text-[#B8C9CB] hover:bg-white/20 hover:text-white transition"
              >
                ✕
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={
                editingTask
                  ? handleUpdateTask
                  : handleCreateTask
              }
              className="p-6 space-y-5"
            >

              {/* TITLE */}
              <div>

                <label className="block text-sm font-semibold text-[#061E29] mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter task title"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] outline-none text-sm text-[#061E29] placeholder:text-gray-400 focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
                />

              </div>

              {/* DESCRIPTION */}
              <div>

                <label className="block text-sm font-semibold text-[#061E29] mb-2">
                  Description
                </label>

                <textarea
                  value={
                    newTask.description
                  }
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      description:
                        e.target.value,
                    })
                  }
                  placeholder="Enter task description"
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-[#D9E1E2] outline-none resize-none text-sm text-[#061E29] placeholder:text-gray-400 focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
                />

              </div>

              {/* PROJECT + EMPLOYEE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* PROJECT */}
                <div>

                  <label className="block text-sm font-semibold text-[#061E29] mb-2">
                    Project
                  </label>

                  <select
                    value={
                      newTask.project
                    }
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        project:
                          e.target.value,
                      })
                    }
                    required
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-sm text-[#061E29] outline-none focus:border-[#1D546D]"
                  >

                    <option value="">
                      Select Project
                    </option>

                    {projects.map(
                      (project) => (
                        <option
                          key={
                            project._id
                          }
                          value={
                            project._id
                          }
                        >
                          {project.name}
                        </option>
                      )
                    )}

                  </select>

                  {projects.length === 0 && (
                    <p className="text-xs text-red-500 mt-2">
                      No projects available.
                      Create a project first.
                    </p>
                  )}

                </div>

                {/* EMPLOYEE DROPDOWN */}
                <div>

                  <label className="block text-sm font-semibold text-[#061E29] mb-2">
                    Assign To
                  </label>

                  <select
                    value={
                      newTask.assignee
                    }
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        assignee:
                          e.target.value,
                      })
                    }
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-sm text-[#061E29] outline-none focus:border-[#1D546D]"
                  >

                    <option value="">
                      Unassigned
                    </option>

                    {employees.map(
                      (employee) => (
                        <option
                          key={
                            employee._id
                          }
                          value={
                            employee._id
                          }
                        >
                          {employee.name}
                        </option>
                      )
                    )}

                  </select>

                  {employees.length === 0 && (
                    <p className="text-xs text-[#5F9598] mt-2">
                      No employees available.
                    </p>
                  )}

                </div>

              </div>

              {/* PRIORITY + STATUS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm font-semibold text-[#061E29] mb-2">
                    Priority
                  </label>

                  <select
                    value={
                      newTask.priority
                    }
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        priority:
                          e.target.value,
                      })
                    }
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white outline-none text-sm text-[#061E29] focus:border-[#1D546D]"
                  >

                    <option value="low">
                      Low
                    </option>

                    <option value="medium">
                      Medium
                    </option>

                    <option value="high">
                      High
                    </option>

                  </select>

                </div>

                <div>

                  <label className="block text-sm font-semibold text-[#061E29] mb-2">
                    Status
                  </label>

                  <select
                    value={
                      newTask.status
                    }
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        status:
                          e.target.value,
                      })
                    }
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white outline-none text-sm text-[#061E29] focus:border-[#1D546D]"
                  >

                    <option value="todo">
                      To Do
                    </option>

                    <option value="in-progress">
                      In Progress
                    </option>

                    <option value="completed">
                      Completed
                    </option>

                  </select>

                </div>

              </div>

              {/* DUE DATE */}
              <div>

                <label className="block text-sm font-semibold text-[#061E29] mb-2">
                  Due Date
                </label>

                <input
                  type="date"
                  value={
                    newTask.dueDate
                  }
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      dueDate:
                        e.target.value,
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] outline-none text-sm text-[#061E29] focus:border-[#1D546D]"
                />

              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-3 border-t border-[#D9E1E2]">

                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#061E29] text-sm font-semibold hover:bg-[#F3F4F4] transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#1D546D] text-white text-sm font-semibold hover:bg-[#061E29] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving
                    ? "Saving..."
                    : editingTask
                    ? "Update Task"
                    : "Create Task"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ==================================================
          TASK DETAILS MODAL
      ================================================== */}

      {showDetails && (
        <div className="fixed inset-0 z-50 bg-[#061E29]/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-[#1D546D] flex items-center justify-center text-white font-bold text-lg">
                  {(showDetails.title ||
                    "T")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <p className="text-xs text-[#5F9598]">
                    Task Details
                  </p>

                  <h3 className="text-xl font-semibold text-white">
                    {showDetails.title}
                  </h3>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowDetails(null)
                }
                className="w-9 h-9 rounded-lg bg-white/10 text-[#B8C9CB] hover:bg-white/20 hover:text-white transition"
              >
                ✕
              </button>

            </div>

            {/* DETAILS */}
            <div className="p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-xs text-[#5F9598]">
                    Current Status
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
                      showDetails.status
                    )}`}
                  >
                    {getStatusLabel(
                      showDetails.status
                    )}
                  </span>

                </div>

                <div className="text-right">

                  <p className="text-xs text-[#5F9598]">
                    Priority
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${getPriorityStyle(
                      showDetails.priority
                    )}`}
                  >
                    {getPriorityLabel(
                      showDetails.priority
                    )}
                  </span>

                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="rounded-xl bg-[#F3F4F4] p-4 mb-5">

                <p className="text-xs text-[#5F9598] mb-2">
                  Description
                </p>

                <p className="text-sm text-[#061E29] leading-6">
                  {showDetails.description ||
                    "No description available."}
                </p>

              </div>

              {/* INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="border border-[#D9E1E2] rounded-xl p-4">

                  <p className="text-xs text-[#5F9598]">
                    Project
                  </p>

                  <p className="text-sm font-semibold text-[#061E29] mt-2">
                    {getProjectName(
                      showDetails
                    )}
                  </p>

                </div>

                <div className="border border-[#D9E1E2] rounded-xl p-4">

                  <p className="text-xs text-[#5F9598]">
                    Assigned To
                  </p>

                  <p className="text-sm font-semibold text-[#061E29] mt-2">
                    {getAssigneeName(
                      showDetails
                    )}
                  </p>

                </div>

                <div className="border border-[#D9E1E2] rounded-xl p-4">

                  <p className="text-xs text-[#5F9598]">
                    Priority
                  </p>

                  <p
                    className={`inline-block mt-2 px-2.5 py-1 rounded-lg text-xs font-semibold ${getPriorityStyle(
                      showDetails.priority
                    )}`}
                  >
                    {getPriorityLabel(
                      showDetails.priority
                    )}
                  </p>

                </div>

                <div className="border border-[#D9E1E2] rounded-xl p-4">

                  <p className="text-xs text-[#5F9598]">
                    Due Date
                  </p>

                  <p className="text-sm font-semibold text-[#061E29] mt-2">
                    {showDetails.dueDate
                      ? new Date(
                          showDetails.dueDate
                        ).toLocaleDateString()
                      : "Not Set"}
                  </p>

                </div>

              </div>

              {/* DETAIL BUTTONS */}
              <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#D9E1E2]">

                <button
                  onClick={() => {
                    setShowDetails(null);
                    handleEdit(
                      showDetails
                    );
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] text-white text-sm font-semibold hover:bg-[#061E29] transition"
                >
                  Edit Task
                </button>

                <button
                  onClick={() =>
                    setShowDetails(null)
                  }
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#061E29] text-sm font-semibold hover:bg-[#F3F4F4] transition"
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

export default Tasks;

