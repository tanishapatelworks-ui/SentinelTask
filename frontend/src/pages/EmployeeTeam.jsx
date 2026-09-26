import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeTeam = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);

  const [members] = useState([
    {
      id: 1,
      name: "Rahul Mehta",
      role: "Project Manager",
      department: "Management",
      email: "rahul@sentineltask.com",
      project: "Website Redesign",
      tasks: 8,
      completed: 6,
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Shah",
      role: "Developer",
      department: "Development",
      email: "priya@sentineltask.com",
      project: "Mobile App Development",
      tasks: 10,
      completed: 7,
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Backend Developer",
      department: "Development",
      email: "amit@sentineltask.com",
      project: "ERP Development",
      tasks: 7,
      completed: 4,
      status: "Active",
    },
    {
      id: 4,
      name: "Neha Joshi",
      role: "Security Analyst",
      department: "Security",
      email: "neha@sentineltask.com",
      project: "Security Audit",
      tasks: 6,
      completed: 6,
      status: "Active",
    },
    {
      id: 5,
      name: "Karan Shah",
      role: "UI/UX Designer",
      department: "Design",
      email: "karan@sentineltask.com",
      project: "E-Commerce Platform",
      tasks: 9,
      completed: 5,
      status: "Active",
    },
    {
      id: 6,
      name: "Pooja Patel",
      role: "QA Tester",
      department: "Testing",
      email: "pooja@sentineltask.com",
      project: "Mobile App Development",
      tasks: 8,
      completed: 6,
      status: "Active",
    },
  ]);

  const roles = ["All", "Project Manager", "Developer", "Backend Developer", "Security Analyst", "UI/UX Designer", "QA Tester"];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()) ||
      member.department.toLowerCase().includes(search.toLowerCase()) ||
      member.project.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || member.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.status === "Active"
  ).length;

  const totalTasks = members.reduce(
    (sum, member) => sum + member.tasks,
    0
  );

  const completedTasks = members.reduce(
    (sum, member) => sum + member.completed,
    0
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* ================= TOP HEADER ================= */}

      <header className="h-[76px] bg-[#061E29] text-white px-8 flex items-center justify-between sticky top-0 z-20">

        <div>
          <p className="text-xs text-[#B8C9CB] uppercase tracking-wider">
            Employee Workspace
          </p>

          <h1 className="text-xl font-semibold">
            My Team
          </h1>
        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/employee-dashboard")}
            className="px-5 py-2.5 rounded-lg bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-medium transition"
          >
            Dashboard
          </button>

          <div className="w-10 h-10 rounded-full bg-[#5F9598] flex items-center justify-center font-bold">
            E
          </div>

        </div>

      </header>

      {/* ================= PAGE CONTENT ================= */}

      <main className="p-8">

        {/* Page Heading */}

        <div className="mb-7">

          <h2 className="text-2xl font-bold text-[#061E29]">
            Team Members
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            View your team members and their current work
          </p>

        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          <div className="bg-white rounded-xl border border-[#D9E1E2] p-5 shadow-sm">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-gray-500">
                  Team Members
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-2">
                  {totalMembers}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-lg bg-[#E7F0F1] flex items-center justify-center text-xl">
                👥
              </div>

            </div>

          </div>

          <div className="bg-white rounded-xl border border-[#D9E1E2] p-5 shadow-sm">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-gray-500">
                  Active Members
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-2">
                  {activeMembers}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-lg bg-[#E8F4EA] flex items-center justify-center text-xl">
                🟢
              </div>

            </div>

          </div>

          <div className="bg-white rounded-xl border border-[#D9E1E2] p-5 shadow-sm">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-gray-500">
                  Total Tasks
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-2">
                  {totalTasks}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-lg bg-[#E7F0F1] flex items-center justify-center text-xl">
                📋
              </div>

            </div>

          </div>

          <div className="bg-white rounded-xl border border-[#D9E1E2] p-5 shadow-sm">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-gray-500">
                  Completed Tasks
                </p>

                <h3 className="text-3xl font-bold text-[#061E29] mt-2">
                  {completedTasks}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-lg bg-[#E8F4EA] flex items-center justify-center text-xl">
                ✅
              </div>

            </div>

          </div>

        </div>

        {/* ================= FILTER AREA ================= */}

        <div className="bg-white rounded-xl border border-[#D9E1E2] shadow-sm p-5 mb-6">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* Search */}

            <div className="flex-1 relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search team member, role, department or project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-[#D9E1E2] rounded-lg outline-none focus:border-[#1D546D] text-sm"
              />

            </div>

            {/* Role Filter */}

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="lg:w-[230px] px-4 py-3 border border-[#D9E1E2] rounded-lg outline-none focus:border-[#1D546D] text-sm bg-white"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* ================= TEAM GRID ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredMembers.map((member) => {

            const progress =
              member.tasks > 0
                ? Math.round(
                    (member.completed / member.tasks) * 100
                  )
                : 0;

            return (
              <div
                key={member.id}
                className="bg-white rounded-xl border border-[#D9E1E2] shadow-sm p-6 hover:shadow-md transition"
              >

                {/* Member Header */}

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center font-bold">
                      {getInitials(member.name)}
                    </div>

                    <div>

                      <h3 className="font-bold text-[#061E29]">
                        {member.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {member.role}
                      </p>

                    </div>

                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#E8F4EA] text-[#2F6B3B]">
                    Active
                  </span>

                </div>

                {/* Member Information */}

                <div className="mt-5 space-y-3">

                  <div className="flex items-center gap-3 text-sm">

                    <span className="text-gray-400">
                      ✉️
                    </span>

                    <span className="text-gray-600 truncate">
                      {member.email}
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-sm">

                    <span className="text-gray-400">
                      🏢
                    </span>

                    <span className="text-gray-600">
                      {member.department}
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-sm">

                    <span className="text-gray-400">
                      📁
                    </span>

                    <span className="text-gray-600">
                      {member.project}
                    </span>

                  </div>

                </div>

                {/* Task Progress */}

                <div className="mt-5">

                  <div className="flex justify-between text-xs mb-2">

                    <span className="text-gray-500">
                      Task Progress
                    </span>

                    <span className="font-semibold text-[#1D546D]">
                      {member.completed}/{member.tasks}
                    </span>

                  </div>

                  <div className="w-full h-2 bg-[#E7F0F1] rounded-full">

                    <div
                      className="h-2 bg-[#1D546D] rounded-full"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>

                {/* View Button */}

                <button
                  onClick={() => setSelectedMember(member)}
                  className="w-full mt-5 py-2.5 rounded-lg border border-[#1D546D] text-[#1D546D] hover:bg-[#1D546D] hover:text-white transition text-sm font-medium"
                >
                  👁 View Details
                </button>

              </div>
            );
          })}

        </div>

        {/* Empty State */}

        {filteredMembers.length === 0 && (
          <div className="bg-white rounded-xl border border-[#D9E1E2] p-12 text-center">

            <div className="text-4xl mb-3">
              👥
            </div>

            <h3 className="text-lg font-semibold text-[#061E29]">
              No team members found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </main>

      {/* ================= VIEW DETAILS MODAL ================= */}

      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

            {/* Modal Header */}

            <div className="bg-[#061E29] text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">

              <div>
                <p className="text-xs text-[#B8C9CB]">
                  Team Member
                </p>

                <h2 className="text-xl font-bold mt-1">
                  {selectedMember.name}
                </h2>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="text-[#B8C9CB] hover:text-white text-2xl"
              >
                ×
              </button>

            </div>

            {/* Modal Body */}

            <div className="p-6">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-16 h-16 rounded-full bg-[#E7F0F1] text-[#1D546D] flex items-center justify-center text-xl font-bold">
                  {getInitials(selectedMember.name)}
                </div>

                <div>

                  <h3 className="text-lg font-bold text-[#061E29]">
                    {selectedMember.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {selectedMember.role}
                  </p>

                  <span className="inline-block mt-2 px-2.5 py-1 rounded-full text-xs bg-[#E8F4EA] text-[#2F6B3B]">
                    {selectedMember.status}
                  </span>

                </div>

              </div>

              <div className="space-y-4">

                <div className="flex justify-between border-b border-[#D9E1E2] pb-3">
                  <span className="text-sm text-gray-500">
                    Email
                  </span>

                  <span className="text-sm font-medium text-[#061E29]">
                    {selectedMember.email}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#D9E1E2] pb-3">
                  <span className="text-sm text-gray-500">
                    Department
                  </span>

                  <span className="text-sm font-medium text-[#061E29]">
                    {selectedMember.department}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#D9E1E2] pb-3">
                  <span className="text-sm text-gray-500">
                    Current Project
                  </span>

                  <span className="text-sm font-medium text-[#061E29]">
                    {selectedMember.project}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#D9E1E2] pb-3">
                  <span className="text-sm text-gray-500">
                    Total Tasks
                  </span>

                  <span className="text-sm font-medium text-[#061E29]">
                    {selectedMember.tasks}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Completed Tasks
                  </span>

                  <span className="text-sm font-medium text-[#2F6B3B]">
                    {selectedMember.completed}
                  </span>
                </div>

              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="w-full mt-6 py-3 rounded-lg bg-[#1D546D] hover:bg-[#286B86] text-white font-medium transition"
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

export default EmployeeTeam;