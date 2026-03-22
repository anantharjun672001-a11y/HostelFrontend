import { useState } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // always desktop

  return (
    <div className="flex">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="p-6 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;