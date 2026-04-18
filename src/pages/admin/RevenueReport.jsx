import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  IndianRupee,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const RevenueReport = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const res = await axios.get(
        "https://hostelbackend-nn7o.onrender.com/api/bill/report",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-gray-500">
        Loading revenue report...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

     
      <h1 className="text-3xl font-bold text-gray-800">
        Revenue Report
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        
        <div className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white 
        rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105">

          <div className="flex items-center justify-between">
            <p className="text-sm opacity-90">Total Revenue</p>
            <IndianRupee className="opacity-80 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            ₹{data.totalRevenue}
          </h2>

        </div>

      
        <div className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
        rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105">

          <div className="flex items-center justify-between">
            <p className="text-sm opacity-90">This Month</p>
            <TrendingUp className="opacity-80 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            ₹{data.thisMonthRevenue}
          </h2>

        </div>

       
        <div className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white 
        rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105">

          <div className="flex items-center justify-between">
            <p className="text-sm opacity-90">Paid Bills</p>
            <CheckCircle className="opacity-80 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {data.paidBills}
          </h2>

        </div>

        
        <div className="group bg-gradient-to-r from-red-500 to-orange-500 text-white 
        rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105">

          <div className="flex items-center justify-between">
            <p className="text-sm opacity-90">Pending Bills</p>
            <AlertCircle className="opacity-80 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {data.pendingBills}
          </h2>

        </div>

      </div>

      
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={data.monthlyRevenue}>

            <XAxis dataKey="_id" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="url(#colorGradient)"
              radius={[8, 8, 0, 0]}
            />

            
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
              </linearGradient>
            </defs>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RevenueReport;