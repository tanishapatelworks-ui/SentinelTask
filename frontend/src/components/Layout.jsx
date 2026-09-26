
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      <Header />

      <div className="flex">

        <aside className="w-64 flex-shrink-0 bg-[#061E29] min-h-[calc(100vh-80px)]">
          <Sidebar />
        </aside>

        <main className="flex-1 min-w-0 bg-[#F3F4F4]">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;

