import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setOpenMenu(false);
  };

  return (
    <>
      {/* Navbar */}
      <div className="w-full h-[80px] md:h-[100px] bg-gray-900 fixed top-0 z-50 flex items-center px-4 md:px-6 justify-between shadow-2xl">

        {/* Logo */}
        <div
          className="text-2xl md:text-3xl font-bold text-red-600 cursor-pointer"
          onClick={() => handleNav("/")}
        >
          Weflix
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white font-semibold">
          <li onClick={() => handleNav("/")} className="cursor-pointer hover:text-red-500">Home</li>
          <li onClick={() => handleNav("/movies")} className="cursor-pointer hover:text-red-500">Movies</li>
          <li onClick={() => handleNav("/tv-series")} className="cursor-pointer hover:text-red-500">TV Shows</li>
          <li onClick={() => handleNav("/my-list")} className="cursor-pointer hover:text-red-500">My List</li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4 text-white">

          {/* Search (hide on small) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.search.value.trim();
              if (!query) return;
              navigate(`/?search=${query}`);
              e.target.reset();
            }}
            className="hidden md:flex gap-2"
          >
            <input
              name="search"
              placeholder="Search..."
              className="bg-transparent border border-gray-500 rounded-full px-4 py-1 text-sm"
            />
            <button type="submit">
              <Icon icon="mdi:magnify" width="26" />
            </button>
          </form>

          {/* Account */}
          <Icon
            icon="mdi:account"
            width="30"
            className="cursor-pointer hover:text-red-600"
            onClick={() => setOpenLogin(true)}
          />

          {/* Hamburger (Mobile) */}
          <Icon
            icon="mdi:menu"
            width="34"
            className="md:hidden cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="fixed top-[80px] left-0 w-full bg-gray-900 text-white flex flex-col items-center gap-6 py-6 md:hidden z-40">

          <input
            placeholder="Search..."
            className="bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm w-4/5"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/?search=${e.target.value}`);
                setOpenMenu(false);
              }
            }}
          />

          <span onClick={() => handleNav("/")} className="cursor-pointer hover:text-red-500">Home</span>
          <span onClick={() => handleNav("/movies")} className="cursor-pointer hover:text-red-500">Movies</span>
          <span onClick={() => handleNav("/tv-series")} className="cursor-pointer hover:text-red-500">TV Shows</span>
          <span onClick={() => handleNav("/my-list")} className="cursor-pointer hover:text-red-500">My List</span>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
}
