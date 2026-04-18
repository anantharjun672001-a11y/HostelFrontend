import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    const fetchNotifications = async () => {
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

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAsRead = async (id) => {
    await axios.put(
      `https://hostelbackend-nn7o.onrender.com/api/notification/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, read: true } : n
      )
    );
  };

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>

      {/*  Bell */}
      <div
        onClick={() => setOpen(!open)}
        className="relative cursor-pointer"
      >
        <Bell className="text-gray-700 hover:text-gray-900 transition-transform duration-200 hover:scale-110" />

        {unread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">
            {unread}
          </span>
        )}
      </div>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-3 w-72 bg-white shadow-xl rounded-lg overflow-hidden z-50 
        transform transition-all duration-300 ease-out
        ${
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}
      >

        <div className="px-4 py-2 font-semibold border-b">
          Notifications
        </div>

        <div className="max-h-64 overflow-y-auto">

          {notifications.length === 0 ? (
            <p className="p-4 text-gray-500 text-sm">
              No notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => markAsRead(n._id)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition ${
                  !n.read ? "font-semibold bg-blue-50" : ""
                }`}
              >
                {n.message}
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default NotificationBell;