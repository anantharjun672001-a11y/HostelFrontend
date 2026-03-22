import { useEffect, useState } from "react";
import axios from "axios";

const RoomTable = ({ search = "", filter = "all" }) => {

  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get(
        "https://hostelbackend-uzne.onrender.com/api/room",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRooms(res.data);
    };

    fetchRooms();
  }, []);

  // reset page
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  //  search
  let filteredRooms = rooms.filter((room) => {
    const term = search.toLowerCase();
    return (
      room.roomNumber.toString().includes(term) ||
      room.type.toLowerCase().includes(term)
    );
  });

  //  filter
  if (filter === "available") {
    filteredRooms = filteredRooms.filter(
      (room) => room.occupied < room.capacity
    );
  }

  if (filter === "full") {
    filteredRooms = filteredRooms.filter(
      (room) => room.occupied >= room.capacity
    );
  }

  //  pagination
  const indexOfLast = currentPage * itemsPerPage;
  const currentRooms = filteredRooms.slice(
    indexOfLast - itemsPerPage,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  return (
    <div className="rounded-xl overflow-hidden">

      <table className="w-full text-sm text-left">

        <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">Room No</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Capacity</th>
            <th className="px-6 py-3">Occupied</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {currentRooms.map((room) => (
            <tr key={room._id} className="border-b hover:bg-gray-50 transition">

              <td className="px-6 py-4 font-medium">
                {room.roomNumber}
              </td>

              <td className="px-6 py-4 capitalize">
                {room.type}
              </td>

              <td className="px-6 py-4">
                {room.capacity}
              </td>

              <td className="px-6 py-4">
                {room.occupied}
              </td>

              <td className="px-6 py-4">
                {room.occupied >= room.capacity ? (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                    Full
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    Available
                  </span>
                )}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

      {/* PAGINATION */}
      <div className="flex justify-between items-center p-4">

        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm font-medium">
          Page {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default RoomTable;