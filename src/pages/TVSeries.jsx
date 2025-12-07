import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TrailerModal from "../components/TrailerModal";
import { fetchMovieDetail, getTrailer } from "../data/api";

// TMDB TV series genres mapping
const tvGenreMap = {
  16: "Animation",
  18: "Drama",
  35: "Comedy",
  10759: "Action & Adventure",
  10762: "Kids",
  10765: "Sci-Fi & Fantasy",
  10763: "News",
  10764: "Reality",
  10766: "Soap",
  10767: "Talk",
};

export default function TVSeries() {
  const [tvShows, setTvShows] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();

  const genreNames = ["All", ...Object.values(tvGenreMap)];

  // fetch popular TV shows (5 pages ≈ 100 shows)
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

  const openTrailer = async (show) => {
    const detail = await fetchMovieDetail(show.id);
    const key = getTrailer(detail);
    setTrailerKey(key);
  };

  // Filter by genre using genre_ids
  const filteredShows =
    selectedGenre === "All"
      ? tvShows
      : tvShows.filter((show) =>
          show.genre_ids.some((id) => tvGenreMap[id] === selectedGenre)
        );

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-[100px]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold mb-4">TV Series</h1>

        {/* Genre Dropdown */}
        <select
          className="mb-4 p-2 rounded bg-gray-800 text-white"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genreNames.map((g, idx) => (
            <option key={idx} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* TV Shows Grid: 6 rows × 8 cards → 48 shows */}
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
      </div>

      <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
}
