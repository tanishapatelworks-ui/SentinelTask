
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialMilestones = [
  {
    id: 1,
    title: "UI Design Completion",
    project: "Website Redesign",
    dueDate: "2026-09-10",
    status: "Completed",
    progress: 100,
    owner: "Amit Patel",
    description: "Complete all major website UI screens and finalize the design.",
  },
  {
    id: 2,
    title: "Frontend Development",
    project: "ERP Development",
    dueDate: "2026-09-15",
    status: "In Progress",
    progress: 65,
    owner: "Neha Patel",
    description: "Develop the main ERP frontend modules and connect the required screens.",
  },
  {
    id: 3,
    title: "Mobile App Prototype",
    project: "Mobile Application",
    dueDate: "2026-09-18",
    status: "In Progress",
    progress: 45,
    owner: "Karan Mehta",
    description: "Prepare the first working prototype of the mobile application.",
  },
  {
    id: 4,
    title: "Testing Phase",
    project: "Website Redesign",
    dueDate: "2026-09-22",
    status: "Pending",
    progress: 20,
    owner: "Priya Shah",
    description: "Perform functional and usability testing before final delivery.",
  },
  {
    id: 5,
    title: "Project Launch",
    project: "Marketing Campaign",
    dueDate: "2026-09-28",
    status: "Pending",
    progress: 0,
    owner: "Rahul Mehta",
    description: "Complete the final campaign activities and prepare for launch.",
  },
];

const projects = [
  "Website Redesign",
  "ERP Development",
  "Mobile Application",
  "Marketing Campaign",
];

const teamMembers = [
  "Amit Patel",
  "Neha Patel",
  "Karan Mehta",
  "Priya Shah",
  "Rahul Mehta",
];

const statuses = [
  "Pending",
  "In Progress",
  "Completed",
  "Delayed",
];

function ManagerMilestones() {
  const navigate = useNavigate();

  const [milestones, setMilestones] = useState(initialMilestones);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [viewMilestone, setViewMilestone] = useState(null);
  const [editMilestone, setEditMilestone] = useState(null);

  const [form, setForm] = useState({
    title: "",
    project: "Website Redesign",
    dueDate: "",
    status: "Pending",
    progress: 0,
    owner: "Amit Patel",
    description: "",
  });

  const filteredMilestones = useMemo(() => {
    return milestones.filter((milestone) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        milestone.title.toLowerCase().includes(searchText) ||
        milestone.project.toLowerCase().includes(searchText) ||
        milestone.owner.toLowerCase().includes(searchText);

      const matchesStatus =
        filterStatus === "All" ||
        milestone.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [milestones, search, filterStatus]);

  const totalMilestones = milestones.length;

  const completedMilestones = milestones.filter(
    (milestone) => milestone.status === "Completed"
  ).length;

  const inProgressMilestones = milestones.filter(
    (milestone) => milestone.status === "In Progress"
  ).length;

  const pendingMilestones = milestones.filter(
    (milestone) => milestone.status === "Pending"
  ).length;

  const openAddModal = () => {
    setEditMilestone(null);

    setForm({
      title: "",
      project: "Website Redesign",
      dueDate: "",
      status: "Pending",
      progress: 0,
      owner: "Amit Patel",
      description: "",
    });

    setShowModal(true);
  };

  const openEditModal = (milestone) => {
    setEditMilestone(milestone);

    setForm({
      title: milestone.title,
      project: milestone.project,
      dueDate: milestone.dueDate,
      status: milestone.status,
      progress: milestone.progress,
      owner: milestone.owner,
      description: milestone.description,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.dueDate) {
      return;
    }

    const progressValue = Math.min(
      100,
      Math.max(0, Number(form.progress))
    );

    const finalStatus =
      progressValue === 100
        ? "Completed"
        : form.status === "Completed"
        ? "In Progress"
        : form.status;

    if (editMilestone) {
      setMilestones((prev) =>
        prev.map((milestone) =>
          milestone.id === editMilestone.id
            ? {
                ...milestone,
                ...form,
                progress: progressValue,
                status: finalStatus,
              }
            : milestone
        )
      );
    } else {
      setMilestones((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          progress: progressValue,
          status: finalStatus,
        },
      ]);
    }

    setShowModal(false);
    setEditMilestone(null);
  };

  const deleteMilestone = (id) => {
    setMilestones((prev) =>
      prev.filter((milestone) => milestone.id !== id)
    );

    setViewMilestone(null);
  };

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-[#E8F3EE] text-[#276749]";
    }

    if (status === "In Progress") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (status === "Delayed") {
      return "bg-[#F8ECEC] text-[#9B3D3D]";
    }

    return "bg-[#F3F4F4] text-[#302D30]";
  };

  const getProgressText = (progress) => {
    if (progress === 100) {
      return "Completed";
    }

    if (progress >= 70) {
      return "Almost done";
    }

    if (progress >= 40) {
      return "In progress";
    }

    if (progress > 0) {
      return "Started";
    }

    return "Not started";
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* ================= HEADER ================= */}

      <header className="h-20 bg-[#061E29] px-6 lg:px-8 flex items-center justify-between">

        <div>
          <p className="text-sm text-[#B8C9CB]">
            SentinelTask
          </p>

          <h1 className="text-xl font-semibold text-white mt-1">
            Manager Milestones
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/manager-dashboard")}
          className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
        >
          Dashboard
        </button>

      </header>


      {/* ================= CONTENT ================= */}

      <main className="p-6 lg:p-8">

        {/* PAGE HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7">

          <div>
            <h2 className="text-2xl font-bold text-[#061E29]">
              Milestones
            </h2>

            <p className="text-sm text-[#5F9598] mt-1">
              Track important project goals, deadlines and progress.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="px-5 py-3 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
          >
            + Add Milestone
          </button>

        </div>


        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Total Milestones
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalMilestones}
            </h3>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Completed
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {completedMilestones}
            </h3>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              In Progress
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {inProgressMilestones}
            </h3>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Pending
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {pendingMilestones}
            </h3>
          </div>

        </div>


        {/* ================= FILTERS ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex-1">

              <input
                type="text"
                placeholder="Search milestones, projects or team members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none focus:border-[#5F9598]"
              />

            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none"
            >
              <option value="All">
                All Statuses
              </option>

              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

          </div>

        </div>


        {/* ================= MILESTONE LIST ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

          <div className="px-5 py-5 border-b border-[#D9E1E2]">

            <h3 className="text-lg font-bold text-[#061E29]">
              Project Milestones
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              {filteredMilestones.length} milestone
              {filteredMilestones.length !== 1 ? "s" : ""} found
            </p>

          </div>


          {filteredMilestones.length === 0 ? (

            <div className="text-center py-16 px-5">

              <div className="w-14 h-14 rounded-2xl bg-[#F3F4F4] mx-auto flex items-center justify-center text-[#5F9598] text-2xl">
                ✓
              </div>

              <p className="text-sm font-semibold text-[#061E29] mt-4">
                No milestones found
              </p>

              <p className="text-xs text-[#5F9598] mt-1">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-[#D9E1E2]">

              {filteredMilestones.map((milestone) => (

                <div
                  key={milestone.id}
                  className="p-5 hover:bg-[#FAFAFA] transition"
                >

                  <div className="flex flex-col xl:flex-row xl:items-center gap-5">

                    {/* LEFT */}

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold ${getStatusStyle(
                            milestone.status
                          )}`}
                        >
                          {milestone.status}
                        </span>

                        <span className="text-xs text-[#5F9598]">
                          {milestone.project}
                        </span>

                      </div>

                      <h4 className="text-base font-bold text-[#061E29] mt-3">
                        {milestone.title}
                      </h4>

                      <p className="text-xs text-[#5F9598] mt-1">
                        Owner: {milestone.owner}
                      </p>

                    </div>


                    {/* PROGRESS */}

                    <div className="w-full xl:w-64">

                      <div className="flex items-center justify-between mb-2">

                        <span className="text-xs font-semibold text-[#302D30]">
                          Progress
                        </span>

                        <span className="text-xs font-bold text-[#1D546D]">
                          {milestone.progress}%
                        </span>

                      </div>

                      <div className="w-full h-2.5 bg-[#E7EAEB] rounded-full overflow-hidden">

                        <div
                          className="h-full bg-[#1D546D] rounded-full transition-all"
                          style={{
                            width: `${milestone.progress}%`,
                          }}
                        />

                      </div>

                      <p className="text-[10px] text-[#5F9598] mt-2">
                        {getProgressText(milestone.progress)}
                      </p>

                    </div>


                    {/* DUE DATE */}

                    <div className="xl:w-32">

                      <p className="text-[10px] text-[#5F9598]">
                        Due Date
                      </p>

                      <p className="text-sm font-semibold text-[#302D30] mt-1">
                        {milestone.dueDate}
                      </p>

                    </div>


                    {/* ACTIONS */}

                    <div className="flex items-center gap-4 xl:w-28">

                      <button
                        type="button"
                        onClick={() =>
                          setViewMilestone(milestone)
                        }
                        className="text-xs font-semibold text-[#1D546D] hover:underline"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(milestone)
                        }
                        className="text-xs font-semibold text-[#5F9598] hover:text-[#1D546D]"
                      >
                        Edit
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>


      {/* ================= ADD / EDIT MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 bg-[#061E29]/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <div>

                <h3 className="text-lg font-bold text-[#061E29]">
                  {editMilestone
                    ? "Edit Milestone"
                    : "Add Milestone"}
                </h3>

                <p className="text-xs text-[#5F9598] mt-1">
                  Create and manage an important project milestone.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-[#5F9598] hover:text-[#061E29] text-xl"
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >

              {/* TITLE */}

              <div>

                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Milestone Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter milestone title"
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#5F9598]"
                />

              </div>


              {/* PROJECT + OWNER */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Project
                  </label>

                  <select
                    value={form.project}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        project: e.target.value,
                      })
                    }
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                  >
                    {projects.map((project) => (
                      <option
                        key={project}
                        value={project}
                      >
                        {project}
                      </option>
                    ))}
                  </select>

                </div>


                <div>

                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Owner
                  </label>

                  <select
                    value={form.owner}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        owner: e.target.value,
                      })
                    }
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                  >
                    {teamMembers.map((member) => (
                      <option
                        key={member}
                        value={member}
                      >
                        {member}
                      </option>
                    ))}
                  </select>

                </div>

              </div>


              {/* DATE + STATUS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Due Date
                  </label>

                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#5F9598]"
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value,
                      })
                    }
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                  >
                    {statuses.map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                  </select>

                </div>

              </div>


              {/* PROGRESS */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-semibold text-[#302D30]">
                    Progress
                  </label>

                  <span className="text-sm font-bold text-[#1D546D]">
                    {form.progress}%
                  </span>

                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={form.progress}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      progress: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#1D546D]"
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter milestone description"
                  className="w-full px-4 py-3 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#5F9598] resize-none"
                />

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#302D30] text-sm font-semibold hover:bg-[#F3F4F4]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold"
                >
                  {editMilestone
                    ? "Save Changes"
                    : "Add Milestone"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ================= VIEW MODAL ================= */}

      {viewMilestone && (

        <div className="fixed inset-0 bg-[#061E29]/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <h3 className="text-lg font-bold text-[#061E29]">
                Milestone Details
              </h3>

              <button
                type="button"
                onClick={() => setViewMilestone(null)}
                className="text-[#5F9598] hover:text-[#061E29] text-xl"
              >
                ×
              </button>

            </div>


            <div className="p-6">

              <span
                className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${getStatusStyle(
                  viewMilestone.status
                )}`}
              >
                {viewMilestone.status}
              </span>

              <h3 className="text-xl font-bold text-[#061E29] mt-4">
                {viewMilestone.title}
              </h3>

              <p className="text-sm text-[#5F9598] mt-2">
                {viewMilestone.description}
              </p>


              <div className="mt-6 space-y-4">

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Project
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewMilestone.project}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-[#5F9598]">
                    Owner
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewMilestone.owner}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-[#5F9598]">
                    Due Date
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewMilestone.dueDate}
                  </p>
                </div>


                <div>

                  <div className="flex items-center justify-between">

                    <p className="text-xs text-[#5F9598]">
                      Progress
                    </p>

                    <p className="text-xs font-bold text-[#1D546D]">
                      {viewMilestone.progress}%
                    </p>

                  </div>

                  <div className="w-full h-2.5 bg-[#E7EAEB] rounded-full overflow-hidden mt-2">

                    <div
                      className="h-full bg-[#1D546D] rounded-full"
                      style={{
                        width: `${viewMilestone.progress}%`,
                      }}
                    />

                  </div>

                </div>

              </div>


              <div className="flex justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={() => {
                    setViewMilestone(null);
                    openEditModal(viewMilestone);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteMilestone(viewMilestone.id)
                  }
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#9B3D3D] text-sm font-semibold hover:bg-[#F8ECEC]"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManagerMilestones;

