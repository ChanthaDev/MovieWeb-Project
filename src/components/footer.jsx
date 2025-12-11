import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-3">Weflix</h2>
          <p className="text-sm leading-6">
            Website មើលខ្សែភាពយន្តខ្មែរ & ខ្សែភាពយន្តបរទេស  
            មើលបានគ្រប់ប្រភេទ HD Full.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Menu</h3>
          <ul className="space-y-2">
            <li
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/movies")}
            >
              Movies
            </li>
            <li
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/tv-series")}
            >
              TV Series
            </li>
            <li
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Categories – directly filter movies */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Categories</h3>
          <ul className="space-y-2">
            <li
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/movies?category=khmer")}
            >
              Khmer Movies
            </li>
            <li
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/movies?category=thai")}
            >
              Thai Movies
            </li>
            <li
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/movies?category=korean")}
            >
              Korean Movies
            </li>
            <li
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/movies?category=chinese")}
            >
              Chinese Movies
            </li>
            <li
              className="hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/movies?category=action")}
            >
              Action / Adventure
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex gap-4">
            <a
              className="hover:text-red-500"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              className="hover:text-red-500"
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <a
              className="hover:text-red-500"
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm">
        © 2025 MovieHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
