import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100px] bg-gray-900 fixed top-0 left-0 z-50 shadow-lg">
      <nav className="max-w-full mx-auto h-full flex items-center justify-between px-6">
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
        <div className="flex gap-6 text-white text-xl items-center ">
          <form action="" className=" flex gap-3 ">
            <input placeholder="Search..." className="border rounded-full px-4 py-1 w-[250px] h-[35px] text-blue-50" />
            <div className="">
              <button type="button" class=" transition transform hover:scale-75"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#f40e0e" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" /></svg>
              </button>
            </div>
          </form>
          <span className="flex  group cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              className="transition group-hover:scale-75 group-hover:fill-red-600"
            >
              <path
                fill="#f40e0e"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
          </span>


        </div>
      </nav>
    </div>
  );
}
