import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeCalendar = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Homepage UI Deadline",
      date: "2026-09-10",
      time: "05:00 PM",
      type: "Task",
      project: "Website Redesign",
      description: "Complete and submit the homepage UI design.",
    },
    {
      id: 2,
      title: "Mobile App Team Meeting",
      date: "2026-09-12",
      time: "11:00 AM",
      type: "Meeting",
      project: "Mobile App Development",
      description: "Weekly project discussion with the development team.",
    },
    {
      id: 3,
      title: "Login Validation Deadline",
      date: "2026-09-12",
      time: "06:00 PM",
      type: "Task",
      project: "Mobile App Development",
      description: "Fix and test login validation functionality.",
    },
    {
      id: 4,
      title: "API Documentation Deadline",
      date: "2026-09-15",
      time: "05:00 PM",
      type: "Task",
      project: "ERP Development",
      description: "Prepare and submit the API documentation.",
    },
    {
      id: 5,
      title: "ERP Project Milestone",
      date: "2026-09-18",
      time: "03:00 PM",
      type: "Milestone",
      project: "ERP Development",
      description: "First development milestone review.",
    },
    {
      id: 6,
      title: "E-Commerce UI Review",
      date: "2026-09-20",
      time: "12:00 PM",
      type: "Meeting",
      project: "E-Commerce Platform",
      description: "Review product card and dashboard UI.",
    },
    {
      id: 7,
      title: "Security Audit Review",
      date: "2026-09-22",
      time: "04:00 PM",
      type: "Milestone",
      project: "Security Audit",
      description: "Final security audit review.",
    },
    {
      id: 8,
      title: "Testing & QA Deadline",
      date: "2026-09-25",
      time: "05:00 PM",
      type: "Task",
      project: "Testing & QA",
      description: "Complete assigned testing checklist.",
    },
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getEventsForDay = (day) => {
    if (!day) return [];

    const dateString = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    return events.filter((event) => event.date === dateString);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 8, 1));
  };

  const getEventStyle = (type) => {
    if (type === "Meeting") {
      return "bg-[#E7F0F1] text-[#1D546D]";
    }

    if (type === "Milestone") {
      return "bg-[#FFF4DD] text-[#8A641D]";
    }

    return "bg-[#E8F4EA] text-[#2F6B3B]";
  };

  const getTypeIcon = (type) => {
    if (type === "Meeting") return "👥";
    if (type === "Milestone") return "🎯";
    return "📋";
  };

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* ================= HEADER ================= */}

      <header className="h-[76px] bg-[#061E29] text-white px-8 flex items-center justify-between sticky top-0 z-20">

        <div>
          <p className="text-xs text-[#B8C9CB] uppercase tracking-wider">
            Employee Workspace
          </p>

          <h1 className="text-xl font-semibold">
            My Calendar
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

      {/* ================= CONTENT ================= */}

      <main className="p-8">

        {/* Heading */}

        <div className="mb-7">

          <h2 className="text-2xl font-bold text-[#061E29]">
            Employee Calendar
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            View your tasks, meetings and project milestones
          </p>

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">

          <div className="bg-white rounded-xl border border-[#D9E1E2] p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Events
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {events.length}
            </h3>

            <p className="text-xs text-[#1D546D] mt-2">
              Scheduled events
            </p>

          </div>

          <div className="bg-white rounded-xl border border-[#D9E1E2] p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Tasks
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {events.filter((event) => event.type === "Task").length}
            </h3>

            <p className="text-xs text-[#2F6B3B] mt-2">
              Task deadlines
            </p>

          </div>

          <div className="bg-white rounded-xl border border-[#D9E1E2] p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Meetings & Milestones
            </p>

            <h3 className="text-3xl font-bold text-[#061E29] mt-2">
              {
                events.filter(
                  (event) =>
                    event.type === "Meeting" ||
                    event.type === "Milestone"
                ).length
              }
            </h3>

            <p className="text-xs text-[#8A641D] mt-2">
              Important events
            </p>

          </div>

        </div>

        {/* ================= CALENDAR ================= */}

        <div className="bg-white rounded-xl border border-[#D9E1E2] shadow-sm overflow-hidden">

          {/* Calendar Header */}

          <div className="p-6 border-b border-[#D9E1E2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-3">

              <button
                onClick={previousMonth}
                className="w-10 h-10 rounded-lg border border-[#D9E1E2] text-[#1D546D] hover:bg-[#E7F0F1] text-xl"
              >
                ‹
              </button>

              <h2 className="text-xl font-bold text-[#061E29] min-w-[170px] text-center">
                {monthName} {year}
              </h2>

              <button
                onClick={nextMonth}
                className="w-10 h-10 rounded-lg border border-[#D9E1E2] text-[#1D546D] hover:bg-[#E7F0F1] text-xl"
              >
                ›
              </button>

            </div>

            <button
              onClick={goToToday}
              className="px-4 py-2 rounded-lg border border-[#1D546D] text-[#1D546D] hover:bg-[#1D546D] hover:text-white transition text-sm font-medium"
            >
              Today
            </button>

          </div>

          {/* ================= WEEK DAYS ================= */}

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
                className="p-3 text-center text-xs font-semibold text-gray-500 border-r border-[#D9E1E2] last:border-r-0"
              >
                {day}
              </div>
            ))}

          </div>

          {/* ================= CALENDAR DAYS ================= */}

          <div className="grid grid-cols-7">

            {calendarDays.map((day, index) => {

              const dayEvents = getEventsForDay(day);

              return (
                <div
                  key={index}
                  className="min-h-[125px] border-r border-b border-[#D9E1E2] p-2 hover:bg-[#FAFBFB] transition"
                >

                  {day && (
                    <>
                      <div className="flex justify-between items-center mb-2">

                        <span
                          className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium ${
                            day === 7 && month === 8 && year === 2026
                              ? "bg-[#1D546D] text-white"
                              : "text-[#061E29]"
                          }`}
                        >
                          {day}
                        </span>

                        {dayEvents.length > 0 && (
                          <span className="text-[10px] text-gray-400">
                            {dayEvents.length} event
                            {dayEvents.length > 1 ? "s" : ""}
                          </span>
                        )}

                      </div>

                      <div className="space-y-1">

                        {dayEvents.map((event) => (

                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`w-full text-left px-2 py-1.5 rounded-md text-[11px] font-medium truncate ${getEventStyle(
                              event.type
                            )}`}
                            title={event.title}
                          >
                            {getTypeIcon(event.type)}{" "}
                            {event.title}
                          </button>

                        ))}

                      </div>
                    </>
                  )}

                </div>
              );
            })}

          </div>

        </div>

        {/* ================= UPCOMING EVENTS ================= */}

        <div className="bg-white rounded-xl border border-[#D9E1E2] shadow-sm mt-6">

          <div className="p-6 border-b border-[#D9E1E2]">

            <h2 className="text-lg font-bold text-[#061E29]">
              Upcoming Events
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your upcoming deadlines and meetings
            </p>

          </div>

          <div className="divide-y divide-[#D9E1E2]">

            {events.slice(0, 6).map((event) => (

              <div
                key={event.id}
                className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-[#FAFBFB] transition"
              >

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-lg bg-[#E7F0F1] flex items-center justify-center">
                    {getTypeIcon(event.type)}
                  </div>

                  <div>

                    <h3 className="font-semibold text-[#061E29]">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {event.project}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="text-right">

                    <p className="text-sm font-medium text-[#061E29]">
                      {event.date}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {event.time}
                    </p>

                  </div>

                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="px-3 py-2 rounded-lg border border-[#1D546D] text-[#1D546D] hover:bg-[#1D546D] hover:text-white transition text-xs font-medium"
                  >
                    View
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

      {/* ================= EVENT MODAL ================= */}

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

            <div className="bg-[#061E29] text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">

              <div>

                <p className="text-xs text-[#B8C9CB]">
                  {selectedEvent.type}
                </p>

                <h2 className="text-xl font-bold mt-1">
                  {selectedEvent.title}
                </h2>

              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="text-[#B8C9CB] hover:text-white text-2xl"
              >
                ×
              </button>

            </div>

            <div className="p-6">

              <div className="space-y-4">

                <div className="flex justify-between border-b border-[#D9E1E2] pb-3">

                  <span className="text-sm text-gray-500">
                    Date
                  </span>

                  <span className="text-sm font-semibold text-[#061E29]">
                    {selectedEvent.date}
                  </span>

                </div>

                <div className="flex justify-between border-b border-[#D9E1E2] pb-3">

                  <span className="text-sm text-gray-500">
                    Time
                  </span>

                  <span className="text-sm font-semibold text-[#061E29]">
                    {selectedEvent.time}
                  </span>

                </div>

                <div className="flex justify-between border-b border-[#D9E1E2] pb-3">

                  <span className="text-sm text-gray-500">
                    Type
                  </span>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getEventStyle(
                      selectedEvent.type
                    )}`}
                  >
                    {selectedEvent.type}
                  </span>

                </div>

                <div className="flex justify-between border-b border-[#D9E1E2] pb-3">

                  <span className="text-sm text-gray-500">
                    Project
                  </span>

                  <span className="text-sm font-semibold text-[#061E29]">
                    {selectedEvent.project}
                  </span>

                </div>

                <div>

                  <p className="text-sm text-gray-500 mb-2">
                    Description
                  </p>

                  <p className="text-sm text-[#302D30] leading-6">
                    {selectedEvent.description}
                  </p>

                </div>

              </div>

              <button
                onClick={() => setSelectedEvent(null)}
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

export default EmployeeCalendar;