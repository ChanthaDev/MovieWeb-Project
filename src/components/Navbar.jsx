import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <div className="w-full h-[100px] bg-gray-900 fixed top-0 z-50 flex items-center px-6 justify-between shadow-2xl">

        {/* Logo */}
        <div
          className="text-3xl font-bold text-red-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Weflix
        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 text-white font-semibold">
          <li onClick={() => navigate("/")} className="cursor-pointer hover:text-red-500">Home</li>
          <li onClick={() => navigate("/movies")} className="cursor-pointer hover:text-red-500">Movies</li>
          <li onClick={() => navigate("/tv-series")} className="cursor-pointer hover:text-red-500">TV Shows</li>
          <li onClick={() => navigate("/my-list")} className="cursor-pointer hover:text-red-500">My List</li>
        </ul>

        {/* Search + Account */}
        <div className="flex items-center gap-5 text-white">

          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.search.value.trim();
              if (!query) return;
              navigate(`/?search=${query}`);
              e.target.reset();
            }}
            className="flex gap-2"
          >
            <input
              name="search"
              placeholder="Search..."
              className="bg-transparent border border-gray-500 rounded-full px-4 py-1 text-sm"
            />
            <button type="submit">
              <Icon icon="mdi:magnify" width="28" />
            </button>
          </form>

          {/* Account */}
          <Icon
            icon="mdi:account"
            width="32"
            className="cursor-pointer hover:text-red-600"
            onClick={() => setOpenLogin(true)}
          />
        </div>
      </div>

      {/* Login Popup */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
}
