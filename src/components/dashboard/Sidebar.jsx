import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Users,
  Wrench,
  Toolbox,
  Receipt,
  ChevronDown,
  Menu,
  Hotel,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openBills, setOpenBills] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role || "";

  const isActive = (path) => location.pathname === path;

  const baseLink = (path) =>
    `group flex items-center ${
      isOpen ? "gap-3" : "justify-center"
    } p-2 rounded transition-all duration-200 ${
      isActive(path)
        ? "bg-blue-600 shadow-lg shadow-blue-500/40 border-l-4 border-white"
        : "hover:bg-gray-800"
    }`;

  if (!role) return null;

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-50
      transition-all duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-16"}`}
    >
      
      <div className="p-4 flex justify-between items-center">
        {isOpen && <h1 className="font-bold text-lg">Menu</h1>}

        <Menu
          className="cursor-pointer hover:rotate-90 transition"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <nav className="space-y-2 px-2">

        {/* DASHBOARD */}
        <Link to="/dashboard" className={baseLink("/dashboard")}>
          <LayoutDashboard size={18} />
          {isOpen && "Dashboard"}
        </Link>

        {/*  ADMIN  */}
        {role === "admin" && (
          <>
            <Link to="/admin/rooms" className={baseLink("/admin/rooms")}>
              <Home size={18} />
              {isOpen && "Rooms"}
            </Link>

            <Link to="/admin/residents" className={baseLink("/admin/residents")}>
              <Users size={18} />
              {isOpen && "Residents"}
            </Link>

            <Link to="/admin/maintenance" className={baseLink("/admin/maintenance")}>
              <Wrench size={18} />
              {isOpen && "Maintenance"}
            </Link>

            {/* BILLS */}
            <div>
              <div className="flex items-center justify-between">
                <Link to="/admin/bills" className={baseLink("/admin/bills")}>
                  <Receipt size={18} />
                  {isOpen && "Bills"}
                </Link>

                {isOpen && (
                  <ChevronDown
                    size={16}
                    onClick={() => setOpenBills(!openBills)}
                    className={`cursor-pointer mr-2 ${
                      openBills ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {openBills && isOpen && (
                <div className="ml-8 flex flex-col space-y-1 text-sm mt-1">
                  <Link to="/admin/create-bill" className="hover:text-blue-400">
                    Create Bill
                  </Link>
                  <Link to="/admin/payments" className="hover:text-blue-400">
                    Payments
                  </Link>
                  <Link to="/admin/revenue" className="hover:text-blue-400">
                    Revenue
                  </Link>
                </div>
              )}
            </div>

            {/* USERS */}
            <div>
              <div
                onClick={() => setOpenUsers(!openUsers)}
                className="flex items-center justify-between p-2 hover:bg-gray-800 rounded cursor-pointer"
              >
                <div className="flex gap-3">
                  <Users size={18} />
                  {isOpen && "Users"}
                </div>

                {isOpen && (
                  <ChevronDown
                    size={16}
                    className={openUsers ? "rotate-180" : ""}
                  />
                )}
              </div>

              {openUsers && isOpen && (
                <div className="ml-8 flex flex-col space-y-1 text-sm mt-1">
                  <Link to="/admin/create-staff" className="hover:text-blue-400">
                    Create Staff
                  </Link>
                  <Link to="/admin/create-user" className="hover:text-blue-400">
                    Create User
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {/*  STAFF  */}

        {role === "staff" && (
          <>
            <Link to="/admin/rooms" className={baseLink("/admin/rooms")}>
              <Home size={18} />
              {isOpen && "Rooms"}
            </Link>

            <Link to="/admin/residents" className={baseLink("/admin/residents")}>
              <Users size={18} />
              {isOpen && "Residents"}
            </Link>

            <Link to="/admin/maintenance" className={baseLink("/admin/maintenance")}>
              <Wrench size={18} />
              {isOpen && "Maintenance"}
            </Link>
          </>
        )}

        {/*  RESIDENT  */}

        {role === "resident" && (
          <>
            <Link to="/resident/rooms" className={baseLink("/resident/rooms")}>
              <Hotel size={18} />
              {isOpen && "Rooms"}
            </Link>

            <Link to="/resident/my-room" className={baseLink("/resident/my-room")}>
              <Home size={18} />
              {isOpen && "My Room"}
            </Link>

            <Link to="/resident/bills" className={baseLink("/resident/bills")}>
              <Receipt size={18} />
              {isOpen && "My Bills"}
            </Link>

            <Link to="/resident/maintenance/create" className={baseLink("/resident/maintenance/create")}>
              <Wrench size={18} />
              {isOpen && "Create Request"}
            </Link>

            <Link to="/resident/maintenance" className={baseLink("/resident/maintenance")}>
              <Toolbox size={18} />
              {isOpen && "Maintenance"}
            </Link>
          </>
        )}

      </nav>
    </div>
  );
};

export default Sidebar;