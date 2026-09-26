import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagerTeam = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Amit Patel",
      email: "amit@example.com",
      role: "Developer",
      department: "Development",
      project: "Website Redesign",
      tasks: 8,
      completed: 6,
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Patel",
      email: "neha@example.com",
      role: "Backend Developer",
      department: "Development",
      project: "ERP Development",
      tasks: 7,
      completed: 4,
      status: "Active",
    },
    {
      id: 3,
      name: "Karan Mehta",
      email: "karan@example.com",
      role: "UI/UX Designer",
      department: "Design",
      project: "Mobile Application",
      tasks: 6,
      completed: 4,
      status: "Active",
    },
    {
      id: 4,
      name: "Priya Shah",
      email: "priya@example.com",
      role: "Frontend Developer",
      department: "Development",
      project: "Mobile Application",
      tasks: 5,
      completed: 3,
      status: "Active",
    },
    {
      id: 5,
      name: "Rahul Mehta",
      email: "rahul@example.com",
      role: "QA Tester",
      department: "Testing",
      project: "Website Redesign",
      tasks: 6,
      completed: 5,
      status: "Active",
    },
    {
      id: 6,
      name: "Pooja Patel",
      email: "pooja@example.com",
      role: "Designer",
      department: "Design",
      project: "Marketing Campaign",
      tasks: 4,
      completed: 3,
      status: "Inactive",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Developer",
    department: "Development",
    project: "Website Redesign",
    status: "Active",
  });

  const departments = [
    "All",
    "Development",
    "Design",
    "Testing",
    "Marketing",
  ];

  const projects = [
    "Website Redesign",
    "Mobile Application",
    "Marketing Campaign",
    "ERP Development",
  ];

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      member.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const totalMembers = teamMembers.length;
  const activeMembers = teamMembers.filter(
    (member) => member.status === "Active"
  ).length;

  const totalTasks = teamMembers.reduce(
    (total, member) => total + member.tasks,
    0
  );

  const completedTasks = teamMembers.reduce(
    (total, member) => total + member.completed,
    0
  );

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      role: "Developer",
      department: "Development",
      project: "Website Redesign",
      status: "Active",
    });
  };

  const handleAddMember = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) return;

    const newMember = {
      id: Date.now(),
      ...form,
      tasks: 0,
      completed: 0,
    };

    setTeamMembers([...teamMembers, newMember]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditSave = (e) => {
    e.preventDefault();

    setTeamMembers(
      teamMembers.map((member) =>
        member.id === showEditModal.id
          ? {
              ...member,
              ...form,
            }
          : member
      )
    );

    setShowEditModal(null);
    resetForm();
  };

  const openEditModal = (member) => {
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
      department: member.department,
      project: member.project,
      status: member.status,
    });

    setShowEditModal(member);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* ================= HEADER ================= */}
      <header className="h-20 bg-[#061E29] flex items-center justify-between px-6 lg:px-8">

        <div>
          <p className="text-xs text-[#B8C9CB]">
            SentinelTask
          </p>

          <h1 className="text-lg font-semibold text-white mt-1">
            Team Management
          </h1>
        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() => navigate("/manager-dashboard")}
            className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
          >
            Dashboard
          </button>

        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="p-6 lg:p-8">

        {/* ================= PAGE TITLE ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">

          <div>
            <p className="text-sm font-medium text-[#1D546D]">
              Manager Workspace
            </p>

            <h2 className="text-3xl font-semibold text-[#061E29] mt-1">
              My Team
            </h2>

            <p className="text-sm text-[#5F9598] mt-2">
              Manage your project team members and their assignments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
          >
            + Add Team Member
          </button>

        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#5F9598]">
                Total Members
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                ♙
              </span>
            </div>

            <h3 className="text-3xl font-semibold text-[#061E29] mt-4">
              {totalMembers}
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              Team members
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#5F9598]">
                Active Members
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                ✓
              </span>
            </div>

            <h3 className="text-3xl font-semibold text-[#061E29] mt-4">
              {activeMembers}
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              Currently active
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#5F9598]">
                Total Tasks
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                ▣
              </span>
            </div>

            <h3 className="text-3xl font-semibold text-[#061E29] mt-4">
              {totalTasks}
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              Assigned to team
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#5F9598]">
                Completed Tasks
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                ◇
              </span>
            </div>

            <h3 className="text-3xl font-semibold text-[#061E29] mt-4">
              {completedTasks}
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              Successfully completed
            </p>
          </div>

        </div>

        {/* ================= TEAM TABLE ================= */}
        <div className="bg-white border border-[#D9E1E2] rounded-2xl shadow-sm">

          {/* Table Header */}
          <div className="p-6 border-b border-[#D9E1E2]">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h2 className="text-lg font-semibold text-[#061E29]">
                  Team Members
                </h2>

                <p className="text-xs text-[#5F9598] mt-1">
                  Members working under your projects
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                <div className="w-full sm:w-64 h-10 flex items-center bg-[#F3F4F4] border border-[#D9E1E2] rounded-xl px-4">
                  <span className="text-[#5F9598] mr-2">
                    ⌕
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search team member..."
                    className="bg-transparent outline-none text-sm w-full text-[#061E29] placeholder:text-[#5F9598]"
                  />
                </div>

                <select
                  value={departmentFilter}
                  onChange={(e) =>
                    setDepartmentFilter(e.target.value)
                  }
                  className="h-10 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none"
                >
                  {departments.map((department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>
                  ))}
                </select>

              </div>

            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="border-b border-[#D9E1E2] bg-[#F3F4F4]">

                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5F9598] uppercase">
                    Team Member
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5F9598] uppercase">
                    Role
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5F9598] uppercase">
                    Department
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5F9598] uppercase">
                    Project
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5F9598] uppercase">
                    Tasks
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5F9598] uppercase">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-xs font-semibold text-[#5F9598] uppercase">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-[#E5EAEB] last:border-0 hover:bg-[#FAFBFB] transition"
                    >

                      {/* Member */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-[#5F9598] text-white flex items-center justify-center font-semibold">
                            {member.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[#061E29]">
                              {member.name}
                            </p>

                            <p className="text-xs text-[#5F9598] mt-1">
                              {member.email}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#302D30]">
                          {member.role}
                        </p>
                      </td>

                      {/* Department */}
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-lg bg-[#E8F1F3] text-[#1D546D] text-xs font-medium">
                          {member.department}
                        </span>
                      </td>

                      {/* Project */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#302D30]">
                          {member.project}
                        </p>
                      </td>

                      {/* Tasks */}
                      <td className="px-6 py-4">

                        <p className="text-sm font-semibold text-[#061E29]">
                          {member.completed}/{member.tasks}
                        </p>

                        <div className="w-20 h-1.5 bg-[#E5EAEB] rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full bg-[#1D546D] rounded-full"
                            style={{
                              width:
                                member.tasks === 0
                                  ? "0%"
                                  : `${
                                      (member.completed /
                                        member.tasks) *
                                      100
                                    }%`,
                            }}
                          />
                        </div>

                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium ${
                            member.status === "Active"
                              ? "bg-[#E8F1F3] text-[#1D546D]"
                              : "bg-[#F3F4F4] text-[#5F9598]"
                          }`}
                        >
                          {member.status}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">

                        <div className="flex items-center justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              setShowViewModal(member)
                            }
                            className="px-3 py-2 rounded-lg bg-[#F3F4F4] text-[#061E29] hover:bg-[#E8F1F3] text-xs font-medium transition"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(member)
                            }
                            className="px-3 py-2 rounded-lg bg-[#1D546D] text-white hover:bg-[#286B86] text-xs font-medium transition"
                          >
                            Edit
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center"
                    >
                      <p className="text-sm font-medium text-[#061E29]">
                        No team members found
                      </p>

                      <p className="text-xs text-[#5F9598] mt-1">
                        Try changing your search or filter.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

      {/* ================= ADD MEMBER MODAL ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#061E29]/50 flex items-center justify-center p-4">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-[#061E29]">
                  Add Team Member
                </h2>

                <p className="text-xs text-[#5F9598] mt-1">
                  Add a member to your project team.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-9 h-9 rounded-lg bg-[#F3F4F4] text-[#061E29] hover:bg-[#E8F1F3] transition"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleAddMember}
              className="p-6 space-y-4"
            >

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Full Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter member name"
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#1D546D]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#1D546D]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-[#061E29] mb-2">
                    Role
                  </label>

                  <select
                    name="role"
                    value={form.role}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                  >
                    <option>Developer</option>
                    <option>Backend Developer</option>
                    <option>Frontend Developer</option>
                    <option>UI/UX Designer</option>
                    <option>Designer</option>
                    <option>QA Tester</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#061E29] mb-2">
                    Department
                  </label>

                  <select
                    name="department"
                    value={form.department}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Testing</option>
                    <option>Marketing</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Project
                </label>

                <select
                  name="project"
                  value={form.project}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                >
                  {projects.map((project) => (
                    <option key={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#061E29] text-sm font-medium hover:bg-[#F3F4F4] transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
                >
                  Add Member
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {showViewModal && (
        <div className="fixed inset-0 z-50 bg-[#061E29]/50 flex items-center justify-center p-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">

            <div className="p-6 border-b border-[#D9E1E2] flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-[#5F9598] text-white flex items-center justify-center font-semibold">
                  {showViewModal.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#061E29]">
                    {showViewModal.name}
                  </h2>

                  <p className="text-xs text-[#5F9598]">
                    {showViewModal.role}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(null)}
                className="w-9 h-9 rounded-lg bg-[#F3F4F4] text-[#061E29] hover:bg-[#E8F1F3]"
              >
                ×
              </button>

            </div>

            <div className="p-6 space-y-4">

              <div>
                <p className="text-xs text-[#5F9598]">
                  Email
                </p>

                <p className="text-sm font-medium text-[#061E29] mt-1">
                  {showViewModal.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#5F9598]">
                  Department
                </p>

                <p className="text-sm font-medium text-[#061E29] mt-1">
                  {showViewModal.department}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#5F9598]">
                  Assigned Project
                </p>

                <p className="text-sm font-medium text-[#061E29] mt-1">
                  {showViewModal.project}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-[#5F9598]">
                    Total Tasks
                  </p>

                  <p className="text-xl font-semibold text-[#061E29] mt-1">
                    {showViewModal.tasks}
                  </p>
                </div>

                <div className="bg-[#F3F4F4] rounded-xl p-4">
                  <p className="text-xs text-[#5F9598]">
                    Completed
                  </p>

                  <p className="text-xl font-semibold text-[#1D546D] mt-1">
                    {showViewModal.completed}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(null)}
                className="w-full px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-[#061E29]/50 flex items-center justify-center p-4">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-[#061E29]">
                  Edit Team Member
                </h2>

                <p className="text-xs text-[#5F9598] mt-1">
                  Update member information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowEditModal(null)}
                className="w-9 h-9 rounded-lg bg-[#F3F4F4] text-[#061E29] hover:bg-[#E8F1F3]"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleEditSave}
              className="p-6 space-y-4"
            >

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Full Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#1D546D]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#1D546D]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-[#061E29] mb-2">
                    Role
                  </label>

                  <select
                    name="role"
                    value={form.role}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                  >
                    <option>Developer</option>
                    <option>Backend Developer</option>
                    <option>Frontend Developer</option>
                    <option>UI/UX Designer</option>
                    <option>Designer</option>
                    <option>QA Tester</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#061E29] mb-2">
                    Department
                  </label>

                  <select
                    name="department"
                    value={form.department}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Testing</option>
                    <option>Marketing</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Project
                </label>

                <select
                  name="project"
                  value={form.project}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                >
                  {projects.map((project) => (
                    <option key={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setShowEditModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#061E29] text-sm font-medium hover:bg-[#F3F4F4]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default ManagerTeam;