import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../assets/hostel.jpg"; // same image use pannu

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await axios.post(
        "https://hostelbackend-uzne.onrender.com/api/auth/login",
        data,
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="relative min-h-screen w-full">

      {/* Background */}
      <img
        src={bgImage}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl">

          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Hostel Management
          </h1>

          <p className="text-center text-gray-200 mb-6">
            Sign in to your account
          </p>

          {/* Demo credentials */}
          <div className="bg-white/10 p-4 rounded-lg mb-5 text-sm text-gray-200 border border-white/20">
            <p className="font-semibold mb-2 text-white">Demo Credentials:</p>

            <p><b>Admin</b></p>
            <p>Email: anantharjun672001@gmail.com</p>
            <p>Password: Ananthraj</p>

            <p className="mt-2"><b>Staff</b></p>
            <p>Email: manoj@gmail.com</p>
            <p>Password: Manoj</p>

          
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block mb-1 text-sm text-gray-200">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-200">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2.5 rounded-lg flex justify-center items-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center text-gray-300 mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;