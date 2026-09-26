
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFiles = [
  {
    id: 1,
    name: "Homepage UI Design.pdf",
    type: "Document",
    size: "2.4 MB",
    uploadedBy: "Rahul Mehta",
    project: "Website Redesign",
    date: "2026-09-07",
  },
  {
    id: 2,
    name: "Mobile App Wireframe.png",
    type: "Image",
    size: "1.8 MB",
    uploadedBy: "Priya Shah",
    project: "Mobile App Development",
    date: "2026-09-06",
  },
  {
    id: 3,
    name: "API Documentation.docx",
    type: "Document",
    size: "856 KB",
    uploadedBy: "Amit Patel",
    project: "ERP Development",
    date: "2026-09-05",
  },
  {
    id: 4,
    name: "Security Report.pdf",
    type: "Document",
    size: "3.2 MB",
    uploadedBy: "Neha Joshi",
    project: "Security Audit",
    date: "2026-09-04",
  },
  {
    id: 5,
    name: "Dashboard Screenshot.jpg",
    type: "Image",
    size: "940 KB",
    uploadedBy: "Karan Shah",
    project: "E-Commerce Platform",
    date: "2026-09-03",
  },
  {
    id: 6,
    name: "Project Notes.txt",
    type: "Other",
    size: "24 KB",
    uploadedBy: "Manager",
    project: "Website Redesign",
    date: "2026-09-02",
  },
  {
    id: 7,
    name: "Database Schema.png",
    type: "Image",
    size: "1.1 MB",
    uploadedBy: "Rahul Mehta",
    project: "ERP Development",
    date: "2026-09-01",
  },
  {
    id: 8,
    name: "Testing Checklist.xlsx",
    type: "Document",
    size: "420 KB",
    uploadedBy: "Priya Shah",
    project: "Mobile App Development",
    date: "2026-08-30",
  },
];

function ManagerFiles() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState(initialFiles);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedFile, setSelectedFile] = useState(null);

  const totalFiles = files.length;

  const documentFiles = files.filter(
    (file) => file.type === "Document"
  ).length;

  const imageFiles = files.filter(
    (file) => file.type === "Image"
  ).length;

  const otherFiles = files.filter(
    (file) => file.type === "Other"
  ).length;

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        file.name.toLowerCase().includes(searchText) ||
        file.uploadedBy.toLowerCase().includes(searchText) ||
        file.project.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All" || file.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [files, search, typeFilter]);

  const deleteFile = (id) => {
    setFiles((prev) =>
      prev.filter((file) => file.id !== id)
    );

    setSelectedFile(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files?.[0];

    if (!uploadedFile) return;

    const extension =
      uploadedFile.name.split(".").pop()?.toLowerCase() || "";

    let fileType = "Other";

    if (
      ["pdf", "doc", "docx", "xls", "xlsx", "txt", "ppt", "pptx"].includes(
        extension
      )
    ) {
      fileType = "Document";
    }

    if (
      ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
        extension
      )
    ) {
      fileType = "Image";
    }

    const newFile = {
      id: Date.now(),
      name: uploadedFile.name,
      type: fileType,
      size:
        uploadedFile.size < 1024 * 1024
          ? `${Math.max(
              1,
              Math.round(uploadedFile.size / 1024)
            )} KB`
          : `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedBy: "Manager",
      project: "Manager Upload",
      date: new Date().toISOString().split("T")[0],
    };

    setFiles((prev) => [newFile, ...prev]);

    event.target.value = "";
  };

  const downloadFile = (file) => {
    const content = `SentinelTask File\n\nFile Name: ${file.name}\nType: ${file.type}\nSize: ${file.size}\nUploaded By: ${file.uploadedBy}\nProject: ${file.project}\nDate: ${file.date}`;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const getFileIcon = (type) => {
    if (type === "Document") return "D";
    if (type === "Image") return "I";

    return "F";
  };

  const getFileStyle = (type) => {
    if (type === "Document") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (type === "Image") {
      return "bg-[#E8F3EE] text-[#276749]";
    }

    return "bg-[#F2EDF7] text-[#6B4F8A]";
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
            Manager Files
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

      {/* Hidden file input */}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* ================= MAIN ================= */}

      <main className="p-6 lg:p-8">

        {/* PAGE TITLE */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">

          <div>
            <h2 className="text-2xl font-bold text-[#061E29]">
              Files
            </h2>

            <p className="text-sm text-[#5F9598] mt-1">
              Manage project documents, images and shared files.
            </p>
          </div>

          <button
            type="button"
            onClick={handleUploadClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition shadow-sm"
          >
            <span className="text-lg leading-none">
              +
            </span>

            Upload File
          </button>

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Total Files
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalFiles}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              All uploaded files
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Documents
            </p>

            <h3 className="text-3xl font-bold text-[#1D546D] mt-2">
              {documentFiles}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              PDF, Word, Excel and more
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Images
            </p>

            <h3 className="text-3xl font-bold text-[#276749] mt-2">
              {imageFiles}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Project images and designs
            </p>
          </div>

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Other Files
            </p>

            <h3 className="text-3xl font-bold text-[#6B4F8A] mt-2">
              {otherFiles}
            </h3>

            <p className="text-xs text-[#8A999B] mt-2">
              Other file formats
            </p>
          </div>

        </div>

        {/* ================= FILTERS ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none focus:border-[#5F9598]"
            />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none"
            >
              <option value="All">
                All Files
              </option>

              <option value="Document">
                Documents
              </option>

              <option value="Image">
                Images
              </option>

              <option value="Other">
                Other
              </option>
            </select>

          </div>

        </div>

        {/* ================= FILE LIST ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

          <div className="px-5 py-5 border-b border-[#D9E1E2]">

            <h3 className="text-lg font-bold text-[#061E29]">
              Project Files
            </h3>

            <p className="text-xs text-[#5F9598] mt-1">
              {filteredFiles.length}{" "}
              {filteredFiles.length === 1 ? "file" : "files"} found
            </p>

          </div>

          {filteredFiles.length === 0 ? (

            <div className="text-center py-16 px-5">

              <div className="w-14 h-14 rounded-2xl bg-[#F3F4F4] mx-auto flex items-center justify-center text-[#5F9598] text-xl font-bold">
                F
              </div>

              <p className="text-sm font-semibold text-[#061E29] mt-4">
                No files found
              </p>

              <p className="text-xs text-[#5F9598] mt-1">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-[#D9E1E2]">

              {filteredFiles.map((file) => (

                <div
                  key={file.id}
                  className="p-5 hover:bg-[#FAFAFA] transition"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                    {/* FILE ICON */}

                    <div
                      className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold ${getFileStyle(
                        file.type
                      )}`}
                    >
                      {getFileIcon(file.type)}
                    </div>

                    {/* FILE CONTENT */}

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="text-sm font-bold text-[#061E29] truncate max-w-[300px]">
                          {file.name}
                        </span>

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold ${getFileStyle(
                            file.type
                          )}`}
                        >
                          {file.type}
                        </span>

                      </div>

                      <div className="flex flex-wrap gap-4 mt-2">

                        <p className="text-[10px] text-[#8A999B]">
                          Size:{" "}
                          <span className="font-semibold text-[#302D30]">
                            {file.size}
                          </span>
                        </p>

                        <p className="text-[10px] text-[#8A999B]">
                          Uploaded by:{" "}
                          <span className="font-semibold text-[#302D30]">
                            {file.uploadedBy}
                          </span>
                        </p>

                        <p className="text-[10px] text-[#8A999B]">
                          Project:{" "}
                          <span className="font-semibold text-[#302D30]">
                            {file.project}
                          </span>
                        </p>

                        <p className="text-[10px] text-[#8A999B]">
                          Date:{" "}
                          <span className="font-semibold text-[#302D30]">
                            {file.date}
                          </span>
                        </p>

                      </div>

                    </div>

                    {/* ================= ACTIONS ================= */}

                    <div className="flex items-center gap-2 flex-shrink-0">

                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() => setSelectedFile(file)}
                        className="inline-flex items-center justify-center gap-1.5 min-w-[72px] h-9 px-3 rounded-lg bg-[#E7F0F1] text-[#1D546D] border border-[#C9DDDF] text-xs font-semibold hover:bg-[#1D546D] hover:text-white hover:border-[#1D546D] transition-all duration-200"
                      >
                        <span className="text-sm">
                          👁
                        </span>

                        View
                      </button>

                      {/* DOWNLOAD */}

                      <button
                        type="button"
                        onClick={() => downloadFile(file)}
                        className="inline-flex items-center justify-center gap-1.5 min-w-[88px] h-9 px-3 rounded-lg bg-[#F3F7F7] text-[#1D546D] border border-[#D9E1E2] text-xs font-semibold hover:bg-[#1D546D] hover:text-white hover:border-[#1D546D] transition-all duration-200"
                      >
                        <span className="text-sm">
                          ↓
                        </span>

                        Download
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() => deleteFile(file.id)}
                        className="inline-flex items-center justify-center gap-1.5 min-w-[78px] h-9 px-3 rounded-lg bg-[#FFF5F5] text-[#A33A3A] border border-[#F0CCCC] text-xs font-semibold hover:bg-[#A33A3A] hover:text-white hover:border-[#A33A3A] transition-all duration-200"
                      >
                        <span className="text-sm">
                          🗑
                        </span>

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

      {/* ================= VIEW MODAL ================= */}

      {selectedFile && (

        <div className="fixed inset-0 bg-[#061E29]/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">

            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <div className="min-w-0 pr-4">

                <p className="text-xs text-[#5F9598]">
                  File Details
                </p>

                <h3 className="text-lg font-bold text-[#061E29] mt-1 truncate">
                  {selectedFile.name}
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-[#5F9598] hover:bg-[#F3F4F4] hover:text-[#061E29] text-xl transition"
              >
                ×
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="p-6">

              <div className="flex items-center gap-3 mb-5">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold ${getFileStyle(
                    selectedFile.type
                  )}`}
                >
                  {getFileIcon(selectedFile.type)}
                </div>

                <div>

                  <span
                    className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${getFileStyle(
                      selectedFile.type
                    )}`}
                  >
                    {selectedFile.type}
                  </span>

                  <p className="text-xs text-[#8A999B] mt-1">
                    {selectedFile.size}
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Uploaded By
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedFile.uploadedBy}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Project
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedFile.project}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Upload Date
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {selectedFile.date}
                  </p>
                </div>

              </div>

              {/* MODAL ACTIONS */}

              <div className="flex justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={() => downloadFile(selectedFile)}
                  className="inline-flex items-center justify-center gap-2 min-w-[105px] h-10 px-4 rounded-xl bg-[#E7F0F1] border border-[#C9DDDF] text-[#1D546D] text-sm font-semibold hover:bg-[#1D546D] hover:text-white hover:border-[#1D546D] transition-all duration-200"
                >
                  <span>
                    ↓
                  </span>

                  Download
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteFile(selectedFile.id)
                  }
                  className="inline-flex items-center justify-center gap-2 min-w-[95px] h-10 px-4 rounded-xl bg-[#FFF5F5] border border-[#F0CCCC] text-[#A33A3A] text-sm font-semibold hover:bg-[#A33A3A] hover:text-white hover:border-[#A33A3A] transition-all duration-200"
                >
                  <span>
                    🗑
                  </span>

                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="inline-flex items-center justify-center min-w-[75px] h-10 px-4 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition-all duration-200"
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
}

export default ManagerFiles;

