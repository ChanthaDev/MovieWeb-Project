import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100px] bg-gray-900 fixed top-0 left-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <div className="text-3xl font-bold text-red-600 cursor-pointer" onClick={() => navigate("/")}>
          MovieHub
        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 text-white font-semibold text-lg">
          <li className="cursor-pointer hover:text-red-500 transition" onClick={() => navigate("/")}>Home</li>
          <li className="cursor-pointer hover:text-red-500 transition" onClick={() => navigate("/tv-series")}>TV Shows</li>
          <li className="cursor-pointer hover:text-red-500 transition" onClick={() => navigate("/movies")}>Movies</li>
          <li className="cursor-pointer hover:text-red-500 transition">My List</li>
        </ul>

        {/* Icons */}
        <div className="flex gap-6 text-white text-xl">
          🔍
          👤
        </div>
      </nav>
    </div>
  );
}
