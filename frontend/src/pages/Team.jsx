import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users";

const Team = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    department: "Development",
  });

  // ==================================================
  // GET TOKEN
  // ==================================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwt")
    );
  };

  // ==================================================
  // FETCH USERS
  // ==================================================

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch team members");
      }

      setMembers(data.users || []);
    } catch (err) {
      console.error("FETCH MEMBERS ERROR:", err);
      setError(err.message || "Unable to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ==================================================
  // ADD MEMBER
  // ==================================================

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (
      !newMember.name.trim() ||
      !newMember.email.trim() ||
      !newMember.password.trim()
    ) {
      setError("Name, email and password are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: newMember.name.trim(),
          email: newMember.email.trim(),
          password: newMember.password,
          role: newMember.role,
          department: newMember.department,
          status: "Active",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add team member");
      }

      await fetchMembers();

      setNewMember({
        name: "",
        email: "",
        password: "",
        role: "employee",
        department: "Development",
      });

      setShowModal(false);
    } catch (err) {
      console.error("ADD MEMBER ERROR:", err);
      setError(err.message || "Unable to add team member");
    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // TOGGLE STATUS
  // ==================================================

  const toggleStatus = async (member) => {
    try {
      setError("");

      const token = getToken();

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const newStatus =
        member.status === "Active" ? "Inactive" : "Active";

      const response = await fetch(API_URL + "/" + member._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update member status");
      }

      setMembers((prev) =>
        prev.map((item) =>
          item._id === member._id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );
    } catch (err) {
      console.error("TOGGLE STATUS ERROR:", err);
      setError(err.message || "Unable to update member status");
    }
  };

  // ==================================================
  // INITIALS
  // ==================================================

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // ==================================================
  // DISPLAY ROLE
  // ==================================================

  const getDisplayRole = (role) => {
    if (!role) return "Employee";

    if (role.toLowerCase() === "admin") {
      return "Admin";
    }

    return "Employee";
  };

  // ==================================================
  // ROLE CLASS
  // ==================================================

  const getRoleClass = (role) => {
    if (role === "Admin") {
      return "bg-[#E8EFF2] text-[#1D546D]";
    }

    return "bg-[#EEF3F3] text-[#5F9598]";
  };

  // ==================================================
  // FILTER MEMBERS
  // ==================================================

  const filteredMembers = members.filter((member) => {
    const searchText = search.toLowerCase();

    const memberName = (member.name || "").toLowerCase();
    const memberEmail = (member.email || "").toLowerCase();
    const memberDepartment = (
      member.department || "General"
    ).toLowerCase();

    const displayRole = getDisplayRole(member.role);

    const matchesSearch =
      memberName.includes(searchText) ||
      memberEmail.includes(searchText) ||
      memberDepartment.includes(searchText);

    const matchesRole =
      roleFilter === "All" || displayRole === roleFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (member.status || "Active") === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // ==================================================
  // COUNTS
  // ==================================================

  const totalMembers = members.length;

  const adminCount = members.filter(
    (member) => member.role === "admin"
  ).length;

  const employeeCount = members.filter(
    (member) => member.role === "employee"
  ).length;

  const activeCount = members.filter(
    (member) => (member.status || "Active") === "Active"
  ).length;

  // ==================================================
  // RETURN
  // ==================================================

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="bg-[#1D546D] px-6 lg:px-8 py-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <p className="text-sm font-medium text-[#B8C9CB]">
              Workspace
            </p>

            <h1 className="text-3xl font-bold text-white mt-1">
              Team
            </h1>

            <p className="text-sm text-[#D9E1E2] mt-2">
              Manage your team members, roles and workspace access.
            </p>
          </div>

          <button
            onClick={() => {
              setError("");
              setShowModal(true);
            }}
            className="px-5 py-3 rounded-xl bg-[#061E29] text-white text-sm font-medium hover:bg-[#123B4D] transition shadow-sm"
          >
            + Add Member
          </button>

        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="px-6 lg:px-8 py-7">

        {/* ERROR MESSAGE */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ===================================================
            SUMMARY CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

          {/* TOTAL MEMBERS */}

          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Total Members
                </p>

                <h2 className="text-3xl font-bold text-[#061E29] mt-2">
                  {loading ? "—" : totalMembers}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E8EFF2] flex items-center justify-center text-[#1D546D] text-lg font-bold">
                👥
              </div>

            </div>

            <p className="text-xs text-[#1D546D] mt-4 font-medium">
              All workspace members
            </p>
          </div>

          {/* ADMINS */}

          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Admins
                </p>

                <h2 className="text-3xl font-bold text-[#061E29] mt-2">
                  {loading ? "—" : adminCount}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#E8EFF2] flex items-center justify-center text-[#1D546D] text-lg font-bold">
                A
              </div>

            </div>

            <p className="text-xs text-[#1D546D] mt-4 font-medium">
              System administrators
            </p>
          </div>

          {/* EMPLOYEES */}

          <div className="bg-white rounded-2xl border border-[#D9E1E2] p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Employees
                </p>

                <h2 className="text-3xl font-bold text-[#061E29] mt-2">
                  {loading ? "—" : employeeCount}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#EEF3F3] flex items-center justify-center text-[#5F9598] text-lg font-bold">
                E
              </div>

            </div>

            <p className="text-xs text-[#5F9598] mt-4 font-medium">
              Workspace employees
            </p>
          </div>

          {/* ACTIVE MEMBERS */}

          <div className="bg-[#061E29] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#B8C9CB]">
                  Active Members
                </p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {loading ? "—" : activeCount}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#B8C9CB] text-lg">
                ✓
              </div>

            </div>

            <p className="text-xs text-[#B8C9CB] mt-4 font-medium">
              Currently active
            </p>
          </div>

        </div>

        {/* ===================================================
            TEAM SECTION
        ==================================================== */}

        <div className="bg-white rounded-2xl border border-[#D9E1E2] shadow-sm overflow-hidden">

          {/* SECTION HEADER */}

          <div className="px-6 py-5 border-b border-[#D9E1E2]">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h2 className="text-lg font-semibold text-[#061E29]">
                  Team Members
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  View and manage members of your SentinelTask workspace.
                </p>
              </div>

              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-[#061E29]">
                  {filteredMembers.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#061E29]">
                  {members.length}
                </span>{" "}
                members
              </div>

            </div>

          </div>

          {/* =================================================
              SEARCH + FILTERS
          ================================================== */}

          <div className="px-6 py-5 border-b border-[#D9E1E2] bg-[#FAFBFB]">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* SEARCH */}

              <div className="md:col-span-1 relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5F9598]">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search members..."
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D9E1E2] bg-white text-sm text-[#061E29] placeholder:text-gray-400 outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#5F9598]/20"
                />

              </div>

              {/* ROLE */}

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-sm text-[#061E29] outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>

              {/* STATUS */}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-sm text-[#061E29] outline-none focus:border-[#1D546D]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================== */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="bg-[#F3F4F4] text-left">

                  <th className="px-6 py-4 text-xs font-semibold text-[#5F9598]">
                    Member
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-[#5F9598]">
                    Role
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-[#5F9598]">
                    Department
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-[#5F9598]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-[#5F9598] text-right">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-[#D9E1E2]">

                {loading ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-14 text-center"
                    >
                      <div className="flex flex-col items-center">

                        <div className="w-10 h-10 border-4 border-[#D9E1E2] border-t-[#1D546D] rounded-full animate-spin mb-4" />

                        <p className="text-sm text-gray-500">
                          Loading team members...
                        </p>

                      </div>
                    </td>
                  </tr>

                ) : filteredMembers.length > 0 ? (

                  filteredMembers.map((member) => {

                    const displayRole = getDisplayRole(member.role);

                    const memberStatus =
                      member.status || "Active";

                    return (
                      <tr
                        key={member._id}
                        className="hover:bg-[#FAFBFB] transition"
                      >

                        {/* MEMBER */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-full bg-[#E8EFF2] text-[#1D546D] flex items-center justify-center font-semibold text-sm">
                              {getInitials(member.name)}
                            </div>

                            <div>

                              <p className="font-semibold text-[#061E29]">
                                {member.name}
                              </p>

                              <p className="text-xs text-gray-500 mt-1">
                                {member.email}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* ROLE */}

                        <td className="px-6 py-5">

                          <span
                            className={
                              "inline-flex px-3 py-1.5 rounded-full text-xs font-medium " +
                              getRoleClass(displayRole)
                            }
                          >
                            {displayRole}
                          </span>

                        </td>

                        {/* DEPARTMENT */}

                        <td className="px-6 py-5">

                          <span className="text-sm text-gray-600">
                            {member.department || "General"}
                          </span>

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-5">

                          <span
                            className={
                              memberStatus === "Active"
                                ? "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F1F1] text-[#5F9598] text-xs font-medium"
                                : "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F4F4] text-gray-500 text-xs font-medium"
                            }
                          >

                            <span
                              className={
                                memberStatus === "Active"
                                  ? "w-1.5 h-1.5 rounded-full bg-[#5F9598]"
                                  : "w-1.5 h-1.5 rounded-full bg-gray-400"
                              }
                            />

                            {memberStatus}

                          </span>

                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-5">

                          <div className="flex justify-end">

                            <button
                              onClick={() => toggleStatus(member)}
                              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#1D546D] hover:bg-[#E8EFF2] transition"
                            >
                              {memberStatus === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })

                ) : (

                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-14 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div className="w-14 h-14 rounded-2xl bg-[#E8EFF2] flex items-center justify-center text-[#1D546D] text-xl mb-4">
                          👥
                        </div>

                        <h3 className="font-semibold text-[#061E29]">
                          No members found
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Try changing your search or filters.
                        </p>

                      </div>

                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* =====================================================
          ADD MEMBER MODAL
      ====================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061E29]/60 backdrop-blur-sm">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* MODAL HEADER */}

            <div className="px-6 py-5 bg-[#061E29] flex items-center justify-between">

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Add Team Member
                </h3>

                <p className="text-xs text-[#B8C9CB] mt-1">
                  Add a new member to your workspace.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-lg text-[#B8C9CB] hover:bg-white/10 hover:text-white transition"
              >
                ✕
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleAddMember}
              className="p-6 space-y-5"
            >

              {/* NAME */}

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter full name"
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] placeholder:text-gray-400 outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#5F9598]/20"
                  required
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter email address"
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] placeholder:text-gray-400 outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#5F9598]/20"
                  required
                />
              </div>

              {/* PASSWORD */}

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={newMember.password}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      password: e.target.value,
                    })
                  }
                  placeholder="Minimum 6 characters"
                  minLength={6}
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] placeholder:text-gray-400 outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#5F9598]/20"
                  required
                />

                <p className="text-xs text-gray-400 mt-1.5">
                  This password will be used by the member to sign in.
                </p>
              </div>

              {/* ROLE */}

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Role
                </label>

                <select
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      role: e.target.value,
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] outline-none focus:border-[#1D546D]"
                >
                  <option value="employee">
                    Employee
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>
              </div>

              {/* DEPARTMENT */}

              <div>
                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Department
                </label>

                <select
                  value={newMember.department}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      department: e.target.value,
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] outline-none focus:border-[#1D546D]"
                >
                  <option value="Development">
                    Development
                  </option>

                  <option value="Design">
                    Design
                  </option>

                  <option value="Marketing">
                    Marketing
                  </option>

                  <option value="Testing">
                    Testing
                  </option>

                  <option value="Management">
                    Management
                  </option>
                </select>
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#D9E1E2] text-[#061E29] text-sm font-medium hover:bg-[#F3F4F4] transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] text-white text-sm font-medium hover:bg-[#061E29] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Adding..." : "Add Member"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Team;