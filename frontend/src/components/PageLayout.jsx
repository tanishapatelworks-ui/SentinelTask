
import Sidebar from "./Sidebar";
import Header from "./Header";

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F3F4F4]">

      {/* HEADER */}
      <div className="h-20">
        <Header />
      </div>

      {/* BODY */}
      <div className="flex min-h-[calc(100vh-80px)]">

        {/* SIDEBAR */}
        <aside className="w-64 flex-shrink-0 bg-[#061E29]">
          <Sidebar />
        </aside>

        {/* PAGE */}
        <main className="flex-1 min-w-0 bg-[#F3F4F4]">
          {children}
        </main>

      </div>

    </div>
  );
};

export default PageLayout;

