import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialEvents = [
  {
    id: 1,
    title: "Homepage Design Review",
    date: "2026-09-08",
    time: "10:00 AM",
    type: "Meeting",
    project: "Website Redesign",
    member: "Amit Patel",
  },
  {
    id: 2,
    title: "ERP Development Sprint",
    date: "2026-09-10",
    time: "11:30 AM",
    type: "Development",
    project: "ERP Development",
    member: "Neha Patel",
  },
  {
    id: 3,
    title: "Mobile UI Discussion",
    date: "2026-09-12",
    time: "02:00 PM",
    type: "Meeting",
    project: "Mobile Application",
    member: "Karan Mehta",
  },
  {
    id: 4,
    title: "Marketing Campaign Review",
    date: "2026-09-15",
    time: "03:30 PM",
    type: "Review",
    project: "Marketing Campaign",
    member: "Amit Patel",
  },
  {
    id: 5,
    title: "Website Project Deadline",
    date: "2026-09-20",
    time: "05:00 PM",
    type: "Deadline",
    project: "Website Redesign",
    member: "Team",
  },
];

const projects = [
  "Website Redesign",
  "Mobile Application",
  "Marketing Campaign",
  "ERP Development",
];

const teamMembers = [
  "Amit Patel",
  "Neha Patel",
  "Karan Mehta",
  "Priya Shah",
  "Rahul Mehta",
];

const eventTypes = [
  "Meeting",
  "Development",
  "Review",
  "Deadline",
  "Other",
];

function ManagerCalendar() {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const [events, setEvents] = useState(initialEvents);

  const [selectedDate, setSelectedDate] = useState(
    "2026-09-08"
  );

  const [showModal, setShowModal] = useState(false);

  const [viewEvent, setViewEvent] = useState(null);

  const [editEvent, setEditEvent] = useState(null);

  const [search, setSearch] = useState("");

  const [filterType, setFilterType] = useState("All");

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    type: "Meeting",
    project: "Website Redesign",
    member: "Amit Patel",
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const formatDate = (day) => {
    return `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.project
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.member
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        filterType === "All" ||
        event.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [events, search, filterType]);

  const selectedEvents = filteredEvents.filter(
    (event) => event.date === selectedDate
  );

  const totalEvents = events.length;

  const meetings = events.filter(
    (event) => event.type === "Meeting"
  ).length;

  const deadlines = events.filter(
    (event) => event.type === "Deadline"
  ).length;

  const projectEvents = events.filter(
    (event) => event.project
  ).length;

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const today = () => {
    const todayDate = new Date();

    setCurrentDate(
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      )
    );

    setSelectedDate(
      `${todayDate.getFullYear()}-${String(
        todayDate.getMonth() + 1
      ).padStart(2, "0")}-${String(
        todayDate.getDate()
      ).padStart(2, "0")}`
    );
  };

  const openAddModal = () => {
    setEditEvent(null);

    setForm({
      title: "",
      date: selectedDate,
      time: "",
      type: "Meeting",
      project: "Website Redesign",
      member: "Amit Patel",
    });

    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditEvent(event);

    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      project: event.project,
      member: event.member,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.time) {
      return;
    }

    if (editEvent) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editEvent.id
            ? {
                ...event,
                ...form,
              }
            : event
        )
      );
    } else {
      setEvents((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
        },
      ]);
    }

    setShowModal(false);
    setEditEvent(null);
  };

  const deleteEvent = (id) => {
    setEvents((prev) =>
      prev.filter((event) => event.id !== id)
    );

    setViewEvent(null);
  };

  const getEventColor = (type) => {
    if (type === "Meeting") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (type === "Development") {
      return "bg-[#E8F3EE] text-[#276749]";
    }

    if (type === "Review") {
      return "bg-[#F2EDF7] text-[#6B4F8A]";
    }

    if (type === "Deadline") {
      return "bg-[#F8ECEC] text-[#9B3D3D]";
    }

    return "bg-[#F3F4F4] text-[#302D30]";
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
            Manager Calendar
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
              Calendar
            </h2>

            <p className="text-sm text-[#5F9598] mt-1">
              Manage your team meetings, deadlines and project events.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="px-5 py-3 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold transition"
          >
            + Add Event
          </button>

        </div>


        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Total Events
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {totalEvents}
            </h3>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Meetings
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {meetings}
            </h3>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Deadlines
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {deadlines}
            </h3>
          </div>


          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5">
            <p className="text-sm text-[#5F9598]">
              Project Events
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {projectEvents}
            </h3>
          </div>

        </div>


        {/* ================= FILTERS ================= */}

        <div className="bg-white border border-[#D9E1E2] rounded-2xl p-5 mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex-1">

              <input
                type="text"
                placeholder="Search events, projects or team members..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none focus:border-[#5F9598]"
              />

            </div>

            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value)
              }
              className="h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm text-[#061E29] outline-none"
            >
              <option value="All">
                All Event Types
              </option>

              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

          </div>

        </div>


        {/* ================= CALENDAR + EVENTS ================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* CALENDAR */}

          <div className="xl:col-span-2 bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

            {/* CALENDAR HEADER */}

            <div className="px-5 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <button
                type="button"
                onClick={previousMonth}
                className="w-10 h-10 rounded-xl border border-[#D9E1E2] text-[#1D546D] hover:bg-[#F3F4F4] text-xl"
              >
                ‹
              </button>

              <div className="text-center">

                <h3 className="text-lg font-bold text-[#061E29]">
                  {monthName} {year}
                </h3>

                <button
                  type="button"
                  onClick={today}
                  className="text-xs text-[#1D546D] hover:underline mt-1"
                >
                  Today
                </button>

              </div>

              <button
                type="button"
                onClick={nextMonth}
                className="w-10 h-10 rounded-xl border border-[#D9E1E2] text-[#1D546D] hover:bg-[#F3F4F4] text-xl"
              >
                ›
              </button>

            </div>


            {/* WEEK DAYS */}

            <div className="grid grid-cols-7 border-b border-[#D9E1E2]">

              {[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ].map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-xs font-semibold text-[#5F9598]"
                >
                  {day}
                </div>
              ))}

            </div>


            {/* DAYS */}

            <div className="grid grid-cols-7">

              {calendarDays.map((day, index) => {

                if (!day) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-[110px] border-r border-b border-[#D9E1E2] bg-[#FAFAFA]"
                    />
                  );
                }

                const date = formatDate(day);

                const dayEvents = events.filter(
                  (event) =>
                    event.date === date
                );

                const isSelected =
                  selectedDate === date;

                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() =>
                      setSelectedDate(date)
                    }
                    className={`min-h-[110px] p-2 text-left border-r border-b border-[#D9E1E2] hover:bg-[#F3F4F4] transition ${
                      isSelected
                        ? "bg-[#EAF1F2]"
                        : "bg-white"
                    }`}
                  >

                    <div className="flex items-center justify-between mb-2">

                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold ${
                          isSelected
                            ? "bg-[#1D546D] text-white"
                            : "text-[#302D30]"
                        }`}
                      >
                        {day}
                      </span>

                      {dayEvents.length > 0 && (
                        <span className="text-[10px] text-[#5F9598]">
                          {dayEvents.length}
                        </span>
                      )}

                    </div>


                    <div className="space-y-1">

                      {dayEvents
                        .slice(0, 2)
                        .map((event) => (
                          <div
                            key={event.id}
                            className={`px-2 py-1 rounded-lg text-[10px] font-medium truncate ${getEventColor(
                              event.type
                            )}`}
                          >
                            {event.title}
                          </div>
                        ))}

                      {dayEvents.length > 2 && (
                        <p className="text-[10px] text-[#5F9598] px-1">
                          +{dayEvents.length - 2} more
                        </p>
                      )}

                    </div>

                  </button>
                );
              })}

            </div>

          </div>


          {/* SELECTED DAY EVENTS */}

          <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

            <div className="px-5 py-5 border-b border-[#D9E1E2]">

              <p className="text-xs text-[#5F9598]">
                Selected Date
              </p>

              <h3 className="text-lg font-bold text-[#061E29] mt-1">
                {new Date(
                  `${selectedDate}T00:00:00`
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </h3>

            </div>


            <div className="p-5">

              {selectedEvents.length === 0 ? (

                <div className="text-center py-12">

                  <div className="w-12 h-12 rounded-xl bg-[#F3F4F4] mx-auto flex items-center justify-center text-[#5F9598] text-xl">
                    +
                  </div>

                  <p className="text-sm font-semibold text-[#061E29] mt-4">
                    No events
                  </p>

                  <p className="text-xs text-[#5F9598] mt-1">
                    Nothing scheduled for this day.
                  </p>

                  <button
                    type="button"
                    onClick={openAddModal}
                    className="mt-4 text-sm font-semibold text-[#1D546D] hover:underline"
                  >
                    Add an event
                  </button>

                </div>

              ) : (

                <div className="space-y-4">

                  {selectedEvents.map(
                    (event) => (
                      <div
                        key={event.id}
                        className="border border-[#D9E1E2] rounded-xl p-4"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <span
                              className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold ${getEventColor(
                                event.type
                              )}`}
                            >
                              {event.type}
                            </span>

                            <h4 className="text-sm font-semibold text-[#061E29] mt-3">
                              {event.title}
                            </h4>

                            <p className="text-xs text-[#5F9598] mt-2">
                              {event.time}
                            </p>

                            <p className="text-xs text-[#5F9598] mt-1">
                              {event.project}
                            </p>

                            <p className="text-xs text-[#5F9598] mt-1">
                              {event.member}
                            </p>

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setViewEvent(event)
                            }
                            className="text-xs font-semibold text-[#1D546D] hover:underline"
                          >
                            View
                          </button>

                        </div>

                      </div>
                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </main>


      {/* ================= ADD / EDIT MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 bg-[#061E29]/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <div>
                <h3 className="text-lg font-bold text-[#061E29]">
                  {editEvent
                    ? "Edit Event"
                    : "Add Event"}
                </h3>

                <p className="text-xs text-[#5F9598] mt-1">
                  Add a meeting, deadline or project activity.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="text-[#5F9598] hover:text-[#061E29] text-xl"
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >

              <div>

                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Event Title
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
                  placeholder="Enter event title"
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#5F9598]"
                />

              </div>


              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Date
                  </label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#5F9598]"
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-[#302D30] mb-2">
                    Time
                  </label>

                  <input
                    type="time"
                    value={
                      form.time.includes(":")
                        ? form.time
                            .replace(" AM", "")
                            .replace(" PM", "")
                        : form.time
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        time: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none focus:border-[#5F9598]"
                  />

                </div>

              </div>


              <div>

                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Event Type
                </label>

                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value,
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                >
                  {eventTypes.map(
                    (type) => (
                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    )
                  )}
                </select>

              </div>


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
                  {projects.map(
                    (project) => (
                      <option
                        key={project}
                        value={project}
                      >
                        {project}
                      </option>
                    )
                  )}
                </select>

              </div>


              <div>

                <label className="block text-sm font-semibold text-[#302D30] mb-2">
                  Team Member
                </label>

                <select
                  value={form.member}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      member: e.target.value,
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-[#F3F4F4] text-sm outline-none"
                >
                  <option value="Team">
                    Team
                  </option>

                  {teamMembers.map(
                    (member) => (
                      <option
                        key={member}
                        value={member}
                      >
                        {member}
                      </option>
                    )
                  )}
                </select>

              </div>


              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-2.5 rounded-xl border border-[#D9E1E2] text-[#302D30] text-sm font-semibold hover:bg-[#F3F4F4]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold"
                >
                  {editEvent
                    ? "Save Changes"
                    : "Add Event"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* ================= VIEW MODAL ================= */}

      {viewEvent && (
        <div className="fixed inset-0 bg-[#061E29]/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">

            <div className="px-6 py-5 border-b border-[#D9E1E2] flex items-center justify-between">

              <h3 className="text-lg font-bold text-[#061E29]">
                Event Details
              </h3>

              <button
                type="button"
                onClick={() =>
                  setViewEvent(null)
                }
                className="text-[#5F9598] hover:text-[#061E29] text-xl"
              >
                ×
              </button>

            </div>


            <div className="p-6">

              <span
                className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${getEventColor(
                  viewEvent.type
                )}`}
              >
                {viewEvent.type}
              </span>

              <h3 className="text-xl font-bold text-[#061E29] mt-4">
                {viewEvent.title}
              </h3>

              <div className="mt-5 space-y-3">

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Date
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewEvent.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Time
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewEvent.time}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Project
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewEvent.project}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#5F9598]">
                    Team Member
                  </p>

                  <p className="text-sm font-semibold text-[#302D30] mt-1">
                    {viewEvent.member}
                  </p>
                </div>

              </div>


              <div className="flex justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={() => {
                    setViewEvent(null);
                    openEditModal(viewEvent);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] hover:bg-[#286B86] text-white text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteEvent(viewEvent.id)
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

export default ManagerCalendar;