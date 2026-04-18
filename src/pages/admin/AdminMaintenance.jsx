import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

const AdminMaintenance = () => {
  const [requests, setRequests] = useState([]);
  const [staff, setStaff] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchRequests();
    fetchStaff();
  }, [filter, search]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "https://hostelbackend-nn7o.onrender.com/api/maintenance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      let data = res.data;

      
      if (search) {
        data = data.filter((req) =>
          req.issue.toLowerCase().includes(search.toLowerCase())
        );
      }

      
      if (filter !== "all") {
        data = data.filter((req) => req.status === filter);
      }

      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get(
        "https://hostelbackend-nn7o.onrender.com/api/auth/staff",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStaff(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssign = async (id, staffId) => {
    try {
      await axios.put(
        `https://hostelbackend-nn7o.onrender.com/api/maintenance/assign/${id}`,
        { staffId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Staff assigned");
      fetchRequests();
    } catch {
      toast.error("Error assigning staff");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://hostelbackend-nn7o.onrender.com/api/maintenance/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Status updated");
      fetchRequests();
    } catch {
      toast.error("Error updating status");
    }
  };

  
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(searchText);
      setCurrentPage(1);
    }
  };


  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentRequests = requests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">

        <h1 className="text-3xl font-bold text-gray-800">
          Maintenance Dashboard
        </h1>

        {/* FILTER */}
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
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <span className="absolute right-3 top-2.5 text-gray-400">▼</span>
        </div>

      </div>

      {/* SEARCH */}
      <div className="relative w-full md:w-1/3 group">
        <Search className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition" />

        <input
          type="text"
          placeholder="Search issue & press Enter..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white
          shadow-sm transition-all duration-300
          group-hover:shadow-md group-hover:border-blue-400
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">

        <table className="w-full text-sm text-left text-gray-600">

          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Resident</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Issue</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Assigned</th>
              <th className="px-6 py-3">Assign</th>
              <th className="px-6 py-3">Update</th>
            </tr>
          </thead>

          <tbody>
            {currentRequests.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-400">
                  No requests found
                </td>
              </tr>
            ) : (
              currentRequests.map((req) => (
                <tr
                  key={req._id}
                  className="border-t hover:bg-blue-50/50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {req.resident?.userId?.name}
                  </td>

                  <td className="px-6 py-4">{req.room?.roomNumber}</td>

                  <td className="px-6 py-4">{req.issue}</td>

                  {/* PRIORITY */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : req.priority === "medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {req.priority}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === "pending"
                          ? "bg-gray-100 text-gray-600"
                          : req.status === "in-progress"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {req.assignedTo ? req.assignedTo.name : "—"}
                  </td>

                  {/* ASSIGN */}
                  <td className="px-6 py-4">
                    <select
                      onChange={(e) =>
                        handleAssign(req._id, e.target.value)
                      }
                      className="px-3 py-1.5 rounded-lg border bg-gray-50
                      hover:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    >
                      <option value="">Assign</option>
                      {staff.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* STATUS UPDATE */}
                  <td className="px-6 py-4">
                    <select
                      onChange={(e) =>
                        updateStatus(req._id, e.target.value)
                      }
                      className="px-3 py-1.5 rounded-lg border bg-gray-50
                      hover:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    >
                      <option value="">Update</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

        {/* PREV */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 rounded-lg text-sm font-medium
          bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed
          transition"
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
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

        {/* NEXT */}
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

export default AdminMaintenance;