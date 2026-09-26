import { useMemo, useState } from "react";

const Calendar = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Homepage Design Review",
      date: "2026-09-05",
      type: "Meeting",
      time: "10:00 AM",
      description: "Review the homepage design with the development team.",
    },
    {
      id: 2,
      title: "Login API Development",
      date: "2026-09-08",
      type: "Task",
      time: "11:30 AM",
      description: "Complete authentication and login API development.",
    },
    {
      id: 3,
      title: "Mobile UI Review",
      date: "2026-09-12",
      type: "Meeting",
      time: "02:00 PM",
      description: "Review mobile application UI screens.",
    },
    {
      id: 4,
      title: "Marketing Campaign",
      date: "2026-09-15",
      type: "Deadline",
      time: "05:00 PM",
      description: "Final submission of the marketing campaign.",
    },
    {
      id: 5,
      title: "Database Design",
      date: "2026-09-18",
      type: "Task",
      time: "12:00 PM",
      description: "Complete database structure and documentation.",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    type: "Task",
    time: "",
    description: "",
  });

  /* =====================================================
     MONTH / DATE HELPERS
  ====================================================== */

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const year = currentDate.getFullYear();

  const formatDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();
  };

  /* =====================================================
     CALENDAR DAYS
  ====================================================== */

  const calendarDays = useMemo(() => {
    const totalDays = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const days = [];

    // Previous month days
    const previousMonthLastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: previousMonthLastDate - i,
        currentMonth: false,
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          previousMonthLastDate - i
        ),
      });
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      days.push({
        day,
        currentMonth: true,
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        ),
      });
    }

    // Next month days
    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        day: nextDay,
        currentMonth: false,
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          nextDay
        ),
      });

      nextDay++;
    }

    return days;
  }, [currentDate]);

  /* =====================================================
     NAVIGATION
  ====================================================== */

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const goToToday = () => {
    const todayDate = new Date();

    setCurrentDate(
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      )
    );

    setSelectedDate(todayDate);
  };

  /* =====================================================
     EVENT HELPERS
  ====================================================== */

  const getEventsForDate = (date) => {
    const dateKey = formatDateKey(date);

    return events.filter(
      (event) => event.date === dateKey
    );
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  const getEventClass = (type) => {
    if (type === "Meeting") {
      return "bg-[#E8EFF2] text-[#1D546D]";
    }

    if (type === "Deadline") {
      return "bg-[#EEF3F3] text-[#5F9598]";
    }

    return "bg-[#F0F4F4] text-[#061E29]";
  };

  /* =====================================================
     ADD EVENT
  ====================================================== */

  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!newEvent.title.trim() || !newEvent.date) {
      return;
    }

    const event = {
      id: Date.now(),
      title: newEvent.title.trim(),
      date: newEvent.date,
      type: newEvent.type,
      time: newEvent.time || "All Day",
      description:
        newEvent.description.trim() ||
        "No description provided.",
    };

    setEvents((prev) => [...prev, event]);

    const eventDate = new Date(
      `${newEvent.date}T00:00:00`
    );

    setSelectedDate(eventDate);

    setCurrentDate(
      new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        1
      )
    );

    setNewEvent({
      title: "",
      date: "",
      type: "Task",
      time: "",
      description: "",
    });

    setShowModal(false);
  };

  /* =====================================================
     DELETE EVENT
  ====================================================== */

  const handleDeleteEvent = (id) => {
    setEvents((prev) =>
      prev.filter((event) => event.id !== id)
    );
  };

  /* =====================================================
     UPCOMING EVENTS
  ====================================================== */

  const upcomingEvents = [...events]
    .filter((event) => {
      const eventDate = new Date(
        `${event.date}T00:00:00`
      );

      const currentDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      return eventDate >= currentDay;
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

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
              Calendar
            </h1>

            <p className="text-sm text-[#D9E1E2] mt-2">
              View and manage your tasks, meetings and important deadlines.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-3 rounded-xl bg-[#061E29] text-white text-sm font-medium hover:bg-[#123B4D] transition shadow-sm"
          >
            + Add Event
          </button>

        </div>

      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="px-6 lg:px-8 py-7">

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* =================================================
              CALENDAR
          ================================================== */}

          <div className="xl:col-span-2 bg-white rounded-2xl border border-[#D9E1E2] shadow-sm overflow-hidden">

            {/* CALENDAR HEADER */}

            <div className="px-6 py-5 border-b border-[#D9E1E2]">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                  <h2 className="text-lg font-semibold text-[#061E29]">
                    {monthName} {year}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Select a date to view scheduled events.
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  <button
                    onClick={goToPreviousMonth}
                    className="w-10 h-10 rounded-xl border border-[#D9E1E2] text-[#1D546D] hover:bg-[#E8EFF2] transition text-lg"
                  >
                    ‹
                  </button>

                  <button
                    onClick={goToToday}
                    className="px-4 h-10 rounded-xl border border-[#D9E1E2] text-[#061E29] text-sm font-medium hover:bg-[#F3F4F4] transition"
                  >
                    Today
                  </button>

                  <button
                    onClick={goToNextMonth}
                    className="w-10 h-10 rounded-xl border border-[#D9E1E2] text-[#1D546D] hover:bg-[#E8EFF2] transition text-lg"
                  >
                    ›
                  </button>

                </div>

              </div>

            </div>

            {/* WEEKDAYS */}

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

            {/* CALENDAR GRID */}

            <div className="grid grid-cols-7">

              {calendarDays.map((calendarDay, index) => {
                const dateKey = formatDateKey(
                  calendarDay.date
                );

                const dayEvents =
                  getEventsForDate(calendarDay.date);

                const isToday =
                  dateKey === formatDateKey(today);

                const isSelected =
                  dateKey === formatDateKey(selectedDate);

                return (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedDate(calendarDay.date)
                    }
                    className={`min-h-[105px] p-2 border-r border-b border-[#D9E1E2] text-left transition ${
                      calendarDay.currentMonth
                        ? "bg-white hover:bg-[#FAFBFB]"
                        : "bg-[#FAFBFB] text-gray-300"
                    } ${
                      isSelected
                        ? "ring-2 ring-inset ring-[#1D546D]"
                        : ""
                    }`}
                  >

                    {/* DAY NUMBER */}

                    <div className="flex justify-between items-start">

                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold ${
                          isToday
                            ? "bg-[#1D546D] text-white"
                            : calendarDay.currentMonth
                            ? "text-[#061E29]"
                            : "text-gray-300"
                        }`}
                      >
                        {calendarDay.day}
                      </span>

                      {dayEvents.length > 0 && (
                        <span className="text-[10px] font-medium text-[#5F9598]">
                          {dayEvents.length}
                        </span>
                      )}

                    </div>

                    {/* EVENTS */}

                    <div className="mt-2 space-y-1">

                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`px-2 py-1 rounded-md text-[10px] font-medium truncate ${getEventClass(
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

          {/* =================================================
              SIDE PANEL
          ================================================== */}

          <div className="space-y-6">

            {/* SELECTED DATE */}

            <div className="bg-white rounded-2xl border border-[#D9E1E2] shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-[#D9E1E2]">

                <p className="text-xs font-medium text-[#5F9598]">
                  SELECTED DATE
                </p>

                <h2 className="text-lg font-semibold text-[#061E29] mt-1">
                  {formatDisplayDate(selectedDate)}
                </h2>

              </div>

              <div className="p-6">

                {selectedDateEvents.length > 0 ? (

                  <div className="space-y-4">

                    {selectedDateEvents.map((event) => (

                      <div
                        key={event.id}
                        className="border border-[#D9E1E2] rounded-xl p-4"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div className="flex-1 min-w-0">

                            <h3 className="font-semibold text-[#061E29] text-sm">
                              {event.title}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                              {event.time}
                            </p>

                          </div>

                          <span
                            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium ${getEventClass(
                              event.type
                            )}`}
                          >
                            {event.type}
                          </span>

                        </div>

                        <p className="text-xs text-gray-500 mt-3 leading-5">
                          {event.description}
                        </p>

                        <button
                          onClick={() =>
                            handleDeleteEvent(event.id)
                          }
                          className="mt-4 text-xs font-medium text-[#1D546D] hover:text-[#061E29] transition"
                        >
                          Delete Event
                        </button>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="text-center py-8">

                    <div className="w-12 h-12 rounded-xl bg-[#E8EFF2] flex items-center justify-center text-[#1D546D] mx-auto text-lg">
                      +
                    </div>

                    <h3 className="font-semibold text-[#061E29] mt-4">
                      No events
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Nothing is scheduled for this date.
                    </p>

                    <button
                      onClick={() => setShowModal(true)}
                      className="mt-4 text-sm font-medium text-[#1D546D] hover:text-[#061E29]"
                    >
                      + Add Event
                    </button>

                  </div>

                )}

              </div>

            </div>

            {/* UPCOMING EVENTS */}

            <div className="bg-white rounded-2xl border border-[#D9E1E2] shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-[#D9E1E2]">

                <h2 className="text-lg font-semibold text-[#061E29]">
                  Upcoming Events
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your next scheduled activities.
                </p>

              </div>

              <div className="p-6">

                {upcomingEvents.length > 0 ? (

                  <div className="space-y-4">

                    {upcomingEvents.map((event) => {

                      const eventDate = new Date(
                        `${event.date}T00:00:00`
                      );

                      return (
                        <button
                          key={event.id}
                          onClick={() => {
                            setSelectedDate(eventDate);

                            setCurrentDate(
                              new Date(
                                eventDate.getFullYear(),
                                eventDate.getMonth(),
                                1
                              )
                            );
                          }}
                          className="w-full text-left flex gap-3 p-3 rounded-xl hover:bg-[#F3F4F4] transition"
                        >

                          <div className="w-10 h-10 rounded-xl bg-[#E8EFF2] flex flex-col items-center justify-center shrink-0">
                            <span className="text-[9px] text-[#5F9598] uppercase">
                              {eventDate.toLocaleString(
                                "default",
                                {
                                  month: "short",
                                }
                              )}
                            </span>

                            <span className="text-sm font-bold text-[#1D546D]">
                              {eventDate.getDate()}
                            </span>
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm font-semibold text-[#061E29] truncate">
                              {event.title}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              {event.time} · {event.type}
                            </p>

                          </div>

                        </button>
                      );
                    })}

                  </div>

                ) : (

                  <p className="text-sm text-gray-500">
                    No upcoming events.
                  </p>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          ADD EVENT MODAL
      ====================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061E29]/60 backdrop-blur-sm">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* MODAL HEADER */}

            <div className="px-6 py-5 bg-[#061E29] flex items-center justify-between">

              <div>

                <h3 className="text-lg font-semibold text-white">
                  Add Event
                </h3>

                <p className="text-xs text-[#B8C9CB] mt-1">
                  Add a task, meeting or deadline to your calendar.
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
              onSubmit={handleAddEvent}
              className="p-6 space-y-5"
            >

              {/* TITLE */}

              <div>

                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Event Title
                </label>

                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter event title"
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] placeholder:text-gray-400 outline-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#5F9598]/20"
                  required
                />

              </div>

              {/* DATE + TIME */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-[#061E29] mb-2">
                    Date
                  </label>

                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        date: e.target.value,
                      })
                    }
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] outline-none focus:border-[#1D546D]"
                    required
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-[#061E29] mb-2">
                    Time
                  </label>

                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        time: e.target.value,
                      })
                    }
                    className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] outline-none focus:border-[#1D546D]"
                  />

                </div>

              </div>

              {/* TYPE */}

              <div>

                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Event Type
                </label>

                <select
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      type: e.target.value,
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] outline-none focus:border-[#1D546D]"
                >
                  <option value="Task">Task</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Deadline">Deadline</option>
                </select>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-medium text-[#061E29] mb-2">
                  Description
                </label>

                <textarea
                  rows="3"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter a short description"
                  className="w-full px-4 py-3 rounded-xl border border-[#D9E1E2] bg-white text-[#061E29] placeholder:text-gray-400 outline-none resize-none focus:border-[#1D546D] focus:ring-2 focus:ring-[#5F9598]/20"
                />

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
                  className="px-5 py-2.5 rounded-xl bg-[#1D546D] text-white text-sm font-medium hover:bg-[#061E29] transition"
                >
                  Add Event
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Calendar;