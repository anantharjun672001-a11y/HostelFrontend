import { useNavigate, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const role = user?.role;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isDashboardPage =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/resident");

  const handleLogoClick = () => {
    if (!user) {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#F3E3D0] via-[#D2C4B4] via-[#AACDDC] to-[#81A6C6] shadow-md">

      <div
        className={`flex items-center justify-between px-6 py-3 
        ${isDashboardPage ? "ml-16 md:ml-64" : ""}`}
      >

        
        <h1
          onClick={handleLogoClick}
          className={`text-xl font-bold text-gray-800 
          ${!user ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
        >
          StayHive
        </h1>

        {/* Logged OUT → only logo */}
        {!user ? null : (

          <div className="flex items-center gap-5">

            {/*  Resident only */}
            {role === "resident" && (
              <div className="relative cursor-pointer">
                <Bell className="text-gray-700 hover:text-gray-900 transition-transform duration-200 hover:scale-110" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
            )}

            {/*  Profile */}
            <div className="flex items-center gap-2">

              <div className="w-8 h-8 bg-[#81A6C6] text-white flex items-center justify-center rounded-full font-semibold">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>

              <span className="text-gray-800 font-medium hidden sm:block">
                {user.name || "User"}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
            >
              Logout
            </button>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;