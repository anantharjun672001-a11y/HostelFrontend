import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvailableRooms = () => {

  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchRooms = async () => {

      try {

        const res = await axios.get(
          "https://hostelbackend-uzne.onrender.com/api/room/available"
        );

        setRooms(res.data);

      } catch (error) {
        console.log(error);
      }

    };

    fetchRooms();

  }, []);

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Available Rooms
      </h1>

      {rooms.length === 0 ? (

        <div className="bg-white border border-gray-100 shadow-md rounded-xl p-6 text-gray-500">
          No rooms available
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {rooms.map((room) => (

            <div
              key={room._id}
              className="bg-white border border-gray-100 shadow-md rounded-xl p-6 
              hover:shadow-xl hover:scale-105 transition cursor-pointer"
              onClick={() => navigate(`/resident/room/${room._id}`)}
            >

              <h2 className="text-lg font-semibold mb-3">
                Room {room.roomNumber}
              </h2>

              <div className="space-y-1 text-gray-600 text-sm">

                <p>
                  <span className="font-medium">Type:</span> {room.type}
                </p>

                <p>
                  <span className="font-medium">Capacity:</span> {room.capacity}
                </p>

                <p>
                  <span className="font-medium">Occupied:</span> {room.occupied}/{room.capacity}
                </p>

              </div>

              <button
                className="mt-5 w-full py-2 rounded-lg text-white font-medium
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-emerald-600 hover:to-green-500
                transition-all duration-300
                transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl"
              >
                View & Choose
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default AvailableRooms;