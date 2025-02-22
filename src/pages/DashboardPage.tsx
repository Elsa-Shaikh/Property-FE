import { Outlet } from "react-router-dom";
import Sidebar from "../components/SidebarComponent";
import NavbarComponent from "../components/NavbarComponent";
import { useState } from "react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <NavbarComponent isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
