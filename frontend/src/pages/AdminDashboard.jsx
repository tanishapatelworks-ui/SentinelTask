const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            SentinelTask
          </h1>

          <p className="text-sm text-gray-500">
            Admin Dashboard
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">

        <h2 className="text-xl font-semibold mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">
              Total Users
            </p>

            <h3 className="text-3xl font-bold mt-2">
              0
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">
              Total Projects
            </p>

            <h3 className="text-3xl font-bold mt-2">
              0
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">
              Total Tasks
            </p>

            <h3 className="text-3xl font-bold mt-2">
              0
            </h3>
          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;