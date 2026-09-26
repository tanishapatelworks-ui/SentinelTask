import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // API
  // =====================================================

  const PROJECTS_API = "http://localhost:5000/api/projects";
  const TASKS_API = "http://localhost:5000/api/tasks";

  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwt")
    );
  };

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        if (!token) {
          throw new Error("Authentication token not found. Please login again.");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [projectsResponse, tasksResponse] = await Promise.all([
          fetch(PROJECTS_API, {
            method: "GET",
            headers,
          }),
          fetch(TASKS_API, {
            method: "GET",
            headers,
          }),
        ]);

        const projectsData = await projectsResponse.json();
        const tasksData = await tasksResponse.json();

        if (!projectsResponse.ok) {
          throw new Error(
            projectsData.message || "Unable to fetch projects"
          );
        }

        if (!tasksResponse.ok) {
          throw new Error(
            tasksData.message || "Unable to fetch tasks"
          );
        }

        setProjects(
          Array.isArray(projectsData.projects)
            ? projectsData.projects
            : []
        );

        setTasks(
          Array.isArray(tasksData.tasks)
            ? tasksData.tasks
            : []
        );
      } catch (err) {
        console.error("DASHBOARD DATA ERROR:", err);
        setError(err.message || "Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =====================================================
  // BASIC COUNTS
  // =====================================================

  const totalProjects = projects.length;

  const planningProjects = projects.filter(
    (project) => project.status === "Planning"
  ).length;

  const activeProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const onHoldProjects = projects.filter(
    (project) => project.status === "On Hold"
  ).length;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  // =====================================================
  // OVERDUE TASKS
  // =====================================================

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    if (task.status === "completed") return false;

    const dueDate = new Date(task.dueDate);

    return dueDate < today;
  }).length;

  // =====================================================
  // COMPLETION RATE
  // =====================================================

  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  // =====================================================
  // TEAM MEMBERS
  // =====================================================

  const teamMemberMap = new Map();

  projects.forEach((project) => {
    if (Array.isArray(project.teamMembers)) {
      project.teamMembers.forEach((member) => {
        if (member?._id) {
          teamMemberMap.set(member._id, member);
        }
      });
    }

    if (project.createdBy?._id) {
      teamMemberMap.set(project.createdBy._id, project.createdBy);
    }
  });

  tasks.forEach((task) => {
    if (task.assignedTo?._id) {
      teamMemberMap.set(task.assignedTo._id, task.assignedTo);
    }

    if (task.createdBy?._id) {
      teamMemberMap.set(task.createdBy._id, task.createdBy);
    }
  });

  const teamMembersCount = teamMemberMap.size;

  // =====================================================
  // PROJECT STATUS CHART
  // =====================================================

  const projectStatusData = [
    {
      name: "Planning",
      projects: planningProjects,
    },
    {
      name: "In Progress",
      projects: activeProjects,
    },
    {
      name: "Completed",
      projects: completedProjects,
    },
    {
      name: "On Hold",
      projects: onHoldProjects,
    },
  ];

  // =====================================================
  // TASK STATUS CHART
  // =====================================================

  const taskStatusData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "In Progress",
      value: inProgressTasks,
    },
    {
      name: "Todo",
      value: todoTasks,
    },
  ];

  // =====================================================
  // TASK PRIORITY
  // =====================================================

  const lowPriorityTasks = tasks.filter(
    (task) => task.priority === "low"
  ).length;

  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "medium"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;

  const priorityData = [
    {
      name: "Low",
      tasks: lowPriorityTasks,
    },
    {
      name: "Medium",
      tasks: mediumPriorityTasks,
    },
    {
      name: "High",
      tasks: highPriorityTasks,
    },
  ];

  // =====================================================
  // PROJECT PROGRESS
  // Based on completed tasks / total tasks
  // =====================================================

  const projectProgress = useMemo(() => {
    return projects
      .map((project) => {
        const projectId = project._id?.toString();

        const projectTasks = tasks.filter((task) => {
          const taskProjectId =
            typeof task.project === "object"
              ? task.project?._id?.toString()
              : task.project?.toString();

          return taskProjectId === projectId;
        });

        const totalProjectTasks = projectTasks.length;

        const completedProjectTasks = projectTasks.filter(
          (task) => task.status === "completed"
        ).length;

        const progress =
          totalProjectTasks > 0
            ? Math.round(
                (completedProjectTasks / totalProjectTasks) * 100
              )
            : project.status === "Completed"
            ? 100
            : 0;

        return {
          id: project._id,
          name: project.name,
          progress,
          status: project.status,
          totalTasks: totalProjectTasks,
          completedTasks: completedProjectTasks,
        };
      })
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 6);
  }, [projects, tasks]);

  // =====================================================
  // TEAM WORKLOAD
  // =====================================================

  const teamWorkload = useMemo(() => {
    const workloadMap = new Map();

    tasks.forEach((task) => {
      if (!task.assignedTo) return;

      const memberId =
        typeof task.assignedTo === "object"
          ? task.assignedTo?._id
          : task.assignedTo;

      if (!memberId) return;

      const memberName =
        typeof task.assignedTo === "object"
          ? task.assignedTo?.name || "Unknown User"
          : "Assigned User";

      if (!workloadMap.has(memberId)) {
        workloadMap.set(memberId, {
          name: memberName,
          assigned: 0,
          completed: 0,
        });
      }

      const member = workloadMap.get(memberId);

      member.assigned += 1;

      if (task.status === "completed") {
        member.completed += 1;
      }
    });

    return Array.from(workloadMap.values())
      .sort((a, b) => b.assigned - a.assigned)
      .slice(0, 6);
  }, [tasks]);

  // =====================================================
  // MONTHLY TASK TREND
  // =====================================================

  const taskTrendData = useMemo(() => {
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();

      date.setMonth(date.getMonth() - i);

      months.push({
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        month: date.toLocaleString("en-US", {
          month: "short",
        }),
        created: 0,
        completed: 0,
      });
    }

    tasks.forEach((task) => {
      if (!task.createdAt) return;

      const createdDate = new Date(task.createdAt);

      const matchingMonth = months.find(
        (item) =>
          item.year === createdDate.getFullYear() &&
          item.monthIndex === createdDate.getMonth()
      );

      if (matchingMonth) {
        matchingMonth.created += 1;

        if (task.status === "completed") {
          matchingMonth.completed += 1;
        }
      }
    });

    return months;
  }, [tasks]);

  // =====================================================
  // RECENT PROJECTS
  // =====================================================

  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  // =====================================================
  // RECENT TASKS
  // =====================================================

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  // =====================================================
  // PIE COLORS
  // =====================================================

  const pieColors = [
    "#1D546D",
    "#5F9598",
    "#061E29",
  ];

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#5F9598] border-t-[#061E29] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-[#061E29] font-medium">
            Loading dashboard data...
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Fetching projects and tasks from MongoDB
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR STATE
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#F3F4F4] p-6 lg:p-8">

        <div className="max-w-2xl mx-auto mt-20 bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">

          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-2xl font-bold mx-auto">
            !
          </div>

          <h2 className="text-xl font-bold text-[#061E29] mt-5">
            Unable to Load Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            {error}
          </p>

          <div className="flex justify-center gap-3 mt-6">

            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-[#1D546D] text-white font-medium hover:bg-[#123B4D] transition"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-[#061E29] font-medium hover:bg-gray-50 transition"
            >
              Login Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="p-6 lg:p-8 bg-[#F3F4F4] min-h-screen">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <p className="text-sm text-[#5F9598] font-medium">
              Admin Workspace
            </p>

            <h1 className="text-3xl font-bold text-[#061E29] mt-1">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back, {user?.name || "Admin"}. Here's your
              workspace performance overview.
            </p>

          </div>

          <button
            onClick={() => navigate("/projects")}
            className="px-5 py-3 rounded-xl bg-[#1D546D] text-white font-medium hover:bg-[#123B4D] transition"
          >
            + Create Project
          </button>

        </div>

      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {[
          {
            title: "Total Projects",
            value: totalProjects,
            change: `${planningProjects} planning`,
            icon: "▣",
          },
          {
            title: "Active Projects",
            value: activeProjects,
            change:
              totalProjects > 0
                ? `${Math.round(
                    (activeProjects / totalProjects) * 100
                  )}% of total`
                : "0% of total",
            icon: "◉",
          },
          {
            title: "Total Tasks",
            value: totalTasks,
            change: `${inProgressTasks} in progress`,
            icon: "✓",
          },
          {
            title: "Completed Tasks",
            value: completedTasks,
            change: `${completionRate}% completion`,
            icon: "✓",
          },
          {
            title: "Pending Tasks",
            value: todoTasks,
            change:
              totalTasks > 0
                ? `${Math.round(
                    (todoTasks / totalTasks) * 100
                  )}% remaining`
                : "0% remaining",
            icon: "◷",
          },
          {
            title: "Overdue Tasks",
            value: overdueTasks,
            change:
              overdueTasks > 0
                ? "Needs attention"
                : "No overdue tasks",
            icon: "!",
          },
          {
            title: "Team Members",
            value: teamMembersCount,
            change: "Active workspace members",
            icon: "♧",
          },
          {
            title: "Completion Rate",
            value: `${completionRate}%`,
            change: "Based on completed tasks",
            icon: "%",
          },
        ].map((stat) => (

          <div
            key={stat.title}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold text-[#061E29] mt-2">
                  {stat.value}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-[#E5EFF1] flex items-center justify-center text-[#1D546D] text-xl font-bold">
                {stat.icon}
              </div>

            </div>

            <p className="text-xs text-[#1D546D] mt-4 font-medium">
              {stat.change}
            </p>

          </div>

        ))}

      </div>

      {/* =====================================================
          CHART ROW 1
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        {/* PROJECT STATUS */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-lg font-semibold text-[#061E29]">
              Project Status Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Current distribution of all projects
            </p>

          </div>

          <div className="p-6">

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={projectStatusData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="projects"
                  name="Projects"
                  fill="#1D546D"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* TASK STATUS */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-lg font-semibold text-[#061E29]">
              Task Status Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Overall task completion distribution
            </p>

          </div>

          <div className="p-6 flex items-center justify-center">

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                >

                  {taskStatusData.map((entry, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* =====================================================
          TASK TREND
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">

        <div className="p-6 border-b border-gray-200">

          <h2 className="text-lg font-semibold text-[#061E29]">
            Task Performance Trend
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Tasks created versus completed over the last 6 months
          </p>

        </div>

        <div className="p-6">

          <ResponsiveContainer width="100%" height={330}>

            <LineChart data={taskTrendData}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="created"
                name="Created Tasks"
                stroke="#5F9598"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="completed"
                name="Completed Tasks"
                stroke="#061E29"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* =====================================================
          PRIORITY + PROJECT PROGRESS
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        {/* PRIORITY ANALYSIS */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-lg font-semibold text-[#061E29]">
              Task Priority Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Distribution of tasks by priority
            </p>

          </div>

          <div className="p-6">

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={priorityData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="tasks"
                  name="Tasks"
                  fill="#5F9598"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* PROJECT PROGRESS */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="p-6 border-b border-gray-200 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-[#061E29]">
                Project Progress
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Progress calculated from project tasks
              </p>

            </div>

            <button
              onClick={() => navigate("/projects")}
              className="text-sm font-medium text-[#1D546D] hover:underline"
            >
              View All
            </button>

          </div>

          <div className="p-6 space-y-6">

            {projectProgress.length === 0 ? (

              <div className="text-center py-10 text-gray-500">
                No projects available.
              </div>

            ) : (

              projectProgress.map((project) => (

                <div key={project.id}>

                  <div className="flex justify-between items-start gap-3 mb-2">

                    <div className="min-w-0">

                      <h3 className="text-sm font-semibold text-[#061E29] truncate">
                        {project.name}
                      </h3>

                      <span
                        className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          project.status === "Planning"
                            ? "bg-yellow-100 text-yellow-700"
                            : project.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : project.status === "On Hold"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-[#E5EFF1] text-[#1D546D]"
                        }`}
                      >
                        {project.status}
                      </span>

                    </div>

                    <span className="text-sm font-semibold text-[#1D546D]">
                      {project.progress}%
                    </span>

                  </div>

                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-[#1D546D] rounded-full transition-all"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />

                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    {project.completedTasks} of {project.totalTasks} tasks
                    completed
                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          TEAM WORKLOAD
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">

        <div className="p-6 border-b border-gray-200">

          <h2 className="text-lg font-semibold text-[#061E29]">
            Team Workload
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Assigned and completed tasks by team member
          </p>

        </div>

        <div className="p-6">

          {teamWorkload.length === 0 ? (

            <div className="text-center py-10 text-gray-500">
              No assigned tasks available.
            </div>

          ) : (

            <ResponsiveContainer width="100%" height={320}>

              <BarChart
                data={teamWorkload}
                layout="vertical"
                margin={{
                  left: 20,
                  right: 20,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  allowDecimals={false}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="assigned"
                  name="Assigned"
                  fill="#5F9598"
                  radius={[0, 6, 6, 0]}
                />

                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#1D546D"
                  radius={[0, 6, 6, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>

      {/* =====================================================
          ATTENTION / REPORTS
      ===================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* OVERDUE */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg">
              !
            </div>

            <div>

              <p className="text-sm text-gray-500">
                Overdue Tasks
              </p>

              <h3 className="text-2xl font-bold text-[#061E29]">
                {overdueTasks}
              </h3>

            </div>

          </div>

          <p className="text-sm text-red-600 mt-4 font-medium">
            {overdueTasks > 0
              ? "Requires attention"
              : "Everything is on schedule"}
          </p>

        </div>

        {/* PENDING */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold text-lg">
              ◷
            </div>

            <div>

              <p className="text-sm text-gray-500">
                Pending Tasks
              </p>

              <h3 className="text-2xl font-bold text-[#061E29]">
                {todoTasks}
              </h3>

            </div>

          </div>

          <p className="text-sm text-yellow-600 mt-4 font-medium">
            Tasks waiting for completion
          </p>

        </div>

        {/* COMPLETION */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-[#E5EFF1] text-[#1D546D] flex items-center justify-center font-bold text-lg">
              ✓
            </div>

            <div>

              <p className="text-sm text-gray-500">
                Completion Rate
              </p>

              <h3 className="text-2xl font-bold text-[#061E29]">
                {completionRate}%
              </h3>

            </div>

          </div>

          <p className="text-sm text-[#1D546D] mt-4 font-medium">
            Overall task completion
          </p>

        </div>

      </div>

      {/* =====================================================
          RECENT PROJECTS + RECENT TASKS
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        {/* RECENT PROJECTS */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="p-6 border-b border-gray-200 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-[#061E29]">
                Recent Projects
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest projects created
              </p>

            </div>

            <button
              onClick={() => navigate("/projects")}
              className="text-sm font-medium text-[#1D546D] hover:underline"
            >
              View All
            </button>

          </div>

          <div className="divide-y divide-gray-100">

            {recentProjects.length === 0 ? (

              <div className="p-6 text-center text-gray-500">
                No projects found.
              </div>

            ) : (

              recentProjects.map((project) => (

                <div
                  key={project._id}
                  className="p-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition"
                >

                  <div className="min-w-0">

                    <h3 className="text-sm font-semibold text-[#061E29] truncate">
                      {project.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Created by{" "}
                      {project.createdBy?.name || "Unknown"}
                    </p>

                  </div>

                  <span
                    className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : project.status === "On Hold"
                        ? "bg-gray-100 text-gray-700"
                        : project.status === "Planning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-[#E5EFF1] text-[#1D546D]"
                    }`}
                  >
                    {project.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

        {/* RECENT TASKS */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <div className="p-6 border-b border-gray-200 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-[#061E29]">
                Recent Tasks
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest tasks added to the workspace
              </p>

            </div>

            <button
              onClick={() => navigate("/tasks")}
              className="text-sm font-medium text-[#1D546D] hover:underline"
            >
              View All
            </button>

          </div>

          <div className="divide-y divide-gray-100">

            {recentTasks.length === 0 ? (

              <div className="p-6 text-center text-gray-500">
                No tasks found.
              </div>

            ) : (

              recentTasks.map((task) => (

                <div
                  key={task._id}
                  className="p-5 hover:bg-gray-50 transition"
                >

                  <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0">

                      <h3 className="text-sm font-semibold text-[#061E29] truncate">
                        {task.title}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        {task.project?.name || "No project"} •{" "}
                        {task.assignedTo?.name || "Unassigned"}
                      </p>

                    </div>

                    <span
                      className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "in-progress"
                          ? "bg-[#E5EFF1] text-[#1D546D]"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status === "completed"
                        ? "Completed"
                        : task.status === "in-progress"
                        ? "In Progress"
                        : "Todo"}
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div>

        <div className="bg-[#061E29] rounded-2xl p-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <h2 className="text-lg font-semibold text-white">
                Quick Actions
              </h2>

              <p className="text-sm text-[#B8C9CB] mt-1">
                Manage your SentinelTask workspace quickly.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => navigate("/projects")}
                className="px-4 py-2.5 rounded-xl bg-[#1D546D] text-white text-sm font-medium hover:bg-[#285F77] transition"
              >
                Projects
              </button>

              <button
                onClick={() => navigate("/tasks")}
                className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition"
              >
                Tasks
              </button>

              <button
                onClick={() => navigate("/team")}
                className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition"
              >
                Team
              </button>

              <button
                onClick={() => navigate("/reports")}
                className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition"
              >
                Reports
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;