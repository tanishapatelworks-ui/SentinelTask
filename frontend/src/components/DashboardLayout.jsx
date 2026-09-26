import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden bg-[#F3F4F4]">

      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 bg-[#061E29] overflow-y-auto">
        <Sidebar />
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* HEADER */}
        <Header />

        {/* CURRENT PAGE ONLY */}
        <main className="flex-1 overflow-y-auto bg-[#F3F4F4]">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;