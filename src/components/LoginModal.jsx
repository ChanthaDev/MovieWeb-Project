import React from "react";

export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999]">

      {/* Modal Box */}
      <div className="bg-gray-900 w-[400px] rounded-xl p-8 shadow-lg border border-gray-700 animate-fadeIn">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Login
        </h2>

        {/* Email */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mb-6">
          <label className="text-gray-300 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-red-600 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="text-gray-400 text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span className="text-red-500 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>

        {/* Close Button */}
        <button
          className="mt-6 w-full text-gray-400 hover:text-white text-sm"
          onClick={onClose}
        >
        
          Close
        </button>d
      </div>
    </div>
  );
  
}
