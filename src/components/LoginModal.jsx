import { useState } from "react";

export default function LoginModal({ open, onClose }) {
  const [isSignup, setIsSignup] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
      <div className="bg-gray-900 w-[400px] rounded-xl p-8 shadow-lg border border-gray-700 animate-fadeIn">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {/* NAME (SIGN UP ONLY) */}
        {isSignup && (
          <div className="flex flex-col mb-4">
            <label className="text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col mb-6">
          <label className="text-gray-300 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-red-600"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button className="w-full bg-red-600 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition">
          {isSignup ? "Create Account" : "Login"}
        </button>

        {/* SWITCH LOGIN / SIGN UP */}
        <p className="text-gray-400 text-center mt-4 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-red-500 cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

        {/* CLOSE */}
        <button
          className="mt-6 w-full text-gray-400 hover:text-white text-sm "
          onClick={() => {
            setIsSignup(false);
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
