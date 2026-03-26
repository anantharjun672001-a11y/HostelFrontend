import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(
        "https://hostelbackend-uzne.onrender.com/api/auth/register",
        form
      );

      toast.success("Account created successfully ");

      navigate("/login");

    } catch (error) {

      toast.error(error.response?.data?.message || "Registration failed");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 p-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 space-y-6 border border-gray-100">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-center text-gray-500 text-sm">
          Register as a resident
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline font-medium"
          >
            Login
          </span>
        </p>

      </div>

    </div>

  );
};

export default Register;