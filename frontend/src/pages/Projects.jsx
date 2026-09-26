
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/projects";
const USERS_API_URL = "http://localhost:5000/api/users";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [teamLoading, setTeamLoading] = useState(false);

  const [error, setError] = useState("");

  const emptyForm = {
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    startDate: "",
    dueDate: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // =====================================================
  // TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwt")
    );
  };

  // =====================================================
  // SAFE JSON RESPONSE
  // =====================================================

  const getResponseData = async (response) => {
    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await response.text();

      throw new Error(
        `Backend returned ${response.status} ${response.statusText}. ${text.slice(
          0,
          100
        )}`
      );
    }

    return await response.json();
  };

  // =====================================================
  // STATUS
  // =====================================================

  const getStatusLabel = (status) => {
    switch (status) {
      case "Planning":
      case "planning":
        return "Planning";

      case "In Progress":
      case "active":
        return "In Progress";

      case "Completed":
      case "completed":
        return "Completed";

      case "On Hold":
      case "on-hold":
        return "On Hold";

      default:
        return status || "Planning";
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
      case "completed":
        return "bg-[#061E29] text-white";

      case "Planning":
      case "planning":
        return "bg-gray-100 text-gray-600";

      case "In Progress":
      case "active":
        return "bg-[#5F9598]/10 text-[#24575B]";

      case "On Hold":
      case "on-hold":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-[#5F9598]/10 text-[#24575B]";
    }
  };

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Low":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // =====================================================
  // FETCH PROJECTS
  // =====================================================

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch projects"
        );
      }

      setProjects(data.projects || []);
    } catch (error) {
      console.error("Fetch projects error:", error);

      setProjects([]);

      setError(
        error.message || "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await fetch(USERS_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch users"
        );
      }

      /*
        Backend may return:
        { users: [...] }
        OR
        [...] 
      */

      const userList = Array.isArray(data)
        ? data
        : data.users || [];

      setUsers(userList);
    } catch (error) {
      console.error("Fetch users error:", error);
      setUsers([]);
    }
  };

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  // =====================================================
  // CREATE
  // =====================================================

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter project name.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),

          description: formData.description.trim(),

          status: formData.status,

          priority: formData.priority,

          startDate: formData.startDate || null,

          dueDate: formData.dueDate || null,

          teamMembers: [],
        }),
      });

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create project"
        );
      }

      setProjects((prev) => [
        data.project,
        ...prev,
      ]);

      setFormData(emptyForm);

      setShowForm(false);
    } catch (error) {
      console.error(
        "Create project error:",
        error
      );

      alert(
        error.message ||
          "Unable to create project."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (project) => {
    setEditingProject(project);

    setFormData({
      name: project.name || "",

      description:
        project.description || "",

      status:
        project.status ||
        "Planning",

      priority:
        project.priority ||
        "Medium",

      startDate: project.startDate
        ? project.startDate.substring(0, 10)
        : "",

      dueDate: project.dueDate
        ? project.dueDate.substring(0, 10)
        : "",
    });

    setShowView(false);
    setShowForm(true);
  };

  // =====================================================
  // UPDATE
  // =====================================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter project name.");
      return;
    }

    if (!editingProject?._id) {
      alert("Project ID not found.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/${editingProject._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),

            description:
              formData.description.trim(),

            status: formData.status,

            priority: formData.priority,

            startDate:
              formData.startDate || null,

            dueDate:
              formData.dueDate || null,
          }),
        }
      );

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update project"
        );
      }

      setProjects((prev) =>
        prev.map((project) =>
          project._id === editingProject._id
            ? data.project
            : project
        )
      );

      setSelectedProject(data.project);

      setEditingProject(null);
      setFormData(emptyForm);
      setShowForm(false);
    } catch (error) {
      console.error(
        "Update project error:",
        error
      );

      alert(
        error.message ||
          "Unable to update project."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const project = projects.find(
      (item) => item._id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project?.name}"?`
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
            Accept: "application/json",
          },
        }
      );

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete project"
        );
      }

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== id
        )
      );

      if (
        selectedProject?._id === id
      ) {
        setSelectedProject(null);
        setShowView(false);
      }
    } catch (error) {
      console.error(
        "Delete project error:",
        error
      );

      alert(
        error.message ||
          "Unable to delete project."
      );
    }
  };

  // =====================================================
  // VIEW
  // =====================================================

  const handleView = async (project) => {
    try {
      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/${project._id}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch project"
        );
      }

      setSelectedProject(data.project);
      setShowView(true);
    } catch (error) {
      console.error(
        "View project error:",
        error
      );

      alert(
        error.message ||
          "Unable to load project."
      );
    }
  };

  // =====================================================
  // OPEN TEAM MODAL
  // =====================================================

  const openTeamModal = async (project) => {
    try {
      setTeamLoading(true);

      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/${project._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch project"
        );
      }

      setSelectedProject(data.project);
      setShowView(false);
      setShowTeamModal(true);
    } catch (error) {
      console.error(
        "Open team error:",
        error
      );

      alert(
        error.message ||
          "Unable to load team members."
      );
    } finally {
      setTeamLoading(false);
    }
  };

  // =====================================================
  // ADD TEAM MEMBER
  // =====================================================

  const handleAddTeamMember = async (userId) => {
    if (!selectedProject?._id || !userId) {
      return;
    }

    try {
      setTeamLoading(true);

      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/${selectedProject._id}/team`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },

          body: JSON.stringify({
            userId,
          }),
        }
      );

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add team member"
        );
      }

      setSelectedProject(data.project);

      setProjects((prev) =>
        prev.map((project) =>
          project._id === data.project._id
            ? data.project
            : project
        )
      );
    } catch (error) {
      console.error(
        "Add team member error:",
        error
      );

      alert(
        error.message ||
          "Unable to add team member."
      );
    } finally {
      setTeamLoading(false);
    }
  };

  // =====================================================
  // REMOVE TEAM MEMBER
  // =====================================================

  const handleRemoveTeamMember = async (userId) => {
    if (!selectedProject?._id || !userId) {
      return;
    }

    const member = selectedProject.teamMembers?.find(
      (item) => item._id === userId
    );

    const confirmed = window.confirm(
      `Remove ${
        member?.name || "this user"
      } from the project?`
    );

    if (!confirmed) return;

    try {
      setTeamLoading(true);

      const token = getToken();

      if (!token) {
        alert(
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/${selectedProject._id}/team/${userId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to remove team member"
        );
      }

      setSelectedProject(data.project);

      setProjects((prev) =>
        prev.map((project) =>
          project._id === data.project._id
            ? data.project
            : project
        )
      );
    } catch (error) {
      console.error(
        "Remove team member error:",
        error
      );

      alert(
        error.message ||
          "Unable to remove team member."
      );
    } finally {
      setTeamLoading(false);
    }
  };

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const closeForm = () => {
    setShowForm(false);

    setEditingProject(null);

    setFormData(emptyForm);
  };

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalProjects =
    projects.length;

  const inProgress =
    projects.filter(
      (project) =>
        project.status ===
          "In Progress" ||
        project.status === "active"
    ).length;

  const completedProjects =
    projects.filter(
      (project) =>
        project.status ===
          "Completed" ||
        project.status === "completed"
    ).length;

  const planningProjects =
    projects.filter(
      (project) =>
        project.status ===
          "Planning" ||
        project.status === "planning"
    ).length;

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F4]">

        <div className="bg-[#1D546D] px-6 lg:px-8 py-7">

          <p className="text-xs uppercase tracking-[0.15em] text-[#B8C9CB] mb-2">
            Workspace
          </p>

          <h1 className="text-2xl lg:text-3xl font-semibold text-white">
            Projects
          </h1>

        </div>

        <div className="flex items-center justify-center min-h-[400px]">

          <div className="text-center">

            <div className="w-10 h-10 border-4 border-[#D9E1E2] border-t-[#1D546D] rounded-full animate-spin mx-auto" />

            <p className="text-sm text-[#5F9598] mt-4">
              Loading projects...
            </p>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* HEADER */}

      <div className="bg-[#1D546D] px-6 lg:px-8 py-7">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <p className="text-xs uppercase tracking-[0.15em] text-[#B8C9CB] mb-2">
              Workspace
            </p>

            <h1 className="text-2xl lg:text-3xl font-semibold text-white">
              Projects
            </h1>

            <p className="text-sm text-[#D5E1E2] mt-2">
              Manage, monitor and organize all your projects.
            </p>

          </div>

          <button
            onClick={() => {
              setEditingProject(null);
              setFormData(emptyForm);
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#061E29] text-white text-sm font-semibold hover:bg-[#286B86] transition shadow-lg"
          >
            <span className="text-xl">
              +
            </span>

            New Project
          </button>

        </div>

      </div>

      {/* CONTENT */}

      <div className="px-6 lg:px-8 py-7">

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-4">

            <p className="text-sm font-semibold text-red-700">
              Unable to load projects
            </p>

            <p className="text-xs text-red-600 mt-1">
              {error}
            </p>

            <button
              onClick={fetchProjects}
              className="mt-3 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* SUMMARY */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">

            <p className="text-sm text-[#5F9598]">
              Total Projects
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalProjects}
            </h3>

          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">

            <p className="text-sm text-[#5F9598]">
              Planning
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {planningProjects}
            </h3>

          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">

            <p className="text-sm text-[#5F9598]">
              Completed
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {completedProjects}
            </h3>

          </div>

          <div className="bg-[#061E29] rounded-2xl p-5 shadow-sm">

            <p className="text-[#5F9598] text-sm">
              Active Projects
            </p>

            <h3 className="text-3xl font-bold text-white mt-2">
              {inProgress}
            </h3>

          </div>

        </div>

        {/* PROJECT LIST */}

        <div className="bg-white rounded-2xl border border-[#D9E1E2] shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-[#061E29]">
                All Projects
              </h2>

              <p className="text-xs text-[#5F9598] mt-1">
                View and manage your current projects
              </p>

            </div>

            <div className="px-3 py-1.5 rounded-lg bg-[#F3F4F4] text-xs font-semibold text-[#1D546D]">
              {projects.length} Projects
            </div>

          </div>

          {projects.length > 0 ? (

            <div className="p-5 lg:p-6 grid grid-cols-1 xl:grid-cols-2 gap-5">

              {projects.map((project) => (

                <div
                  key={project._id}
                  className="rounded-2xl border border-[#D9E1E2] bg-[#FAFBFB] p-5 hover:border-[#5F9598] hover:shadow-md transition-all"
                >

                  {/* PROJECT TOP */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-start gap-3 min-w-0">

                      <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#061E29] flex items-center justify-center text-white font-bold">
                        {project.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">

                        <h3 className="font-semibold text-[#061E29] text-base truncate">
                          {project.name}
                        </h3>

                        <p className="text-xs text-[#5F9598] mt-1">
                          Created by:{" "}
                          <span className="font-medium text-[#061E29]">
                            {project.createdBy?.name ||
                              "Unknown"}
                          </span>
                        </p>

                      </div>

                    </div>

                    <span
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(
                        project.status
                      )}`}
                    >
                      {getStatusLabel(
                        project.status
                      )}
                    </span>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="text-sm text-[#5F9598] mt-4 line-clamp-2">
                    {project.description ||
                      "No description available."}
                  </p>

                  {/* PRIORITY */}

                  <div className="mt-4">

                    <span
                      className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${getPriorityClasses(
                        project.priority
                      )}`}
                    >
                      {project.priority ||
                        "Medium"}{" "}
                      Priority
                    </span>

                  </div>

                  {/* DATES */}

                  <div className="grid grid-cols-2 gap-3 mt-4">

                    <div className="rounded-xl bg-white border border-[#D9E1E2] p-3">

                      <p className="text-xs text-[#5F9598]">
                        Start Date
                      </p>

                      <p className="text-sm font-semibold text-[#061E29] mt-1">
                        {project.startDate
                          ? new Date(
                              project.startDate
                            ).toLocaleDateString()
                          : "Not set"}
                      </p>

                    </div>

                    <div className="rounded-xl bg-white border border-[#D9E1E2] p-3">

                      <p className="text-xs text-[#5F9598]">
                        Due Date
                      </p>

                      <p className="text-sm font-semibold text-[#061E29] mt-1">
                        {project.dueDate
                          ? new Date(
                              project.dueDate
                            ).toLocaleDateString()
                          : "Not set"}
                      </p>

                    </div>

                  </div>

                  {/* TEAM PREVIEW */}

                  <div className="mt-4 rounded-xl bg-white border border-[#D9E1E2] p-3">

                    <div className="flex items-center justify-between">

                      <p className="text-xs font-semibold text-[#061E29]">
                        Team Members
                      </p>

                      <span className="text-xs text-[#5F9598]">
                        {project.teamMembers?.length || 0}{" "}
                        member
                        {project.teamMembers?.length === 1
                          ? ""
                          : "s"}
                      </span>

                    </div>

                    {project.teamMembers?.length > 0 ? (

                      <div className="flex items-center gap-2 mt-3 flex-wrap">

                        {project.teamMembers
                          .slice(0, 4)
                          .map((member) => (

                            <div
                              key={member._id}
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#F3F4F4]"
                            >

                              <div className="w-7 h-7 rounded-full bg-[#1D546D] text-white flex items-center justify-center text-[10px] font-bold">
                                {member.name
                                  ?.charAt(0)
                                  .toUpperCase() ||
                                  "U"}
                              </div>

                              <span className="text-xs font-medium text-[#061E29] max-w-[100px] truncate">
                                {member.name ||
                                  member.email ||
                                  "User"}
                              </span>

                            </div>

                          ))}

                        {project.teamMembers.length > 4 && (
                          <span className="text-xs font-semibold text-[#5F9598]">
                            +{project.teamMembers.length - 4} more
                          </span>
                        )}

                      </div>

                    ) : (

                      <p className="text-xs text-[#5F9598] mt-2">
                        No team members assigned.
                      </p>

                    )}

                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-2 mt-5 pt-4 border-t border-[#D9E1E2]">

                    <button
                      onClick={() =>
                        handleView(project)
                      }
                      className="flex-1 px-3 py-2.5 rounded-xl bg-[#061E29] text-white text-xs font-semibold hover:bg-[#1D546D]"
                    >
                      ◉ View
                    </button>

                    <button
                      onClick={() =>
                        handleEdit(project)
                      }
                      className="flex-1 px-3 py-2.5 rounded-xl bg-[#1D546D]/10 text-[#1D546D] text-xs font-semibold hover:bg-[#1D546D] hover:text-white"
                    >
                      ✎ Edit
                    </button>

                    <button
                      onClick={() =>
                        openTeamModal(project)
                      }
                      className="flex-1 px-3 py-2.5 rounded-xl bg-[#5F9598]/10 text-[#24575B] text-xs font-semibold hover:bg-[#5F9598] hover:text-white"
                    >
                      👥 Team
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(project._id)
                      }
                      className="flex-1 px-3 py-2.5 rounded-xl bg-[#F3F4F4] text-[#061E29] text-xs font-semibold border border-[#D9E1E2] hover:bg-[#061E29] hover:text-white"
                    >
                      ⌫ Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="p-14 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#061E29] flex items-center justify-center text-white text-2xl">
                ▣
              </div>

              <h3 className="font-semibold text-[#061E29] mt-4">
                No Projects Yet
              </h3>

              <p className="text-sm text-[#5F9598] mt-2">
                Create your first project to get started.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* =================================================
          CREATE / EDIT MODAL
      ================================================= */}

      {showForm && (

        <div className="fixed inset-0 z-50 bg-[#061E29]/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

            <div className="bg-[#061E29] px-6 py-5 flex justify-between items-center">

              <div>

                <p className="text-xs uppercase tracking-wider text-[#5F9598]">
                  Project Management
                </p>

                <h3 className="text-xl font-semibold text-white mt-1">
                  {editingProject
                    ? "Edit Project"
                    : "Create New Project"}
                </h3>

              </div>

              <button
                onClick={closeForm}
                className="w-9 h-9 rounded-lg bg-white/10 text-white"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={
                editingProject
                  ? handleUpdate
                  : handleCreate
              }
              className="p-6 space-y-5"
            >

              <div>

                <label className="block text-sm font-semibold text-[#061E29] mb-2">
                  Project Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] outline-none focus:border-[#1D546D]"
                  required
                />

              </div>

              <div>

                <label className="block text-sm font-semibold text-[#061E29] mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter project description"
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-[#D9E1E2] outline-none resize-none focus:border-[#1D546D]"
                />

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-[#061E29] mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white"
                  >
                    <option value="Planning">
                      Planning
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="On Hold">
                      On Hold
                    </option>
                  </select>

                </div>

                <div>

                  <label className="block text-sm font-semibold text-[#061E29] mb-2">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white"
                  >
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>
                  </select>

                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-[#061E29] mb-2">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2]"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-[#061E29] mb-2">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2]"
                  />

                </div>

              </div>

              <div className="rounded-xl bg-[#F3F4F4] border border-[#D9E1E2] p-4">

                <div className="flex items-center gap-2">

                  <span className="text-lg">
                    👥
                  </span>

                  <div>

                    <p className="text-sm font-semibold text-[#061E29]">
                      Team Members
                    </p>

                    <p className="text-xs text-[#5F9598] mt-1">
                      You can assign team members after creating the project.
                    </p>

                  </div>

                </div>

              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#D9E1E2]">

                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#061E29] font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#1D546D] text-white font-semibold disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingProject
                    ? "Update Project"
                    : "Create Project"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =================================================
          VIEW MODAL
      ================================================= */}

      {showView &&
        selectedProject && (

          <div className="fixed inset-0 z-50 bg-[#061E29]/70 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

              <div className="bg-[#061E29] px-6 py-5 flex justify-between items-center">

                <div>

                  <p className="text-xs text-[#5F9598]">
                    Project Details
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-1">
                    {selectedProject.name}
                  </h3>

                </div>

                <button
                  onClick={() =>
                    setShowView(false)
                  }
                  className="w-9 h-9 rounded-lg bg-white/10 text-white"
                >
                  ✕
                </button>

              </div>

              <div className="p-6">

                <div className="flex flex-wrap gap-2">

                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(
                      selectedProject.status
                    )}`}
                  >
                    {getStatusLabel(
                      selectedProject.status
                    )}
                  </span>

                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${getPriorityClasses(
                      selectedProject.priority
                    )}`}
                  >
                    {selectedProject.priority ||
                      "Medium"}{" "}
                    Priority
                  </span>

                </div>

                <div className="rounded-xl bg-[#F3F4F4] p-4 mt-5">

                  <p className="text-xs text-[#5F9598] mb-2">
                    Description
                  </p>

                  <p className="text-sm text-[#061E29] leading-6">
                    {selectedProject.description ||
                      "No description available."}
                  </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">

                  <div className="border border-[#D9E1E2] rounded-xl p-4">

                    <p className="text-xs text-[#5F9598]">
                      Created By
                    </p>

                    <p className="text-sm font-semibold text-[#061E29] mt-2">
                      {selectedProject.createdBy?.name ||
                        "Unknown"}
                    </p>

                  </div>

                  <div className="border border-[#D9E1E2] rounded-xl p-4">

                    <p className="text-xs text-[#5F9598]">
                      Start Date
                    </p>

                    <p className="text-sm font-semibold text-[#061E29] mt-2">
                      {selectedProject.startDate
                        ? new Date(
                            selectedProject.startDate
                          ).toLocaleDateString()
                        : "Not set"}
                    </p>

                  </div>

                  <div className="border border-[#D9E1E2] rounded-xl p-4">

                    <p className="text-xs text-[#5F9598]">
                      Due Date
                    </p>

                    <p className="text-sm font-semibold text-[#061E29] mt-2">
                      {selectedProject.dueDate
                        ? new Date(
                            selectedProject.dueDate
                          ).toLocaleDateString()
                        : "Not set"}
                    </p>

                  </div>

                </div>

                {/* TEAM */}

                <div className="mt-6">

                  <div className="flex items-center justify-between mb-3">

                    <h4 className="text-sm font-semibold text-[#061E29]">
                      Team Members
                    </h4>

                    <button
                      onClick={() =>
                        openTeamModal(
                          selectedProject
                        )
                      }
                      className="text-xs font-semibold text-[#1D546D] hover:underline"
                    >
                      Manage Team
                    </button>

                  </div>

                  {selectedProject.teamMembers?.length > 0 ? (

                    <div className="space-y-2">

                      {selectedProject.teamMembers.map(
                        (member) => (

                          <div
                            key={member._id}
                            className="flex items-center gap-3 rounded-xl bg-[#F3F4F4] p-3"
                          >

                            <div className="w-9 h-9 rounded-full bg-[#1D546D] text-white flex items-center justify-center text-xs font-bold">
                              {member.name
                                ?.charAt(0)
                                .toUpperCase() ||
                                "U"}
                            </div>

                            <div className="min-w-0">

                              <p className="text-sm font-semibold text-[#061E29]">
                                {member.name ||
                                  "Unknown User"}
                              </p>

                              <p className="text-xs text-[#5F9598] truncate">
                                {member.email ||
                                  "No email"}
                              </p>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  ) : (

                    <div className="rounded-xl bg-[#F3F4F4] p-4">

                      <p className="text-xs text-[#5F9598]">
                        No team members assigned to this project.
                      </p>

                    </div>

                  )}

                </div>

                <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[#D9E1E2]">

                  <button
                    onClick={() =>
                      handleEdit(
                        selectedProject
                      )
                    }
                    className="px-5 py-2.5 rounded-xl bg-[#1D546D] text-white text-sm font-semibold"
                  >
                    Edit Project
                  </button>

                  <button
                    onClick={() =>
                      setShowView(false)
                    }
                    className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#061E29] text-sm font-semibold"
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

      {/* =================================================
          TEAM MANAGEMENT MODAL
      ================================================= */}

      {showTeamModal &&
        selectedProject && (

          <div className="fixed inset-0 z-50 bg-[#061E29]/70 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">

              <div className="bg-[#061E29] px-6 py-5 flex justify-between items-center">

                <div>

                  <p className="text-xs text-[#5F9598]">
                    Team Management
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-1">
                    {selectedProject.name}
                  </h3>

                </div>

                <button
                  onClick={() =>
                    setShowTeamModal(false)
                  }
                  className="w-9 h-9 rounded-lg bg-white/10 text-white"
                >
                  ✕
                </button>

              </div>

              <div className="p-6">

                {/* CURRENT MEMBERS */}

                <div>

                  <h4 className="text-sm font-semibold text-[#061E29] mb-3">
                    Assigned Members
                  </h4>

                  {selectedProject.teamMembers?.length > 0 ? (

                    <div className="space-y-2 max-h-52 overflow-y-auto">

                      {selectedProject.teamMembers.map(
                        (member) => (

                          <div
                            key={member._id}
                            className="flex items-center justify-between gap-3 border border-[#D9E1E2] rounded-xl p-3"
                          >

                            <div className="flex items-center gap-3 min-w-0">

                              <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[#1D546D] text-white flex items-center justify-center text-xs font-bold">
                                {member.name
                                  ?.charAt(0)
                                  .toUpperCase() ||
                                  "U"}
                              </div>

                              <div className="min-w-0">

                                <p className="text-sm font-semibold text-[#061E29] truncate">
                                  {member.name ||
                                    "Unknown User"}
                                </p>

                                <p className="text-xs text-[#5F9598] truncate">
                                  {member.email ||
                                    "No email"}
                                </p>

                              </div>

                            </div>

                            <button
                              onClick={() =>
                                handleRemoveTeamMember(
                                  member._id
                                )
                              }
                              disabled={teamLoading}
                              className="flex-shrink-0 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 disabled:opacity-50"
                            >
                              Remove
                            </button>

                          </div>

                        )
                      )}

                    </div>

                  ) : (

                    <div className="rounded-xl bg-[#F3F4F4] p-4 text-center">

                      <p className="text-sm text-[#5F9598]">
                        No members assigned yet.
                      </p>

                    </div>

                  )}

                </div>

                {/* ADD MEMBER */}

                <div className="mt-6 pt-5 border-t border-[#D9E1E2]">

                  <h4 className="text-sm font-semibold text-[#061E29] mb-3">
                    Add Team Member
                  </h4>

                  {users.length > 0 ? (

                    <div className="space-y-2 max-h-60 overflow-y-auto">

                      {users
                        .filter(
                          (user) =>
                            !selectedProject.teamMembers?.some(
                              (member) =>
                                member._id ===
                                user._id
                            )
                        )
                        .map((user) => (

                          <div
                            key={user._id}
                            className="flex items-center justify-between gap-3 border border-[#D9E1E2] rounded-xl p-3 hover:bg-[#F3F4F4]"
                          >

                            <div className="flex items-center gap-3 min-w-0">

                              <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[#5F9598] text-white flex items-center justify-center text-xs font-bold">
                                {user.name
                                  ?.charAt(0)
                                  .toUpperCase() ||
                                  "U"}
                              </div>

                              <div className="min-w-0">

                                <p className="text-sm font-semibold text-[#061E29] truncate">
                                  {user.name ||
                                    "Unknown User"}
                                </p>

                                <p className="text-xs text-[#5F9598] truncate">
                                  {user.email ||
                                    "No email"}
                                </p>

                              </div>

                            </div>

                            <button
                              onClick={() =>
                                handleAddTeamMember(
                                  user._id
                                )
                              }
                              disabled={teamLoading}
                              className="flex-shrink-0 px-3 py-2 rounded-lg bg-[#1D546D] text-white text-xs font-semibold hover:bg-[#061E29] disabled:opacity-50"
                            >
                              + Add
                            </button>

                          </div>

                        ))}

                      {users.filter(
                        (user) =>
                          !selectedProject.teamMembers?.some(
                            (member) =>
                              member._id ===
                              user._id
                          )
                      ).length === 0 && (

                        <div className="rounded-xl bg-[#F3F4F4] p-4 text-center">

                          <p className="text-sm text-[#5F9598]">
                            All available users are already assigned.
                          </p>

                        </div>

                      )}

                    </div>

                  ) : (

                    <div className="rounded-xl bg-[#F3F4F4] p-4">

                      <p className="text-sm text-[#5F9598]">
                        No users available.
                      </p>

                      <p className="text-xs text-[#5F9598] mt-1">
                        Make sure users are available from the Team/User module.
                      </p>

                    </div>

                  )}

                </div>

                <div className="flex justify-end mt-6 pt-5 border-t border-[#D9E1E2]">

                  <button
                    onClick={() =>
                      setShowTeamModal(false)
                    }
                    className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#061E29] text-sm font-semibold"
                  >
                    Done
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

    </div>
  );
};

export default Projects;

