import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import RoomTable from "../../components/RoomTable";

const Rooms = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openFilter, setOpenFilter] = useState(false);

  const dropdownRef = useRef();

  // close dropdown outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Room Management
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link
          to="/admin/rooms/create"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <h2 className="text-lg font-semibold mb-1">
            Create Room
          </h2>
          <p className="text-sm opacity-90">
            Add new rooms.
          </p>
        </Link>

        {role === "admin" && (
          <Link
            to="/admin/rooms/assign"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-lg font-semibold mb-1">
              Assign Room
            </h2>
            <p className="text-sm opacity-90">
              Assign residents.
            </p>
          </Link>
        )}

      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">

        <div className="flex justify-between items-center">

          <h2 className="text-lg font-semibold text-gray-700">
            All Rooms
          </h2>

          <div className="flex gap-3">

            {/* SEARCH */}
            <div className="relative group w-72">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-500 transition"
              />
              <input
                type="text"
                placeholder="Search room..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl 
                bg-white/70 backdrop-blur-md 
                border border-gray-200 
                shadow-sm
                focus:ring-2 focus:ring-blue-400 
                focus:border-blue-400
                transition-all duration-300
                hover:shadow-md
                outline-none"
              />
            </div>

            {/*  FILTER */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenFilter(!openFilter)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl 
                bg-white/70 border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <SlidersHorizontal size={16} />
                Filter
              </button>

              {openFilter && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg overflow-hidden z-50">

                  <button
                    onClick={() => { setFilter("all"); setOpenFilter(false); }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    All
                  </button>

                  <button
                    onClick={() => { setFilter("available"); setOpenFilter(false); }}
                    className="block w-full text-left px-4 py-2 hover:bg-green-50 text-green-600"
                  >
                    Available
                  </button>

                  <button
                    onClick={() => { setFilter("full"); setOpenFilter(false); }}
                    className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                  >
                    Full
                  </button>

                </div>
              )}
            </div>

          </div>

        </div>

        <RoomTable search={search} filter={filter} />

      </div>

    </div>
  );
};

export default Rooms;