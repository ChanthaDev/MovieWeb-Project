import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function MyList() {
  const [myList, setMyList] = useState([]);
  const navigate = useNavigate();

  // Load list on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myList") || "[]");
    setMyList(saved);
  }, []);

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-[100px]">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">My List</h1>
        {myList.length === 0 ? (
          <p>No movies in your list yet.</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {myList.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <h3 className="text-white mt-2 font-semibold text-sm truncate">
                  {movie.title}
                </h3>
                <p className="text-yellow-400 text-sm">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
