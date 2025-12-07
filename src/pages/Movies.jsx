import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchMovies, fetchMovieDetail, getTrailer } from "../data/api";
import { useNavigate } from "react-router-dom";
import TrailerModal from "../components/TrailerModal";

const genres = [
  "Action & Adventure",
  "Adventure",
  "Crime",
  "Romance",
  "Thriller",
  "Action",
  "Animation",
  "Drama",
  "Fantasy",
  "Music",
  "Sci-Fi & Fantasy",
  "War",
  "Adult",
  "Comedy",
  "Documentary",
  "Family",
  "History",
  "Horror",
  "Mystery",
  "Science Fiction",
];

const genreMap = {
  "Action & Adventure": [28, 12],
  Adventure: [12],
  Crime: [80],
  Romance: [10749],
  Thriller: [53],
  Action: [28],
  Animation: [16],
  Drama: [18],
  Fantasy: [14],
  Music: [10402],
  "Sci-Fi & Fantasy": [878, 14],
  War: [10752],
  Adult: [18],
  Comedy: [35],
  Documentary: [99],
  Family: [10751],
  History: [36],
  Horror: [27],
  Mystery: [9648],
  "Science Fiction": [878],
};

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();

  // Fetch multiple pages to get enough movies (at least 48)
  useEffect(() => {
    const fetchMultiplePages = async () => {
      let allMovies = [];
      for (let page = 1; page <= 5; page++) { // 5 pages = ~100 movies
        const data = await fetchMovies(page);
        allMovies = allMovies.concat(data.results);
      }
      setMovies(allMovies);
    };
    fetchMultiplePages();
  }, []);

  const openTrailer = async (movie) => {
    const detail = await fetchMovieDetail(movie.id);
    const key = getTrailer(detail);
    setTrailerKey(key);
  };

  const filteredMovies = movies.filter((m) =>
    selectedGenre === "All"
      ? true
      : m.genre_ids.some((id) => genreMap[selectedGenre].includes(id))
  );

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-[100px]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold mb-4">Movies</h1>

        {/* Genre Dropdown */}
        <select
          className="mb-4 p-2 rounded bg-gray-800 text-white"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="All">All Genres</option>
          {genres.map((g, idx) => (
            <option key={idx} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Movie Grid: 6 rows × 8 cards → 48 movies */}
        <div className="grid grid-cols-8 gap-4">
          {filteredMovies.slice(0, 48).map((movie) => (
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
                ⭐ {(movie.vote_average || 0).toFixed(1)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
}
