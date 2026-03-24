import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

const Residents = () => {
  const [residents, setResidents] = useState([]);

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

 
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this resident?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://hostelbackend-uzne.onrender.com/api/resident/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchResidents(); // refresh
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
          shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus size={18} />
          Create Resident
        </Link>

      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-100 shadow-lg rounded-2xl overflow-hidden">

        <table className="w-full text-sm text-left text-gray-600">

          <thead className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider">

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

            {residents.map((resident) => (

              <tr
                key={resident._id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >

                <td className="px-6 py-4 font-medium text-gray-900">
                  {resident.userId?.name}
                </td>

                <td className="px-6 py-4">
                  {resident.phone}
                </td>

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
                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Vacated
                    </span>
                  )}
                </td>

               
                <td className="px-6 py-4 flex justify-center gap-3">

                  
                  <Link
                    to={`/admin/residents/edit/${resident._id}`}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    <Pencil size={16} />
                  </Link>

                  
                  <button
                    onClick={() => handleDelete(resident._id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Residents;