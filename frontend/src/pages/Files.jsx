import { useMemo, useState } from "react";

const initialFiles = [
  {
    id: 1,
    name: "Website Requirements.pdf",
    type: "PDF",
    size: "2.4 MB",
    project: "Website Redesign",
    uploadedBy: "Rahul Sharma",
    date: "05 Sep 2026",
  },
  {
    id: 2,
    name: "Homepage Design.fig",
    type: "Design",
    size: "5.8 MB",
    project: "Website Redesign",
    uploadedBy: "Priya Shah",
    date: "04 Sep 2026",
  },
  {
    id: 3,
    name: "API Documentation.docx",
    type: "Document",
    size: "1.2 MB",
    project: "ERP Development",
    uploadedBy: "Neha Patel",
    date: "03 Sep 2026",
  },
  {
    id: 4,
    name: "Marketing Banner.png",
    type: "Image",
    size: "3.1 MB",
    project: "Marketing Campaign",
    uploadedBy: "Amit Patel",
    date: "02 Sep 2026",
  },
  {
    id: 5,
    name: "Mobile App Prototype.fig",
    type: "Design",
    size: "7.5 MB",
    project: "Mobile Application",
    uploadedBy: "Priya Shah",
    date: "01 Sep 2026",
  },
  {
    id: 6,
    name: "Database Schema.xlsx",
    type: "Spreadsheet",
    size: "856 KB",
    project: "ERP Development",
    uploadedBy: "Neha Patel",
    date: "30 Aug 2026",
  },
  {
    id: 7,
    name: "Project Report.pdf",
    type: "PDF",
    size: "4.2 MB",
    project: "Marketing Campaign",
    uploadedBy: "Admin",
    date: "29 Aug 2026",
  },
];

const Files = () => {
  const [files, setFiles] = useState(initialFiles);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [uploadedByFilter, setUploadedByFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "PDF",
    size: "",
    project: "",
    uploadedBy: "Admin",
  });

  const fileTypes = [
    "All",
    "PDF",
    "Document",
    "Image",
    "Design",
    "Spreadsheet",
  ];

  const uploadedByList = [
    "All",
    ...new Set(files.map((file) => file.uploadedBy)),
  ];

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        file.name.toLowerCase().includes(searchText) ||
        file.project.toLowerCase().includes(searchText) ||
        file.uploadedBy.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All" || file.type === typeFilter;

      const matchesUploader =
        uploadedByFilter === "All" ||
        file.uploadedBy === uploadedByFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesUploader
      );
    });
  }, [files, search, typeFilter, uploadedByFilter]);

  const totalSize = files.reduce((total, file) => {
    const sizeNumber = parseFloat(file.size);

    if (file.size.includes("KB")) {
      return total + sizeNumber / 1024;
    }

    return total + sizeNumber;
  }, 0);

  const pdfCount = files.filter(
    (file) => file.type === "PDF"
  ).length;

  const imageCount = files.filter(
    (file) => file.type === "Image"
  ).length;

  const documentCount = files.filter(
    (file) =>
      file.type === "Document" ||
      file.type === "Spreadsheet"
  ).length;

  const getFileIcon = (type) => {
    switch (type) {
      case "PDF":
        return "📕";
      case "Image":
        return "🖼️";
      case "Design":
        return "🎨";
      case "Document":
        return "📄";
      case "Spreadsheet":
        return "📊";
      default:
        return "📁";
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "PDF":
        return "bg-[#FBEAEA] text-[#B23A3A]";
      case "Image":
        return "bg-[#E9F4F1] text-[#2D6A63]";
      case "Design":
        return "bg-[#EEF0F6] text-[#4B5694]";
      case "Document":
        return "bg-[#E7F0F3] text-[#1D546D]";
      case "Spreadsheet":
        return "bg-[#F4F0E8] text-[#7A6338]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFile = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.size || !formData.project) {
      alert("Please fill all required fields.");
      return;
    }

    const newFile = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      size: formData.size,
      project: formData.project,
      uploadedBy: formData.uploadedBy,
      date: "07 Sep 2026",
    };

    setFiles((prev) => [newFile, ...prev]);

    setFormData({
      name: "",
      type: "PDF",
      size: "",
      project: "",
      uploadedBy: "Admin",
    });

    setShowModal(false);
  };

  const deleteFile = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (confirmDelete) {
      setFiles((prev) =>
        prev.filter((file) => file.id !== id)
      );

      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
    }
  };

  const handleDownload = (file) => {
    alert(
      `Demo download started for "${file.name}". Backend file storage will be connected later.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">
      {/* Header */}
      <div className="w-full bg-[#1D546D] px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-[#D9E1E2] mb-1">
              Workspace
            </p>

            <h1 className="text-3xl font-bold text-white">
              Files
            </h1>

            <p className="mt-1 text-sm text-[#D9E1E2]">
              Manage project and team files.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-lg bg-[#061E29] text-white text-sm font-medium hover:bg-[#0B2C3A] transition"
          >
            + Upload File
          </button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#777177]">
              Total Files
            </p>

            <h2 className="text-3xl font-bold text-[#302D30] mt-2">
              {files.length}
            </h2>

            <p className="text-xs text-[#5F9598] mt-2">
              Workspace files
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#777177]">
              PDF Files
            </p>

            <h2 className="text-3xl font-bold text-[#302D30] mt-2">
              {pdfCount}
            </h2>

            <p className="text-xs text-[#5F9598] mt-2">
              Documents in PDF format
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#777177]">
              Images
            </p>

            <h2 className="text-3xl font-bold text-[#302D30] mt-2">
              {imageCount}
            </h2>

            <p className="text-xs text-[#5F9598] mt-2">
              Image files
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#777177]">
              Documents
            </p>

            <h2 className="text-3xl font-bold text-[#302D30] mt-2">
              {documentCount}
            </h2>

            <p className="text-xs text-[#5F9598] mt-2">
              Docs & spreadsheets
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Search Files
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search file or project..."
                className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598] bg-[#F8F9F9]"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-[#302D30] mb-2">
                File Type
              </label>

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598] bg-[#F8F9F9]"
              >
                {fileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Uploaded By */}
            <div>
              <label className="block text-sm font-medium text-[#302D30] mb-2">
                Uploaded By
              </label>

              <select
                value={uploadedByFilter}
                onChange={(e) =>
                  setUploadedByFilter(e.target.value)
                }
                className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598] bg-[#F8F9F9]"
              >
                {uploadedByList.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#D9E1E2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-[#302D30]">
                Workspace Files
              </h2>

              <p className="text-sm text-[#777177] mt-1">
                {filteredFiles.length} file
                {filteredFiles.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <p className="text-sm text-[#777177]">
              Approx. size:{" "}
              <span className="font-semibold text-[#1D546D]">
                {totalSize.toFixed(1)} MB
              </span>
            </p>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="py-16 text-center px-6">
              <div className="text-5xl mb-4">
                📁
              </div>

              <h3 className="text-lg font-semibold text-[#302D30]">
                No files found
              </h3>

              <p className="text-sm text-[#777177] mt-2">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5EAEB]">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="px-6 py-5 hover:bg-[#F8F9F9] transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* File Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${getTypeStyle(
                          file.type
                        )}`}
                      >
                        {getFileIcon(file.type)}
                      </div>

                      {/* File Info */}
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[#302D30] truncate">
                          {file.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeStyle(
                              file.type
                            )}`}
                          >
                            {file.type}
                          </span>

                          <span className="text-xs text-[#777177]">
                            {file.size}
                          </span>

                          <span className="text-xs text-[#A0A0A0]">
                            •
                          </span>

                          <span className="text-xs text-[#777177]">
                            {file.project}
                          </span>
                        </div>

                        <p className="text-xs text-[#777177] mt-1">
                          Uploaded by{" "}
                          <span className="font-medium text-[#302D30]">
                            {file.uploadedBy}
                          </span>{" "}
                          • {file.date}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 lg:ml-4">
                      <button
                        onClick={() =>
                          setSelectedFile(file)
                        }
                        className="px-3.5 py-2 rounded-lg bg-[#E7F0F3] text-[#1D546D] text-sm font-medium hover:bg-[#D8E8EC] transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          handleDownload(file)
                        }
                        className="px-3.5 py-2 rounded-lg bg-[#E9F4F1] text-[#2D6A63] text-sm font-medium hover:bg-[#D8EBE6] transition"
                      >
                        Download
                      </button>

                      <button
                        onClick={() =>
                          deleteFile(file.id)
                        }
                        className="px-3.5 py-2 rounded-lg bg-[#FBEAEA] text-[#B23A3A] text-sm font-medium hover:bg-[#F5D7D7] transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Upload File Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#B8C9CB] uppercase tracking-wide">
                  Workspace Files
                </p>

                <h2 className="text-xl font-semibold text-white mt-1">
                  Upload File
                </h2>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleAddFile}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-[#302D30] mb-2">
                  File Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Project Report.pdf"
                  className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#302D30] mb-2">
                    File Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Document">
                      Document
                    </option>
                    <option value="Image">Image</option>
                    <option value="Design">Design</option>
                    <option value="Spreadsheet">
                      Spreadsheet
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#302D30] mb-2">
                    File Size *
                  </label>

                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="e.g. 2.5 MB"
                    className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#302D30] mb-2">
                  Project *
                </label>

                <input
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  placeholder="e.g. Website Redesign"
                  className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#302D30] mb-2">
                  Uploaded By
                </label>

                <select
                  name="uploadedBy"
                  value={formData.uploadedBy}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                >
                  <option value="Admin">Admin</option>
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

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-[#D9E1E2] text-[#302D30] text-sm font-medium hover:bg-[#F3F4F4] transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#1D546D] text-white text-sm font-medium hover:bg-[#285F77] transition"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View File Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#061E29] px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#B8C9CB] uppercase tracking-wide">
                  File Details
                </p>

                <h2 className="text-xl font-semibold text-white mt-1">
                  {selectedFile.name}
                </h2>
              </div>

              <button
                onClick={() => setSelectedFile(null)}
                className="text-white/80 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Details */}
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${getTypeStyle(
                    selectedFile.type
                  )}`}
                >
                  {getFileIcon(selectedFile.type)}
                </div>

                <div>
                  <p className="font-semibold text-[#302D30]">
                    {selectedFile.name}
                  </p>

                  <span
                    className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${getTypeStyle(
                      selectedFile.type
                    )}`}
                  >
                    {selectedFile.type}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#777177]">
                    File Size
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedFile.size}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#777177]">
                    Project
                  </p>

                  <p className="text-sm font-semibold text-[#1D546D] mt-1">
                    {selectedFile.project}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#777177]">
                    Uploaded By
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedFile.uploadedBy}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#777177]">
                    Upload Date
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedFile.date}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() =>
                    handleDownload(selectedFile)
                  }
                  className="flex-1 py-2.5 rounded-lg bg-[#1D546D] text-white font-medium hover:bg-[#285F77] transition"
                >
                  Download
                </button>

                <button
                  onClick={() => setSelectedFile(null)}
                  className="flex-1 py-2.5 rounded-lg border border-[#D9E1E2] text-[#302D30] font-medium hover:bg-[#F3F4F4] transition"
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

export default Files;