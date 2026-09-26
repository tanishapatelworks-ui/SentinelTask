import { useMemo, useState } from "react";

const projectReports = [
  {
    id: 1,
    project: "Website Redesign",
    manager: "Rahul Sharma",
    totalTasks: 24,
    completedTasks: 18,
    inProgressTasks: 4,
    pendingTasks: 2,
    progress: 75,
    status: "In Progress",
  },
  {
    id: 2,
    project: "Mobile Application",
    manager: "Priya Shah",
    totalTasks: 20,
    completedTasks: 11,
    inProgressTasks: 6,
    pendingTasks: 3,
    progress: 55,
    status: "In Progress",
  },
  {
    id: 3,
    project: "Marketing Campaign",
    manager: "Amit Patel",
    totalTasks: 30,
    completedTasks: 27,
    inProgressTasks: 2,
    pendingTasks: 1,
    progress: 90,
    status: "Almost Done",
  },
  {
    id: 4,
    project: "ERP Development",
    manager: "Neha Patel",
    totalTasks: 20,
    completedTasks: 7,
    inProgressTasks: 8,
    pendingTasks: 5,
    progress: 35,
    status: "In Progress",
  },
];

const teamReports = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Manager",
    assignedTasks: 18,
    completedTasks: 15,
    pendingTasks: 3,
    completionRate: 83,
  },
  {
    id: 2,
    name: "Priya Shah",
    role: "Manager",
    assignedTasks: 16,
    completedTasks: 12,
    pendingTasks: 4,
    completionRate: 75,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Employee",
    assignedTasks: 14,
    completedTasks: 12,
    pendingTasks: 2,
    completionRate: 86,
  },
  {
    id: 4,
    name: "Neha Patel",
    role: "Employee",
    assignedTasks: 20,
    completedTasks: 11,
    pendingTasks: 9,
    completionRate: 55,
  },
];

const Reports = () => {
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");

  const totalProjects = projectReports.length;

  const totalTasks = projectReports.reduce(
    (sum, project) => sum + project.totalTasks,
    0
  );

  const completedTasks = projectReports.reduce(
    (sum, project) => sum + project.completedTasks,
    0
  );

  const inProgressTasks = projectReports.reduce(
    (sum, project) => sum + project.inProgressTasks,
    0
  );

  const pendingTasks = projectReports.reduce(
    (sum, project) => sum + project.pendingTasks,
    0
  );

  const completionRate = Math.round(
    (completedTasks / totalTasks) * 100
  );

  const filteredProjects = useMemo(() => {
    return projectReports.filter((project) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        project.project.toLowerCase().includes(searchText) ||
        project.manager.toLowerCase().includes(searchText);

      const matchesProject =
        projectFilter === "All" ||
        project.project === projectFilter;

      return matchesSearch && matchesProject;
    });
  }, [search, projectFilter]);

  const getStatusClass = (status) => {
    if (status === "Almost Done") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "In Progress") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">
      {/* HEADER */}
      <div className="bg-[#1D546D] px-6 py-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#B8C9CB]">
              Workspace
            </p>

            <h1 className="mt-1 text-3xl font-bold text-white">
              Reports
            </h1>

            <p className="mt-1 text-sm text-[#D9E1E2]">
              View project, task and team performance reports.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="rounded-lg bg-[#061E29] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0A2A38]"
          >
            Print Report
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="px-6 py-8 lg:px-8">
        {/* SUMMARY */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#777177]">
              Total Projects
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#302D30]">
              {totalProjects}
            </h2>

            <p className="mt-1 text-xs text-[#777177]">
              Active projects
            </p>
          </div>

          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#777177]">
              Total Tasks
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#302D30]">
              {totalTasks}
            </h2>

            <p className="mt-1 text-xs text-[#777177]">
              Across all projects
            </p>
          </div>

          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#777177]">
              Completed
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {completedTasks}
            </h2>

            <p className="mt-1 text-xs text-[#777177]">
              Completed tasks
            </p>
          </div>

          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#777177]">
              In Progress
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {inProgressTasks}
            </h2>

            <p className="mt-1 text-xs text-[#777177]">
              Active tasks
            </p>
          </div>

          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#777177]">
              Completion Rate
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#1D546D]">
              {completionRate}%
            </h2>

            <p className="mt-1 text-xs text-[#777177]">
              Overall task completion
            </p>
          </div>
        </div>

        {/* TASK OVERVIEW */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#302D30]">
              Task Overview
            </h2>

            <p className="mt-1 text-sm text-[#777177]">
              Current task distribution
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-[#302D30]">
                    Completed
                  </span>

                  <span className="text-sm font-bold text-green-600">
                    {completedTasks}
                  </span>
                </div>

                <div className="h-2.5 rounded-full bg-[#D9E1E2]">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: `${(completedTasks / totalTasks) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-[#302D30]">
                    In Progress
                  </span>

                  <span className="text-sm font-bold text-yellow-600">
                    {inProgressTasks}
                  </span>
                </div>

                <div className="h-2.5 rounded-full bg-[#D9E1E2]">
                  <div
                    className="h-full rounded-full bg-yellow-500"
                    style={{
                      width: `${(inProgressTasks / totalTasks) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-[#302D30]">
                    Pending
                  </span>

                  <span className="text-sm font-bold text-red-600">
                    {pendingTasks}
                  </span>
                </div>

                <div className="h-2.5 rounded-full bg-[#D9E1E2]">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width: `${(pendingTasks / totalTasks) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* COMPLETION CARD */}
          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-[#302D30]">
              Overall Project Progress
            </h2>

            <p className="mt-1 text-sm text-[#777177]">
              Average progress across all projects
            </p>

            <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {projectReports.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl bg-[#F3F4F4] p-4"
                >
                  <p className="truncate text-xs text-[#777177]">
                    {project.project}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#1D546D]">
                    {project.progress}%
                  </p>

                  <div className="mt-3 h-2 rounded-full bg-[#D9E1E2]">
                    <div
                      className="h-full rounded-full bg-[#1D546D]"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILTER */}
        <div className="mt-8 rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-[#302D30]">
                Search Reports
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search project or manager..."
                className="w-full rounded-lg border border-[#D9E1E2] px-4 py-3 text-sm text-[#302D30] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
              />
            </div>

            <div className="w-full md:w-64">
              <label className="mb-2 block text-sm font-medium text-[#302D30]">
                Project
              </label>

              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="w-full rounded-lg border border-[#D9E1E2] bg-white px-4 py-3 text-sm text-[#302D30] outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Projects</option>

                {projectReports.map((project) => (
                  <option
                    key={project.id}
                    value={project.project}
                  >
                    {project.project}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* PROJECT REPORTS */}
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#302D30]">
              Project Reports
            </h2>

            <p className="mt-1 text-sm text-[#777177]">
              Detailed project performance
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-[#D9E1E2] bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#302D30]">
                      {project.project}
                    </h3>

                    <p className="mt-1 text-sm text-[#777177]">
                      Manager: {project.manager}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* PROGRESS */}
                <div className="mt-6">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium text-[#302D30]">
                      Project Progress
                    </span>

                    <span className="text-sm font-bold text-[#1D546D]">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-[#D9E1E2]">
                    <div
                      className="h-full rounded-full bg-[#1D546D]"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* TASK STATS */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-lg bg-[#F3F4F4] p-3 text-center">
                    <p className="text-xs text-[#777177]">
                      Total
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#302D30]">
                      {project.totalTasks}
                    </p>
                  </div>

                  <div className="rounded-lg bg-green-50 p-3 text-center">
                    <p className="text-xs text-green-700">
                      Completed
                    </p>

                    <p className="mt-1 text-xl font-bold text-green-600">
                      {project.completedTasks}
                    </p>
                  </div>

                  <div className="rounded-lg bg-yellow-50 p-3 text-center">
                    <p className="text-xs text-yellow-700">
                      Active
                    </p>

                    <p className="mt-1 text-xl font-bold text-yellow-600">
                      {project.inProgressTasks}
                    </p>
                  </div>

                  <div className="rounded-lg bg-red-50 p-3 text-center">
                    <p className="text-xs text-red-700">
                      Pending
                    </p>

                    <p className="mt-1 text-xl font-bold text-red-600">
                      {project.pendingTasks}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="rounded-2xl border border-[#D9E1E2] bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-[#302D30]">
                No reports found
              </h3>

              <p className="mt-2 text-sm text-[#777177]">
                Try changing your search or project filter.
              </p>
            </div>
          )}
        </div>

        {/* TEAM PERFORMANCE */}
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#302D30]">
              Team Performance
            </h2>

            <p className="mt-1 text-sm text-[#777177]">
              Task completion performance by team member
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#D9E1E2] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead className="bg-[#061E29]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                      Team Member
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                      Assigned
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                      Completed
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                      Pending
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white">
                      Completion
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {teamReports.map((member) => (
                    <tr
                      key={member.id}
                      className="border-t border-[#D9E1E2] hover:bg-[#F3F4F4]"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-[#302D30]">
                          {member.name}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#E7EFF1] px-3 py-1 text-xs font-semibold text-[#1D546D]">
                          {member.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#302D30]">
                        {member.assignedTasks}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        {member.completedTasks}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-red-600">
                        {member.pendingTasks}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 rounded-full bg-[#D9E1E2]">
                            <div
                              className="h-full rounded-full bg-[#1D546D]"
                              style={{
                                width: `${member.completionRate}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-bold text-[#1D546D]">
                            {member.completionRate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;