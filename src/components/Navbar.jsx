import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="w-full h-[100px] bg-gray-900 fixed top-0 left-0 z-50 shadow-lg">
      <nav className="max-w-full mx-auto h-full flex items-center justify-between px-6">

        {/* Logo */}
        <div
          className="text-3xl font-bold text-red-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Weflix
        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 text-white font-semibold text-lg">
          <li
            className="cursor-pointer hover:text-red-500 transition"
            onClick={() => navigate("/")}
          >
            Home
          </li>

          <li
            className="cursor-pointer hover:text-red-500 transition"
            onClick={() => navigate("/tv-series")}
          >
            TV Shows
          </li>

          <li
            className="cursor-pointer hover:text-red-500 transition"
            onClick={() => navigate("/movies")}
          >
            Movies
          </li>

          <li
            className="cursor-pointer hover:text-red-500 transition"
            onClick={() => navigate("/my-list")}  // <-- navigate to My List
          >
            My List
          </li>
        </ul>

        {/* Search + Account */}
        <div className="flex gap-6 text-white text-xl items-center">
          <form className="flex gap-3">
            <input
              placeholder="Search..."
              className="border rounded-full px-4 py-1 w-[250px] h-[35px] text-blue-50 bg-transparent focus:outline-none border-gray-400"
            />
            <button type="button" className="transition transform hover:scale-75">
              <Icon icon="mdi:magnify" width="35" height="35" className="text-red-600" />
            </button>
          </form>

          <span
            className="flex group cursor-pointer"
            onClick={() => setOpenLogin(true)}
          >
            <Icon
              icon="mdi:account"
              width="35"
              height="35"
              className="transition group-hover:scale-75 group-hover:text-red-600"
            />
          </span>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </div>
  );
}
