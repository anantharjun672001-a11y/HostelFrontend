import { useEffect, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        "https://hostelbackend-nn7o.onrender.com/api/notification", 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNotifications(data);
    };

    fetch();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Bell className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          Notifications
        </h1>
      </div>

     
      {notifications.length === 0 ? (

        <div className="bg-white border border-gray-100 shadow-md rounded-xl p-10 text-center">

          <Bell size={40} className="mx-auto text-gray-300 mb-3" />

          <p className="text-gray-500">
            No notifications available
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {notifications.map((n) => (

            <div
              key={n._id}
              className={`p-5 rounded-xl border shadow-sm transition hover:shadow-md ${
                !n.read
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-100"
              }`}
            >

              
              <p className="text-gray-800 font-medium">
                {n.message}
              </p>

              
              <p className="text-xs text-gray-400 mt-2">
                {new Date(n.createdAt).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Notifications;