import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/hostel.jpg"; // un image path

const Home = () => {
  return (
    <div className="relative min-h-screen w-full">

      {/* Background Image */}
      <img
        src={bgImage}
        alt="hostel"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10">

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-20 text-center text-white">

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hostel Management System
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-200">
            Manage hostel rooms, residents, billing, payments and maintenance
            easily with our modern hostel management platform.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-300 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium transition"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-6 pb-20">

          <h2 className="text-2xl font-bold text-center text-white mb-10">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Card */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Room Management
              </h3>
              <p className="text-gray-200 text-sm">
                Easily create rooms, assign residents and track availability.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Billing & Payments
              </h3>
              <p className="text-gray-200 text-sm">
                Generate bills and allow residents to pay online securely.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Maintenance Requests
              </h3>
              <p className="text-gray-200 text-sm">
                Residents can raise maintenance requests and track status.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;