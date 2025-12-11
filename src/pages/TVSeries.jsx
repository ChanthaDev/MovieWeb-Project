import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

// TV series genres mapping
const genres = [
  "All",
  "Animation",
  "Drama",
  "Comedy",
  "Action & Adventure",
  "Kids",
  "Sci-Fi & Fantasy",
  "News",
  "Reality",
  "Soap",
  "Talk",
];

const genreMap = {
  Animation: [16],
  Drama: [18],
  Comedy: [35],
  "Action & Adventure": [10759],
  Kids: [10762],
  "Sci-Fi & Fantasy": [10765],
  News: [10763],
  Reality: [10764],
  Soap: [10766],
  Talk: [10767],
};

export default function TVSeries() {
  const [tvShows, setTvShows] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTv = async () => {
      let allShows = [];
      for (let page = 1; page <= 5; page++) {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=6e7e94041df0fb864babae0c56e66a2d&language=en-US&page=${page}`
        );
        const data = await res.json();
        allShows = allShows.concat(data.results);
      }
      setTvShows(allShows);
    };
    fetchTv();
  }, []);

  // Filter TV shows by genre
  const filteredShows =
    selectedGenre === "All"
      ? tvShows
      : tvShows.filter((show) =>
          show.genre_ids.some((id) => genreMap[selectedGenre]?.includes(id))
        );

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-[100px]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold mb-4">TV Series</h1>

        {/* Genre dropdown */}
        <select
          className="mb-4 p-2 rounded bg-gray-800 text-white"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((g, idx) => (
            <option key={idx} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* TV Shows grid */}
        {filteredShows.length === 0 ? (
          <p className="text-white">No TV shows found.</p>
        ) : (
          <div className="grid grid-cols-8 gap-4">
            {filteredShows.slice(0, 48).map((show) => (
              <div
                key={show.id}
                className="cursor-pointer"
                onClick={() => navigate(`/series/${show.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <h3 className="text-white mt-2 font-semibold text-sm truncate">
                  {show.name}
                </h3>
                <p className="text-yellow-400 text-sm">
                  ⭐ {(show.vote_average || 0).toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
