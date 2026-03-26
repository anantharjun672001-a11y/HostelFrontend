import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyRoom = () => {
  const [room, setRoom] = useState(null);
  const [residentId, setResidentId] = useState("");

  useEffect(() => {
    const fetchMyRoom = async () => {
      try {
        const res = await axios.get(
          "https://hostelbackend-uzne.onrender.com/api/resident/my-room",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setRoom(res.data.room);
        setResidentId(res.data._id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyRoom();
  }, []);

  const handleVacate = async () => {
    const confirmVacate = window.confirm(
      "Are you sure you want to vacate this room?"
    );

    if (!confirmVacate) return;

    try {
      await axios.post(
        "https://hostelbackend-uzne.onrender.com/api/room/vacate",
        { residentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Room vacated successfully");
      setRoom(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error vacating room");
    }
  };

  if (!room || !room.roomNumber) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          My Room
        </h1>

        <div className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg rounded-2xl p-8 text-gray-600 text-center">
          <p className="text-lg">
            You have not chosen a room yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      
      <h1 className="text-4xl font-bold text-gray-800">
        My Room
      </h1>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl">

        {/* Dynamic Room Image */}
        <div className="h-56 w-full overflow-hidden">
          <img
            src={
              room.image ||
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            }
            alt="Room"
            className="w-full h-full object-cover transition duration-500 hover:scale-110"
          />
        </div>

        
        <div className="p-6 space-y-4">

          <h2 className="text-2xl font-semibold text-gray-800">
            Room {room.roomNumber}
          </h2>

          <div className="grid grid-cols-2 gap-4 text-gray-600">

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-semibold">{room.type}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Capacity</p>
              <p className="font-semibold">{room.capacity}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition col-span-2">
              <p className="text-sm text-gray-500">Occupancy</p>
              <p className="font-semibold">
                {room.occupied} / {room.capacity}
              </p>
            </div>

          </div>

          {/* Dynamic Facilities */}
          <div className="mt-4">
            <p className="text-gray-500 text-sm mb-2">Facilities</p>

            <div className="flex flex-wrap gap-2">
              {room.facilities && room.facilities.length > 0 ? (
                room.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm hover:scale-105 transition"
                  >
                    {facility}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  No facilities available
                </p>
              )}
            </div>
          </div>

          {/* Vacate Button */}
          <button
            onClick={handleVacate}
            className="mt-6 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
          >
            Vacate Room
          </button>

        </div>
      </div>
    </div>
  );
};

export default MyRoom;