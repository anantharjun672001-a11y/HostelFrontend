import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Mail, Lock } from "lucide-react";

const CreateUsers = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://hostelbackend-nn7o.onrender.com/api/admin/create-user",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message);

      setData({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {

      toast.error(error.response?.data?.message || "Error");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md 
      rounded-2xl shadow-xl p-6 space-y-6">

       
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Resident User
        </h2>

       
        <form onSubmit={handleSubmit} className="space-y-4">

          
          <div className="relative group">
            <User className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition" />

            <input
              type="text"
              placeholder="Enter name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border bg-white
              shadow-sm transition-all duration-300
              group-hover:border-blue-400 group-hover:shadow-md
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          
          <div className="relative group">
            <Mail className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition" />

            <input
              type="email"
              placeholder="Enter email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border bg-white
              shadow-sm transition-all duration-300
              group-hover:border-blue-400 group-hover:shadow-md
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          
          <div className="relative group">
            <Lock className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition" />

            <input
              type="password"
              placeholder="Enter password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border bg-white
              shadow-sm transition-all duration-300
              group-hover:border-blue-400 group-hover:shadow-md
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

         
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-white font-medium
            bg-gradient-to-r from-blue-500 to-indigo-600
            hover:from-indigo-600 hover:to-blue-500
            shadow-md hover:shadow-xl
            transition-all duration-300
            transform hover:scale-105 active:scale-95"
          >
            Create Resident
          </button>

        </form>

      </div>

    </div>

  );

};

export default CreateUsers;