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
  Legend,
} from "recharts";

import {
  IndianRupee,
  Users,
  Hotel,
  Wrench,
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
      <div className="p-10 text-center text-gray-500 animate-pulse">
        Loading dashboard...
      </div>
    );

  const revenueData = [{ name: "Revenue", value: stats.revenue }];

  const occupancyData = [
    { name: "Occupied", value: stats.occupied },
    { name: "Available", value: stats.totalCapacity - stats.occupied },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-xl p-5 shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
            <IndianRupee />
          </div>
          <div>
            <p className="text-sm opacity-80">Total Revenue</p>
            <h2 className="text-2xl font-bold">₹{stats.revenue}</h2>
          </div>
        </div>

        
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl p-5 shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Users />
          </div>
          <div>
            <p className="text-sm opacity-80">Residents</p>
            <h2 className="text-2xl font-bold">{stats.totalResidents}</h2>
          </div>
        </div>

        
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-xl p-5 shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Hotel />
          </div>
          <div>
            <p className="text-sm opacity-80">Occupied Rooms</p>
            <h2 className="text-2xl font-bold">{stats.occupied}</h2>
          </div>
        </div>

        
        <div className="bg-gradient-to-r from-red-500 to-red-400 text-white rounded-xl p-5 shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Wrench />
          </div>
          <div>
            <p className="text-sm opacity-80">Pending</p>
            <h2 className="text-2xl font-bold">{stats.pendingMaintenance}</h2>
          </div>
        </div>

      </div>

      
      <div className="grid md:grid-cols-2 gap-6">

        {/* Revenue */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Revenue Overview
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
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
                innerRadius={50}   
                paddingAngle={5}
              >
                {occupancyData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;