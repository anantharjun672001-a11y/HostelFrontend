import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const fetchResidents = async () => {
    try {
      const res = await axios.get(
        "https://hostelbackend-uzne.onrender.com/api/resident",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResidents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  
  const filteredResidents = residents.filter((r) => {
    const name = r.userId?.name?.toLowerCase() || "";
    const matchesSearch = name.includes(search.toLowerCase());
    const isActive = r.room ? true : false;

    if (filter === "active") return matchesSearch && isActive;
    if (filter === "vacated") return matchesSearch && !isActive;

    return matchesSearch;
  });

  
  const totalPages = Math.ceil(filteredResidents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentResidents = filteredResidents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resident?")) return;

    try {
      await axios.delete(
        `https://hostelbackend-uzne.onrender.com/api/resident/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchResidents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Residents
        </h1>

        <Link
          to="/admin/residents/create"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 
          hover:from-indigo-600 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl 
          shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <Plus size={18} />
          Create Resident
        </Link>
      </div>

      
      <div className="flex flex-col md:flex-row gap-4 justify-between">

        
        <div className="relative w-full md:w-1/3 group">
          <Search className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition" size={18} />

          <input
            type="text"
            placeholder="Search resident..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white
            shadow-sm transition-all duration-300
            group-hover:shadow-md group-hover:border-blue-400
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none px-5 py-2.5 pr-10 rounded-xl border bg-white
            shadow-sm cursor-pointer
            transition-all duration-300
            hover:border-blue-400 hover:shadow-md
            focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Residents</option>
            <option value="active">Active</option>
            <option value="vacated">Vacated</option>
          </select>

          <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
            ▼
          </span>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">

        <table className="w-full text-sm text-left text-gray-600">

          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Check In</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentResidents.map((resident) => (
              <tr
                key={resident._id}
                className="border-t hover:bg-blue-50/50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {resident.userId?.name}
                </td>

                <td className="px-6 py-4">{resident.phone}</td>

                <td className="px-6 py-4">
                  {resident.room
                    ? `Room ${resident.room.roomNumber}`
                    : "Not Assigned"}
                </td>

                <td className="px-6 py-4">
                  {resident.checkIn
                    ? new Date(resident.checkIn).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  {resident.room ? (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Vacated
                    </span>
                  )}
                </td>

                
                <td className="px-6 py-4 flex justify-center gap-3">

                  <Link
                    to={`/admin/residents/edit/${resident._id}`}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 
                    hover:bg-blue-100 hover:scale-105 active:scale-95 transition"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(resident._id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 
                    hover:bg-red-100 hover:scale-105 active:scale-95 transition"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

        
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 rounded-lg text-sm font-medium
          bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed
          transition"
        >
          Prev
        </button>

        
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentPage === i + 1
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 rounded-lg text-sm font-medium
          bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed
          transition"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Residents;