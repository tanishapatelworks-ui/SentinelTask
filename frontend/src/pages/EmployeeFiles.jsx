import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// ===============================
// MINIMAL ICONS
// ===============================

const FileIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8" />
    <path d="M8 17h6" />
  </svg>
);

const FolderIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-10Z" />
  </svg>
);

const UploadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 16V4" />
    <path d="m7 9 5-5 5 5" />
    <path d="M4 20h16" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4v12" />
    <path d="m7 11 5 5 5-5" />
    <path d="M4 20h16" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 7h16" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M6 7l1 14h10l1-14" />
    <path d="M9 7V4h6v3" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

// ===============================
// EMPLOYEE FILES
// ===============================

const EmployeeFiles = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedFile, setSelectedFile] = useState(null);

  // ===============================
  // DUMMY FILES
  // ===============================

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Homepage UI Design.fig",
      type: "Design",
      project: "Website Redesign",
      size: "2.4 MB",
      uploadedBy: "Rahul Mehta",
      date: "06 Sep 2026",
    },
    {
      id: 2,
      name: "Login API Documentation.pdf",
      type: "Document",
      project: "Mobile App Development",
      size: "1.8 MB",
      uploadedBy: "Priya Shah",
      date: "05 Sep 2026",
    },
    {
      id: 3,
      name: "ERP Database Schema.pdf",
      type: "Document",
      project: "ERP Development",
      size: "950 KB",
      uploadedBy: "Amit Patel",
      date: "04 Sep 2026",
    },
    {
      id: 4,
      name: "Security Audit Report.pdf",
      type: "Report",
      project: "Security Audit",
      size: "3.2 MB",
      uploadedBy: "Neha Joshi",
      date: "03 Sep 2026",
    },
    {
      id: 5,
      name: "Product UI Assets.zip",
      type: "Archive",
      project: "E-Commerce Platform",
      size: "8.5 MB",
      uploadedBy: "Karan Shah",
      date: "02 Sep 2026",
    },
    {
      id: 6,
      name: "Testing Checklist.xlsx",
      type: "Spreadsheet",
      project: "Testing & QA",
      size: "620 KB",
      uploadedBy: "Pooja Patel",
      date: "01 Sep 2026",
    },
  ]);

  // ===============================
  // FILTER
  // ===============================

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch =
        file.name.toLowerCase().includes(search.toLowerCase()) ||
        file.project.toLowerCase().includes(search.toLowerCase()) ||
        file.uploadedBy.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || file.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [files, search, typeFilter]);

  // ===============================
  // DELETE
  // ===============================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!confirmed) return;

    setFiles((currentFiles) =>
      currentFiles.filter((file) => file.id !== id)
    );

    setSelectedFile(null);
  };

  // ===============================
  // DOWNLOAD
  // ===============================

  const handleDownload = (file) => {
    alert(`Download started for "${file.name}"`);
  };

  // ===============================
  // TYPE STYLE
  // ===============================

  const getTypeStyle = (type) => {
    if (type === "Design") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (type === "Document") {
      return "bg-[#EEF4F5] text-[#397477]";
    }

    if (type === "Report") {
      return "bg-[#FFF4E5] text-[#A86400]";
    }

    if (type === "Archive") {
      return "bg-[#F3F4F4] text-[#5F6668]";
    }

    return "bg-[#EAF5F5] text-[#397477]";
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* ================= HEADER ================= */}

      <header className="h-20 bg-[#061E29] text-white flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">

        <div>
          <p className="text-sm text-[#B8C9CB]">
            Employee Workspace
          </p>

          <h1 className="text-xl font-semibold">
            My Files
          </h1>
        </div>

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() => navigate("/employee-dashboard")}
            className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
          >
            Dashboard
          </button>

          <div className="hidden sm:flex w-10 h-10 rounded-full bg-[#1D546D] items-center justify-center font-semibold">
            E
          </div>

        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}

      <main className="p-6 lg:p-8">

        {/* PAGE HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">

          <div>
            <p className="text-sm font-medium text-[#1D546D]">
              Workspace Files
            </p>

            <h2 className="text-3xl font-semibold text-[#061E29] mt-1">
              My Files
            </h2>

            <p className="text-sm text-[#5F9598] mt-2">
              Access and manage files related to your assigned projects.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("File upload feature will be connected to the backend later.")}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
          >
            <UploadIcon />
            Upload File
          </button>

        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <p className="text-sm text-[#5F9598]">
                Total Files
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                <FileIcon />
              </span>

            </div>

            <h3 className="text-3xl font-semibold text-[#061E29] mt-4">
              {files.length}
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              Available files
            </p>

          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <p className="text-sm text-[#5F9598]">
                Documents
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                <FileIcon />
              </span>

            </div>

            <h3 className="text-3xl font-semibold text-[#061E29] mt-4">
              {files.filter((file) => file.type === "Document").length}
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              Project documents
            </p>

          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <p className="text-sm text-[#5F9598]">
                Reports
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                <FileIcon />
              </span>

            </div>

            <h3 className="text-3xl font-semibold text-[#061E29] mt-4">
              {files.filter((file) => file.type === "Report").length}
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              Project reports
            </p>

          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <p className="text-sm text-[#5F9598]">
                Projects
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                <FolderIcon />
              </span>

            </div>

            <h3 className="text-3xl font-semibold text-[#061E29] mt-4">
              {new Set(files.map((file) => file.project)).size}
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              Projects with files
            </p>

          </div>

        </div>

        {/* ================= FILE SECTION ================= */}

        <section className="bg-white border border-[#D9E1E2] rounded-2xl shadow-sm">

          {/* SECTION HEADER */}

          <div className="p-6 border-b border-[#D9E1E2]">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h2 className="text-lg font-semibold text-[#061E29]">
                  Project Files
                </h2>

                <p className="text-xs text-[#5F9598] mt-1">
                  Files shared with your projects
                </p>
              </div>

              {/* SEARCH */}

              <div className="relative w-full lg:w-80">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F9598]">
                  <SearchIcon />
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search files..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D9E1E2] bg-[#F8FAFA] text-sm text-[#302D30] outline-none focus:border-[#1D546D] focus:ring-1 focus:ring-[#1D546D]"
                />

              </div>

            </div>

            {/* FILTER */}

            <div className="flex flex-wrap gap-2 mt-5">

              {[
                "All",
                "Document",
                "Design",
                "Report",
                "Archive",
                "Spreadsheet",
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
                    typeFilter === type
                      ? "bg-[#1D546D] text-white"
                      : "bg-[#F3F4F4] text-[#5F6668] hover:bg-[#E8F1F3] hover:text-[#1D546D]"
                  }`}
                >
                  {type}
                </button>
              ))}

            </div>

          </div>

          {/* ================= FILE LIST ================= */}

          <div className="p-6">

            {filteredFiles.length === 0 ? (
              <div className="py-12 text-center">

                <div className="w-12 h-12 mx-auto rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center mb-4">
                  <FileIcon />
                </div>

                <h3 className="text-base font-semibold text-[#061E29]">
                  No files found
                </h3>

                <p className="text-sm text-[#7B8588] mt-1">
                  Try changing your search or filter.
                </p>

              </div>
            ) : (
              <div className="space-y-3">

                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="border border-[#D9E1E2] rounded-xl p-4 hover:border-[#1D546D] hover:shadow-sm transition"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                      {/* FILE INFO */}

                      <div className="flex items-center gap-4 flex-1 min-w-0">

                        <div className="w-11 h-11 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center flex-shrink-0">
                          <FileIcon />
                        </div>

                        <div className="min-w-0">

                          <h3 className="text-sm font-semibold text-[#061E29] truncate">
                            {file.name}
                          </h3>

                          <div className="flex flex-wrap items-center gap-2 mt-1">

                            <span className="text-xs text-[#5F9598]">
                              {file.project}
                            </span>

                            <span className="text-[#B8C9CB]">
                              •
                            </span>

                            <span className="text-xs text-[#7B8588]">
                              {file.size}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* TYPE */}

                      <span
                        className={`self-start lg:self-auto px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(
                          file.type
                        )}`}
                      >
                        {file.type}
                      </span>

                      {/* META */}

                      <div className="lg:w-40">

                        <p className="text-xs text-[#7B8588]">
                          Uploaded by
                        </p>

                        <p className="text-sm font-medium text-[#302D30] mt-1">
                          {file.uploadedBy}
                        </p>

                        <p className="text-xs text-[#7B8588] mt-1">
                          {file.date}
                        </p>

                      </div>

                      {/* ACTIONS */}

                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() => setSelectedFile(file)}
                          className="w-9 h-9 rounded-lg bg-[#E7F0F1] text-[#1D546D] border border-[#D9E1E2] flex items-center justify-center hover:bg-[#1D546D] hover:text-white transition"
                          title="View"
                        >
                          <EyeIcon />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownload(file)}
                          className="w-9 h-9 rounded-lg bg-[#F3F4F4] text-[#1D546D] border border-[#D9E1E2] flex items-center justify-center hover:bg-[#1D546D] hover:text-white transition"
                          title="Download"
                        >
                          <DownloadIcon />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(file.id)}
                          className="w-9 h-9 rounded-lg bg-[#FFF5F5] text-[#A33A3A] border border-[#F0DADA] flex items-center justify-center hover:bg-[#A33A3A] hover:text-white transition"
                          title="Delete"
                        >
                          <TrashIcon />
                        </button>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </section>

      </main>

      {/* ================= VIEW MODAL ================= */}

      {selectedFile && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D9E1E2]">

              <div>
                <h2 className="text-lg font-semibold text-[#061E29]">
                  File Details
                </h2>

                <p className="text-xs text-[#5F9598] mt-1">
                  Information about the selected file
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="w-9 h-9 rounded-lg bg-[#F3F4F4] text-[#5F6668] hover:bg-[#E7F0F1] hover:text-[#1D546D] transition text-lg"
              >
                ×
              </button>

            </div>

            <div className="p-6">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-12 h-12 rounded-xl bg-[#E8F1F3] text-[#1D546D] flex items-center justify-center">
                  <FileIcon />
                </div>

                <div className="min-w-0">

                  <h3 className="text-base font-semibold text-[#061E29] break-words">
                    {selectedFile.name}
                  </h3>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getTypeStyle(
                      selectedFile.type
                    )}`}
                  >
                    {selectedFile.type}
                  </span>

                </div>

              </div>

              <div className="space-y-4">

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-[#7B8588]">
                    Project
                  </span>

                  <span className="text-sm font-medium text-[#302D30] text-right">
                    {selectedFile.project}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-[#7B8588]">
                    File Size
                  </span>

                  <span className="text-sm font-medium text-[#302D30]">
                    {selectedFile.size}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-[#7B8588]">
                    Uploaded By
                  </span>

                  <span className="text-sm font-medium text-[#302D30]">
                    {selectedFile.uploadedBy}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-[#7B8588]">
                    Upload Date
                  </span>

                  <span className="text-sm font-medium text-[#302D30]">
                    {selectedFile.date}
                  </span>
                </div>

              </div>

            </div>

            <div className="px-6 py-4 border-t border-[#D9E1E2] flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="px-4 py-2.5 rounded-lg border border-[#D9E1E2] text-[#5F6668] text-sm font-medium hover:bg-[#F3F4F4] transition"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleDownload(selectedFile)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
              >
                <DownloadIcon />
                Download
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default EmployeeFiles;