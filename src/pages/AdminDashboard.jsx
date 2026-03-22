import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  IndianRupee,
  Users,
  Hotel,
  Wrench
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await axios.get(
        "https://hostelbackend-uzne.onrender.com/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading dashboard...
      </div>
    );

  const revenueData = [{ name: "Revenue", value: stats.revenue }];

  const occupancyData = [
    { name: "Occupied", value: stats.occupied },
    { name: "Available", value: stats.totalCapacity - stats.occupied },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

       
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <IndianRupee className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-xl font-bold text-green-600">
              ₹{stats.revenue}
            </h2>
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Residents</p>
            <h2 className="text-xl font-bold">
              {stats.totalResidents}
            </h2>
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Hotel className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Occupied Rooms</p>
            <h2 className="text-xl font-bold">
              {stats.occupied}
            </h2>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Wrench className="text-red-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-xl font-bold text-red-500">
              {stats.pendingMaintenance}
            </h2>
          </div>
        </div>

      </div>

      {/* 🔥 Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Revenue Overview
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Room Occupancy
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={occupancyData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {occupancyData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;