import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Users,
  Wrench,
  Receipt,
  ChevronDown,
  Menu,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openBills, setOpenBills] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-50 
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}`}
      >

        {/* Top */}
        <div className="p-4 flex justify-between items-center">
          {isOpen && <h1 className="font-bold text-lg">Admin</h1>}

          <Menu
            className="cursor-pointer transition-transform duration-300 hover:rotate-90"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        <nav className="space-y-2 px-2">

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`group flex items-center gap-3 p-2 rounded transition
            ${isActive("/dashboard") ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <LayoutDashboard
              size={18}
              className={`transition-all duration-200 
              ${isActive("/dashboard") ? "scale-110" : "group-hover:scale-110"}`}
            />
            {isOpen && "Dashboard"}
          </Link>

          {/* Rooms */}
          <Link
            to="/admin/rooms"
            className={`group flex items-center gap-3 p-2 rounded transition
            ${isActive("/admin/rooms") ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <Home
              size={18}
              className={`transition-all duration-200 
              ${isActive("/admin/rooms") ? "scale-110" : "group-hover:scale-110"}`}
            />
            {isOpen && "Rooms"}
          </Link>

          {/* Residents */}
          <Link
            to="/admin/residents"
            className={`group flex items-center gap-3 p-2 rounded transition
            ${isActive("/admin/residents") ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <Users
              size={18}
              className={`transition-all duration-200 
              ${isActive("/admin/residents") ? "scale-110" : "group-hover:scale-110"}`}
            />
            {isOpen && "Residents"}
          </Link>

          {/* Maintenance */}
          <Link
            to="/admin/maintenance"
            className={`group flex items-center gap-3 p-2 rounded transition
            ${isActive("/admin/maintenance") ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <Wrench
              size={18}
              className={`transition-all duration-200 
              ${isActive("/admin/maintenance") ? "scale-110" : "group-hover:scale-110"}`}
            />
            {isOpen && "Maintenance"}
          </Link>

          {/* Bills */}
          <div>
            <div className="flex items-center justify-between">

              <Link
                to="/admin/bills"
                className="group flex items-center gap-3 p-2 hover:bg-gray-800 rounded w-full"
              >
                <Receipt
                  size={18}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                {isOpen && "Bills"}
              </Link>

              {isOpen && (
                <ChevronDown
                  size={16}
                  className={`cursor-pointer mr-2 transition-transform duration-300 
                  ${openBills ? "rotate-180" : ""}`}
                  onClick={() => setOpenBills(!openBills)}
                />
              )}
            </div>

            <div
              className={`ml-8 mt-1 space-y-1 text-sm overflow-hidden transition-all duration-300
              ${openBills ? "max-h-40" : "max-h-0"}`}
            >
              <Link to="/admin/create-bill" className="block px-2 py-1 hover:bg-gray-800 rounded">
                Create Bill
              </Link>
              <Link to="/admin/payments" className="block px-2 py-1 hover:bg-gray-800 rounded">
                Payments
              </Link>
              <Link to="/admin/revenue" className="block px-2 py-1 hover:bg-gray-800 rounded">
                Revenue
              </Link>
            </div>
          </div>

          {/* Users */}
          <div>
            <div
              onClick={() => setOpenUsers(!openUsers)}
              className="group flex items-center justify-between p-2 hover:bg-gray-800 rounded cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Users
                  size={18}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                {isOpen && "Users"}
              </div>

              {isOpen && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 
                  ${openUsers ? "rotate-180" : ""}`}
                />
              )}
            </div>

            <div
              className={`ml-8 mt-1 space-y-1 text-sm overflow-hidden transition-all duration-300
              ${openUsers ? "max-h-32" : "max-h-0"}`}
            >
              <Link to="/admin/create-staff" className="block px-2 py-1 hover:bg-gray-800 rounded">
                Create Staff
              </Link>
              <Link to="/admin/create-user" className="block px-2 py-1 hover:bg-gray-800 rounded">
                Create User
              </Link>
            </div>
          </div>

        </nav>
      </div>
    </>
  );
};

export default Sidebar;