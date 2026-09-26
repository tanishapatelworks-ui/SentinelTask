
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeSettings = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [profile, setProfile] = useState({
    name: storedUser?.name || "Employee User",
    email:
      storedUser?.email || "employee@sentineltask.com",
    role: storedUser?.role || "employee",
    department: "Development",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    taskAssignments: true,
    projectUpdates: true,
    milestoneAlerts: true,
    deadlineReminders: true,
    emailNotifications: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  const [appearance, setAppearance] =
    useState("Light");

  const [activeSection, setActiveSection] =
    useState("Profile");

  const [saved, setSaved] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (name) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSecurityChange = (name) => {
    setSecurity((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSave = () => {
    if (
      password.newPassword ||
      password.confirmPassword
    ) {
      if (
        password.newPassword !==
        password.confirmPassword
      ) {
        alert(
          "New password and confirm password do not match."
        );
        return;
      }

      if (password.newPassword.length < 6) {
        alert(
          "New password must be at least 6 characters."
        );
        return;
      }
    }

    const updatedUser = {
      ...storedUser,
      name: profile.name,
      email: profile.email,
      role: "employee",
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);

    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleReset = () => {
    setProfile({
      name: storedUser?.name || "Employee User",
      email:
        storedUser?.email ||
        "employee@sentineltask.com",
      role: storedUser?.role || "employee",
      department: "Development",
    });

    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setNotifications({
      taskAssignments: true,
      projectUpdates: true,
      milestoneAlerts: true,
      deadlineReminders: true,
      emailNotifications: false,
    });

    setSecurity({
      twoFactor: false,
      loginAlerts: true,
    });

    setAppearance("Light");
    setSaved(false);
  };

  const sections = [
    {
      name: "Profile",
      icon: "👤",
    },
    {
      name: "Password",
      icon: "🔐",
    },
    {
      name: "Notifications",
      icon: "🔔",
    },
    {
      name: "Security",
      icon: "🛡️",
    },
    {
      name: "Appearance",
      icon: "🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* ================= HEADER ================= */}

      <div className="w-full bg-[#1D546D] px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-5">

          <div>
            <p className="text-sm text-[#D9E1E2] mb-1">
              Workspace
            </p>

            <h1 className="text-3xl font-bold text-white">
              Employee Settings
            </h1>

            <p className="mt-1 text-sm text-[#D9E1E2]">
              Manage your account and employee settings.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/employee-dashboard")
            }
            className="bg-[#061E29] hover:bg-[#0B2C3A] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
          >
            Dashboard
          </button>

        </div>
      </div>


      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* SAVED MESSAGE */}

        {saved && (
          <div className="mb-6 bg-[#E9F4F1] border border-[#BBDDD5] text-[#2D6A63] rounded-xl px-5 py-4 flex items-center gap-3">

            <span className="text-lg">
              ✓
            </span>

            <div>
              <p className="font-semibold text-sm">
                Settings saved successfully.
              </p>

              <p className="text-xs mt-1">
                Your changes have been saved locally.
              </p>
            </div>

          </div>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ================= SIDEBAR ================= */}

          <div className="bg-white border border-[#D9E1E2] rounded-2xl p-4 h-fit">

            <p className="text-xs uppercase tracking-wide text-[#777177] px-3 py-2">
              Settings
            </p>

            <div className="space-y-1">

              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() =>
                    setActiveSection(section.name)
                  }
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    activeSection === section.name
                      ? "bg-[#E7F0F3] text-[#1D546D]"
                      : "text-[#302D30] hover:bg-[#F3F4F4]"
                  }`}
                >
                  <span>
                    {section.icon}
                  </span>

                  <span>
                    {section.name}
                  </span>
                </button>
              ))}

            </div>

          </div>


          {/* ================= CONTENT ================= */}

          <div className="lg:col-span-3">

            {/* ================= PROFILE ================= */}

            {activeSection === "Profile" && (
              <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-[#D9E1E2]">

                  <h2 className="text-xl font-semibold text-[#302D30]">
                    Profile Settings
                  </h2>

                  <p className="text-sm text-[#777177] mt-1">
                    Manage your personal account information.
                  </p>

                </div>

                <div className="p-6">

                  <div className="flex items-center gap-4 mb-8">

                    <div className="w-16 h-16 rounded-full bg-[#1D546D] flex items-center justify-center text-white text-xl font-bold">
                      {profile.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>

                      <h3 className="font-semibold text-[#302D30]">
                        {profile.name}
                      </h3>

                      <p className="text-sm text-[#777177]">
                        {profile.email}
                      </p>

                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#E7F0F3] text-[#1D546D] text-xs font-medium capitalize">
                        Employee
                      </span>

                    </div>

                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-medium text-[#302D30] mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                      />
                    </div>


                    <div>
                      <label className="block text-sm font-medium text-[#302D30] mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                      />
                    </div>


                    <div>
                      <label className="block text-sm font-medium text-[#302D30] mb-2">
                        Role
                      </label>

                      <input
                        type="text"
                        value="Employee"
                        disabled
                        className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg bg-[#F3F4F4] text-[#777177]"
                      />
                    </div>


                    <div>
                      <label className="block text-sm font-medium text-[#302D30] mb-2">
                        Department
                      </label>

                      <select
                        name="department"
                        value={profile.department}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                      >
                        <option>
                          Development
                        </option>
                        <option>
                          Design
                        </option>
                        <option>
                          Marketing
                        </option>
                        <option>
                          Testing
                        </option>
                        <option>
                          Management
                        </option>
                      </select>
                    </div>

                  </div>

                </div>

              </div>
            )}


            {/* ================= PASSWORD ================= */}

            {activeSection === "Password" && (
              <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-[#D9E1E2]">

                  <h2 className="text-xl font-semibold text-[#302D30]">
                    Change Password
                  </h2>

                  <p className="text-sm text-[#777177] mt-1">
                    Update your employee account password.
                  </p>

                </div>

                <div className="p-6 max-w-2xl space-y-5">

                  <div>
                    <label className="block text-sm font-medium text-[#302D30] mb-2">
                      Current Password
                    </label>

                    <input
                      type="password"
                      name="currentPassword"
                      value={password.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#302D30] mb-2">
                      New Password
                    </label>

                    <input
                      type="password"
                      name="newPassword"
                      value={password.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#302D30] mb-2">
                      Confirm New Password
                    </label>

                    <input
                      type="password"
                      name="confirmPassword"
                      value={password.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2.5 border border-[#D9E1E2] rounded-lg outline-none focus:ring-2 focus:ring-[#5F9598]"
                    />
                  </div>

                  <div className="bg-[#F3F4F4] border border-[#D9E1E2] rounded-xl p-4">

                    <p className="text-sm font-medium text-[#302D30]">
                      Password requirements
                    </p>

                    <ul className="mt-2 text-xs text-[#777177] space-y-1">
                      <li>
                        • Minimum 6 characters
                      </li>
                      <li>
                        • Use a combination of letters and numbers
                      </li>
                      <li>
                        • Confirm the new password correctly
                      </li>
                    </ul>

                  </div>

                </div>

              </div>
            )}


            {/* ================= NOTIFICATIONS ================= */}

            {activeSection === "Notifications" && (
              <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-[#D9E1E2]">

                  <h2 className="text-xl font-semibold text-[#302D30]">
                    Notification Settings
                  </h2>

                  <p className="text-sm text-[#777177] mt-1">
                    Choose which notifications you want to receive.
                  </p>

                </div>

                <div className="p-6">

                  <div className="space-y-5">

                    {[
                      {
                        key: "taskAssignments",
                        title: "Task Assignments",
                        description:
                          "Notify me when a new task is assigned to me.",
                      },
                      {
                        key: "projectUpdates",
                        title: "Project Updates",
                        description:
                          "Notify me when project information is updated.",
                      },
                      {
                        key: "milestoneAlerts",
                        title: "Milestone Alerts",
                        description:
                          "Notify me about milestone progress and completion.",
                      },
                      {
                        key: "deadlineReminders",
                        title: "Deadline Reminders",
                        description:
                          "Receive reminders when task or project deadlines are approaching.",
                      },
                      {
                        key: "emailNotifications",
                        title: "Email Notifications",
                        description:
                          "Receive important workspace notifications through email.",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-4 py-3"
                      >

                        <div>
                          <h3 className="text-sm font-semibold text-[#302D30]">
                            {item.title}
                          </h3>

                          <p className="text-xs text-[#777177] mt-1">
                            {item.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleNotificationChange(
                              item.key
                            )
                          }
                          className={`relative w-12 h-6 rounded-full transition shrink-0 ${
                            notifications[item.key]
                              ? "bg-[#1D546D]"
                              : "bg-[#C8D0D2]"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                              notifications[item.key]
                                ? "left-7"
                                : "left-1"
                            }`}
                          />
                        </button>

                      </div>
                    ))}

                  </div>

                </div>

              </div>
            )}


            {/* ================= SECURITY ================= */}

            {activeSection === "Security" && (
              <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-[#D9E1E2]">

                  <h2 className="text-xl font-semibold text-[#302D30]">
                    Security Settings
                  </h2>

                  <p className="text-sm text-[#777177] mt-1">
                    Manage your employee account security preferences.
                  </p>

                </div>

                <div className="p-6 space-y-6">

                  <div className="bg-[#F3F4F4] border border-[#D9E1E2] rounded-xl p-5">

                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-[#E7F0F3] flex items-center justify-center text-lg">
                        🛡️
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#302D30]">
                          Employee Account Security
                        </h3>

                        <p className="text-sm text-[#777177] mt-1">
                          Keep your SentinelTask employee account secure with additional security controls.
                        </p>
                      </div>

                    </div>

                  </div>


                  <div className="flex items-center justify-between gap-4 py-3">

                    <div>
                      <h3 className="text-sm font-semibold text-[#302D30]">
                        Two-Factor Authentication
                      </h3>

                      <p className="text-xs text-[#777177] mt-1">
                        Add an additional verification step during login.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleSecurityChange("twoFactor")
                      }
                      className={`relative w-12 h-6 rounded-full transition shrink-0 ${
                        security.twoFactor
                          ? "bg-[#1D546D]"
                          : "bg-[#C8D0D2]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                          security.twoFactor
                            ? "left-7"
                            : "left-1"
                        }`}
                      />
                    </button>

                  </div>


                  <div className="flex items-center justify-between gap-4 py-3 border-t border-[#E5EAEB] pt-6">

                    <div>
                      <h3 className="text-sm font-semibold text-[#302D30]">
                        Login Alerts
                      </h3>

                      <p className="text-xs text-[#777177] mt-1">
                        Get notified about new account login activity.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleSecurityChange("loginAlerts")
                      }
                      className={`relative w-12 h-6 rounded-full transition shrink-0 ${
                        security.loginAlerts
                          ? "bg-[#1D546D]"
                          : "bg-[#C8D0D2]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                          security.loginAlerts
                            ? "left-7"
                            : "left-1"
                        }`}
                      />
                    </button>

                  </div>


                  <div className="border border-[#D9E1E2] rounded-xl p-5">

                    <h3 className="text-sm font-semibold text-[#302D30]">
                      Current Session
                    </h3>

                    <div className="mt-3 flex items-center justify-between">

                      <div>
                        <p className="text-sm text-[#302D30]">
                          Current browser session
                        </p>

                        <p className="text-xs text-[#777177] mt-1">
                          This device is currently logged in.
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-[#E9F4F1] text-[#2D6A63] text-xs font-medium">
                        Active
                      </span>

                    </div>

                  </div>

                </div>

              </div>
            )}


            {/* ================= APPEARANCE ================= */}

            {activeSection === "Appearance" && (
              <div className="bg-white border border-[#D9E1E2] rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-[#D9E1E2]">

                  <h2 className="text-xl font-semibold text-[#302D30]">
                    Appearance
                  </h2>

                  <p className="text-sm text-[#777177] mt-1">
                    Choose your preferred workspace appearance.
                  </p>

                </div>

                <div className="p-6">

                  <h3 className="text-sm font-semibold text-[#302D30] mb-4">
                    Theme
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {[
                      "Light",
                      "System Default",
                    ].map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() =>
                          setAppearance(theme)
                        }
                        className={`text-left p-5 rounded-xl border-2 transition ${
                          appearance === theme
                            ? "border-[#1D546D] bg-[#E7F0F3]"
                            : "border-[#D9E1E2] hover:border-[#5F9598]"
                        }`}
                      >

                        <div className="h-20 rounded-lg bg-[#F3F4F4] border border-[#D9E1E2] p-3">

                          <div className="h-3 w-2/3 rounded bg-[#061E29]" />

                          <div className="mt-2 h-2 w-1/2 rounded bg-[#5F9598]" />

                          <div className="mt-3 h-5 w-full rounded bg-white border border-[#D9E1E2]" />

                        </div>

                        <div className="flex items-center justify-between mt-4">

                          <span className="text-sm font-semibold text-[#302D30]">
                            {theme}
                          </span>

                          {appearance === theme && (
                            <span className="text-[#1D546D] font-bold">
                              ✓
                            </span>
                          )}

                        </div>

                      </button>
                    ))}

                  </div>


                  <div className="mt-6 bg-[#F3F4F4] border border-[#D9E1E2] rounded-xl p-4">

                    <p className="text-sm font-medium text-[#302D30]">
                      SentinelTask Theme
                    </p>

                    <p className="text-xs text-[#777177] mt-1">
                      The employee workspace uses the standard navy, teal and light professional interface.
                    </p>

                  </div>

                </div>

              </div>
            )}


            {/* ================= BOTTOM ACTIONS ================= */}

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">

              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-lg border border-[#D9E1E2] text-[#302D30] text-sm font-medium hover:bg-white transition"
              >
                Reset Changes
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-lg bg-[#061E29] text-white text-sm font-medium hover:bg-[#0B2C3A] transition"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default EmployeeSettings;
