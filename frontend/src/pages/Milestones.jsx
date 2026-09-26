import { useMemo, useState } from "react";

const initialMilestones = [
  {
    id: 1,
    title: "UI Design Completed",
    project: "Website Redesign",
    owner: "Rahul Sharma",
    dueDate: "2026-09-08",
    progress: 100,
    status: "Completed",
    description: "Complete all major UI screens and finalize the design.",
  },
  {
    id: 2,
    title: "Backend API Ready",
    project: "ERP Development",
    owner: "Neha Patel",
    dueDate: "2026-09-12",
    progress: 70,
    status: "In Progress",
    description: "Develop and test the main backend APIs.",
  },
  {
    id: 3,
    title: "Mobile Prototype",
    project: "Mobile Application",
    owner: "Priya Shah",
    dueDate: "2026-09-15",
    progress: 55,
    status: "In Progress",
    description: "Prepare the complete mobile application prototype.",
  },
  {
    id: 4,
    title: "Marketing Campaign Launch",
    project: "Marketing Campaign",
    owner: "Amit Patel",
    dueDate: "2026-09-18",
    progress: 90,
    status: "Almost Done",
    description: "Finalize marketing materials and launch the campaign.",
  },
  {
    id: 5,
    title: "Database Setup",
    project: "ERP Development",
    owner: "Neha Patel",
    dueDate: "2026-09-22",
    progress: 30,
    status: "In Progress",
    description: "Complete database structure and initial collections.",
  },
];

const emptyForm = {
  title: "",
  project: "",
  owner: "",
  dueDate: "",
  progress: 0,
  status: "Not Started",
  description: "",
};

const Milestones = () => {
  const [milestones, setMilestones] = useState(initialMilestones);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");

  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredMilestones = useMemo(() => {
    return milestones.filter((milestone) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        milestone.title.toLowerCase().includes(searchText) ||
        milestone.project.toLowerCase().includes(searchText) ||
        milestone.owner.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        milestone.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [milestones, search, statusFilter]);

  const totalMilestones = milestones.length;

  const completedMilestones = milestones.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgressMilestones = milestones.filter(
    (item) => item.status === "In Progress"
  ).length;

  const almostDoneMilestones = milestones.filter(
    (item) => item.status === "Almost Done"
  ).length;

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Almost Done") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "In Progress") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const openAddModal = () => {
    setModalType("add");
    setSelectedMilestone(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (milestone) => {
    setModalType("edit");
    setSelectedMilestone(milestone);

    setForm({
      title: milestone.title,
      project: milestone.project,
      owner: milestone.owner,
      dueDate: milestone.dueDate,
      progress: milestone.progress,
      status: milestone.status,
      description: milestone.description,
    });

    setShowModal(true);
  };

  const openViewModal = (milestone) => {
    setModalType("view");
    setSelectedMilestone(milestone);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMilestone(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.project || !form.owner || !form.dueDate) {
      alert("Please fill all required fields.");
      return;
    }

    if (modalType === "add") {
      const newMilestone = {
        id: Date.now(),
        ...form,
      };

      setMilestones((prev) => [...prev, newMilestone]);
    } else {
      setMilestones((prev) =>
        prev.map((item) =>
          item.id === selectedMilestone.id
            ? {
                ...item,
                ...form,
              }
            : item
        )
      );
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this milestone?"
    );

    if (!confirmed) return;

    setMilestones((prev) =>
      prev.filter((milestone) => milestone.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">
      {/* HEADER */}
      <div className="bg-[#1D546D] px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#B8C9CB]">
              Workspace
            </p>

            <h1 className="mt-1 text-3xl font-bold text-white">
              Milestones
            </h1>

            <p className="mt-1 text-sm text-[#D9E1E2]">
              Track important project milestones and progress.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="rounded-lg bg-[#061E29] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0A2A38]"
          >
            + Add Milestone
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-6 py-8 lg:px-8">
        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#777177]">
              Total Milestones
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#302D30]">
              {totalMilestones}
            </h2>

            <p className="mt-1 text-xs text-[#777177]">
              All project milestones
            </p>
          </div>

          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#777177]">
              Completed
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {completedMilestones}
            </h2>

            <p className="mt-1 text-xs text-[#777177]">
              Successfully completed
            </p>
          </div>

          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#777177]">
              In Progress
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {inProgressMilestones}
            </h2>

            <p className="mt-1 text-xs text-[#777177]">
              Currently being worked on
            </p>
          </div>

          <div className="rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#777177]">
              Almost Done
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#1D546D]">
              {almostDoneMilestones}
            </h2>

            <p className="mt-1 text-xs text-[#777177]">
              Near completion
            </p>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mt-8 rounded-2xl border border-[#D9E1E2] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-[#302D30]">
                Search Milestones
              </label>

              <input
                type="text"
                placeholder="Search by milestone, project or owner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[#D9E1E2] px-4 py-3 text-sm text-[#302D30] outline-none transition focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
              />
            </div>

            <div className="w-full md:w-56">
              <label className="mb-2 block text-sm font-medium text-[#302D30]">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-[#D9E1E2] bg-white px-4 py-3 text-sm text-[#302D30] outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
              >
                <option value="All">All Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Almost Done">Almost Done</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* MILESTONE LIST */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#302D30]">
                Project Milestones
              </h2>

              <p className="mt-1 text-sm text-[#777177]">
                {filteredMilestones.length} milestone
                {filteredMilestones.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {filteredMilestones.length === 0 ? (
            <div className="rounded-2xl border border-[#D9E1E2] bg-white p-10 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-[#302D30]">
                No milestones found
              </h3>

              <p className="mt-2 text-sm text-[#777177]">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {filteredMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="rounded-2xl border border-[#D9E1E2] bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  {/* TOP */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#302D30]">
                        {milestone.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-[#1D546D]">
                        {milestone.project}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        milestone.status
                      )}`}
                    >
                      {milestone.status}
                    </span>
                  </div>

                  {/* INFO */}
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-[#F3F4F4] p-3">
                      <p className="text-xs text-[#777177]">
                        Owner
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#302D30]">
                        {milestone.owner}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#F3F4F4] p-3">
                      <p className="text-xs text-[#777177]">
                        Due Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#302D30]">
                        {formatDate(milestone.dueDate)}
                      </p>
                    </div>
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-[#302D30]">
                        Progress
                      </span>

                      <span className="text-sm font-bold text-[#1D546D]">
                        {milestone.progress}%
                      </span>
                    </div>

                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#D9E1E2]">
                      <div
                        className="h-full rounded-full bg-[#1D546D] transition-all"
                        style={{
                          width: `${milestone.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-[#D9E1E2] pt-4">
                    <button
                      onClick={() => openViewModal(milestone)}
                      className="rounded-lg border border-[#D9E1E2] px-4 py-2 text-sm font-medium text-[#302D30] transition hover:border-[#1D546D] hover:text-[#1D546D]"
                    >
                      View
                    </button>

                    <button
                      onClick={() => openEditModal(milestone)}
                      className="rounded-lg bg-[#1D546D] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#285F77]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(milestone.id)}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && modalType !== "view" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-[#061E29] px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {modalType === "add"
                    ? "Add Milestone"
                    : "Edit Milestone"}
                </h2>

                <p className="mt-1 text-sm text-[#B8C9CB]">
                  {modalType === "add"
                    ? "Create a new project milestone."
                    : "Update milestone information."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-2xl text-[#B8C9CB] transition hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* TITLE */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#302D30]">
                    Milestone Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter milestone title"
                    className="w-full rounded-lg border border-[#D9E1E2] px-4 py-3 text-sm outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
                  />
                </div>

                {/* PROJECT */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#302D30]">
                    Project *
                  </label>

                  <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#D9E1E2] bg-white px-4 py-3 text-sm outline-none focus:border-[#1D546D]"
                  >
                    <option value="">Select Project</option>
                    <option value="Website Redesign">
                      Website Redesign
                    </option>
                    <option value="Mobile Application">
                      Mobile Application
                    </option>
                    <option value="Marketing Campaign">
                      Marketing Campaign
                    </option>
                    <option value="ERP Development">
                      ERP Development
                    </option>
                  </select>
                </div>

                {/* OWNER */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#302D30]">
                    Owner *
                  </label>

                  <select
                    name="owner"
                    value={form.owner}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#D9E1E2] bg-white px-4 py-3 text-sm outline-none focus:border-[#1D546D]"
                  >
                    <option value="">Select Owner</option>
                    <option value="Rahul Sharma">
                      Rahul Sharma
                    </option>
                    <option value="Priya Shah">
                      Priya Shah
                    </option>
                    <option value="Amit Patel">
                      Amit Patel
                    </option>
                    <option value="Neha Patel">
                      Neha Patel
                    </option>
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#302D30]">
                    Due Date *
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#D9E1E2] px-4 py-3 text-sm outline-none focus:border-[#1D546D]"
                  />
                </div>

                {/* STATUS */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#302D30]">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#D9E1E2] bg-white px-4 py-3 text-sm outline-none focus:border-[#1D546D]"
                  >
                    <option value="Not Started">
                      Not Started
                    </option>
                    <option value="In Progress">
                      In Progress
                    </option>
                    <option value="Almost Done">
                      Almost Done
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>

                {/* PROGRESS */}
                <div className="md:col-span-2">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-[#302D30]">
                      Progress
                    </label>

                    <span className="text-sm font-bold text-[#1D546D]">
                      {form.progress}%
                    </span>
                  </div>

                  <input
                    type="range"
                    name="progress"
                    min="0"
                    max="100"
                    value={form.progress}
                    onChange={handleChange}
                    className="w-full accent-[#1D546D]"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#302D30]">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter milestone description..."
                    className="w-full resize-none rounded-lg border border-[#D9E1E2] px-4 py-3 text-sm outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#1D546D]/10"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex justify-end gap-3 border-t border-[#D9E1E2] pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-[#D9E1E2] px-5 py-2.5 text-sm font-medium text-[#302D30] transition hover:bg-[#F3F4F4]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#1D546D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#285F77]"
                >
                  {modalType === "add"
                    ? "Add Milestone"
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showModal &&
        modalType === "view" &&
        selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
            <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between bg-[#061E29] px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Milestone Details
                  </h2>

                  <p className="mt-1 text-sm text-[#B8C9CB]">
                    View milestone information
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="text-2xl text-[#B8C9CB] hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                <div>
                  <p className="text-sm text-[#777177]">
                    Milestone
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-[#302D30]">
                    {selectedMilestone.title}
                  </h3>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#F3F4F4] p-4">
                    <p className="text-xs text-[#777177]">
                      Project
                    </p>

                    <p className="mt-1 font-semibold text-[#302D30]">
                      {selectedMilestone.project}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F3F4F4] p-4">
                    <p className="text-xs text-[#777177]">
                      Owner
                    </p>

                    <p className="mt-1 font-semibold text-[#302D30]">
                      {selectedMilestone.owner}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F3F4F4] p-4">
                    <p className="text-xs text-[#777177]">
                      Due Date
                    </p>

                    <p className="mt-1 font-semibold text-[#302D30]">
                      {formatDate(selectedMilestone.dueDate)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F3F4F4] p-4">
                    <p className="text-xs text-[#777177]">
                      Status
                    </p>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        selectedMilestone.status
                      )}`}
                    >
                      {selectedMilestone.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#302D30]">
                      Progress
                    </span>

                    <span className="text-sm font-bold text-[#1D546D]">
                      {selectedMilestone.progress}%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-[#D9E1E2]">
                    <div
                      className="h-full rounded-full bg-[#1D546D]"
                      style={{
                        width: `${selectedMilestone.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-[#302D30]">
                    Description
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#777177]">
                    {selectedMilestone.description ||
                      "No description available."}
                  </p>
                </div>

                <div className="mt-6 flex justify-end border-t border-[#D9E1E2] pt-5">
                  <button
                    onClick={closeModal}
                    className="rounded-lg bg-[#061E29] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A2A38]"
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

export default Milestones;