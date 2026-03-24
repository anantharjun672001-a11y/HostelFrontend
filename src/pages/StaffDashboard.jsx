import { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardList,
  Clock,
  Loader,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const StaffDashboard = () => {

  const [stats,setStats] = useState({
    total:0,
    pending:0,
    inprogress:0,
    resolved:0
  });

  useEffect(()=>{
    fetchTasks();
  },[]);

  const fetchTasks = async ()=>{
    try{
      const res = await axios.get(
        "https://hostelbackend-uzne.onrender.com/api/maintenance",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const data = res.data;

      setStats({
        total:data.length,
        pending:data.filter(t=>t.status==="pending").length,
        inprogress:data.filter(t=>t.status==="in-progress").length,
        resolved:data.filter(t=>t.status==="resolved").length
      });

    }catch(error){
      console.log(error);
    }
  };

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-8">

    
      <h1 className="text-3xl font-bold text-gray-800">
        Staff Dashboard
      </h1>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        
        <div className="group bg-gradient-to-r from-indigo-500 to-blue-600 text-white 
        rounded-2xl p-5 shadow-lg hover:shadow-2xl transition transform hover:scale-105">

          <div className="flex justify-between items-center">
            <p className="text-sm opacity-90">Total Tasks</p>
            <ClipboardList className="opacity-80 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {stats.total}
          </h2>
        </div>

       
        <div className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-white 
        rounded-2xl p-5 shadow-lg hover:shadow-2xl transition transform hover:scale-105">

          <div className="flex justify-between items-center">
            <p className="text-sm opacity-90">Pending</p>
            <Clock className="opacity-80 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {stats.pending}
          </h2>
        </div>

       
        <div className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
        rounded-2xl p-5 shadow-lg hover:shadow-2xl transition transform hover:scale-105">

          <div className="flex justify-between items-center">
            <p className="text-sm opacity-90">In Progress</p>
            <Loader className="opacity-80 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {stats.inprogress}
          </h2>
        </div>

        
        <div className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white 
        rounded-2xl p-5 shadow-lg hover:shadow-2xl transition transform hover:scale-105">

          <div className="flex justify-between items-center">
            <p className="text-sm opacity-90">Resolved</p>
            <CheckCircle className="opacity-80 group-hover:scale-110 transition" />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {stats.resolved}
          </h2>
        </div>

      </div>

    
      <div className="bg-white shadow-lg rounded-2xl p-6">

        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Quick Action
        </h2>

        <p className="text-gray-500 mb-5">
          View and manage your assigned maintenance tasks.
        </p>

        <a
          href="/admin/maintenance"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
          bg-gradient-to-r from-blue-500 to-indigo-600 text-white
          shadow-md hover:shadow-xl
          hover:from-indigo-600 hover:to-blue-500
          transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Go to Maintenance
          <ArrowRight size={16} />
        </a>

      </div>

    </div>
  );
};

export default StaffDashboard;