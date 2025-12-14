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

  // Remove item from My List
  const handleRemove = (id, type) => {
    const newList = myList.filter((item) => !(item.id === id && item.type === type));
    setMyList(newList);
    localStorage.setItem("myList", JSON.stringify(newList));
    alert("Removed from My List");
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-[100px] pb-[100px]">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">My List</h1>
        {myList.length === 0 ? (
          <p>No movies or series in your list yet.</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {myList.map((item) => (
              <div key={`${item.type}-${item.id}`} className="relative">
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(item.type === "movie" ? `/movie/${item.id}` : `/series/${item.id}`)
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <h3 className="text-white mt-2 font-semibold text-sm truncate">
                    {item.title}
                  </h3>
                  {item.vote_average !== undefined && (
                    <p className="text-yellow-400 text-sm">
                      ⭐ {item.vote_average?.toFixed(1)}
                    </p>
                  )}
                </div>
                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.id, item.type)}
                  className="absolute top-2 right-2 bg-red-600 px-2 py-1 text-white rounded text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
