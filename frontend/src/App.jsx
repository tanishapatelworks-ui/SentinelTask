import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ===============================
// AUTH PAGES
// ===============================

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// ===============================
// HOME PAGE
// ===============================

import Home from "./pages/Home";

// ===============================
// LAYOUTS
// ===============================

import DashboardLayout from "./components/DashboardLayout";
import ModuleLayout from "./components/ModuleLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// ===============================
// ADMIN
// ===============================

import AdminDashboard from "./pages/AdminDashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Calendar from "./pages/Calendar";
import Milestones from "./pages/Milestones";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import Activity from "./pages/Activity";
import Files from "./pages/Files";
import Settings from "./pages/Settings";

// ===============================
// MANAGER
// ===============================

import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerProjects from "./pages/ManagerProjects";
import ManagerTasks from "./pages/ManagerTasks";
import ManagerTeam from "./pages/ManagerTeam";
import ManagerCalendar from "./pages/ManagerCalendar";
import ManagerMilestones from "./pages/ManagerMilestones";
import ManagerNotifications from "./pages/ManagerNotifications";
import ManagerReports from "./pages/ManagerReports";
import ManagerActivity from "./pages/ManagerActivity";
import ManagerFiles from "./pages/ManagerFiles";
import ManagerSettings from "./pages/ManagerSettings";

// ===============================
// EMPLOYEE
// ===============================

import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeProjects from "./pages/EmployeeProjects";
import EmployeeTasks from "./pages/EmployeeTasks";
import EmployeeTeam from "./pages/EmployeeTeam";
import EmployeeCalendar from "./pages/EmployeeCalendar";
import EmployeeMilestones from "./pages/EmployeeMilestones";
import EmployeeNotifications from "./pages/EmployeeNotifications";
import EmployeeReports from "./pages/EmployeeReports";
import EmployeeActivity from "./pages/EmployeeActivity";
import EmployeeFiles from "./pages/EmployeeFiles";
import EmployeeSettings from "./pages/EmployeeSettings";

// ===============================
// APP
// ===============================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            PUBLIC / AUTH ROUTES
        ===================================================== */}

        {/* HOME PAGE */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* FORGOT PASSWORD */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* RESET PASSWORD */}
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* =====================================================
            ADMIN DASHBOARD
        ===================================================== */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            MANAGER DASHBOARD
        ===================================================== */}

        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            EMPLOYEE DASHBOARD
        ===================================================== */}

        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            ADMIN MODULES
        ===================================================== */}

        {/* PROJECTS */}

        <Route
          path="/projects"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Projects />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* TASKS */}

        <Route
          path="/tasks"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Tasks />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* TEAM */}

        <Route
          path="/team"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Team />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* CALENDAR */}

        <Route
          path="/calendar"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Calendar />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* MILESTONES */}

        <Route
          path="/milestones"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Milestones />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* NOTIFICATIONS */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Notifications />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* REPORTS */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Reports />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* ACTIVITY */}

        <Route
          path="/activity"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Activity />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* FILES */}

        <Route
          path="/files"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Files />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ModuleLayout>
                <Settings />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            MANAGER MODULES
        ===================================================== */}

        {/* MANAGER PROJECTS */}

        <Route
          path="/manager-projects"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ModuleLayout>
                <ManagerProjects />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* MANAGER TASKS */}

        <Route
          path="/manager-tasks"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ModuleLayout>
                <ManagerTasks />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* MANAGER TEAM */}

        <Route
          path="/manager-team"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ModuleLayout>
                <ManagerTeam />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* MANAGER CALENDAR */}

        <Route
          path="/manager-calendar"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerCalendar />
            </ProtectedRoute>
          }
        />

        {/* MANAGER MILESTONES */}

        <Route
          path="/manager-milestones"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerMilestones />
            </ProtectedRoute>
          }
        />

        {/* MANAGER NOTIFICATIONS */}

        <Route
          path="/manager-notifications"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerNotifications />
            </ProtectedRoute>
          }
        />

        {/* MANAGER REPORTS */}

        <Route
          path="/manager-reports"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerReports />
            </ProtectedRoute>
          }
        />

        {/* MANAGER ACTIVITY */}

        <Route
          path="/manager-activity"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerActivity />
            </ProtectedRoute>
          }
        />

        {/* MANAGER FILES */}

        <Route
          path="/manager-files"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ModuleLayout>
                <ManagerFiles />
              </ModuleLayout>
            </ProtectedRoute>
          }
        />

        {/* MANAGER SETTINGS */}

        <Route
          path="/manager-settings"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerSettings />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            EMPLOYEE MODULES
        ===================================================== */}

        {/* EMPLOYEE PROJECTS */}

        <Route
          path="/employee-projects"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeProjects />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE TASKS */}

        <Route
          path="/employee-tasks"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeTasks />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE TEAM */}

        <Route
          path="/employee-team"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeTeam />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE CALENDAR */}

        <Route
          path="/employee-calendar"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeCalendar />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE MILESTONES */}

        <Route
          path="/employee-milestones"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeMilestones />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE NOTIFICATIONS */}

        <Route
          path="/employee-notifications"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeNotifications />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE REPORTS */}

        <Route
          path="/employee-reports"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeReports />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE ACTIVITY */}

        <Route
          path="/employee-activity"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeActivity />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE FILES */}

        <Route
          path="/employee-files"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeFiles />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE SETTINGS */}

        <Route
          path="/employee-settings"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeSettings />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            DEFAULT / INVALID ROUTES
        ===================================================== */}

        {/* Any unknown URL → LOGIN */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;