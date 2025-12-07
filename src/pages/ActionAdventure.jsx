import { useEffect, useState } from "react";
import { fetchMovieDetail, getTrailer } from "../data/api";
import Navbar from "../components/Navbar";
import TrailerModal from "../components/TrailerModal";
import { useNavigate } from "react-router-dom";

export default function ActionAdventure() {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const navigate = useNavigate();

  // Fetch Action & Adventure movies
  useEffect(() => {
    const API_KEY = "6e7e94041df0fb864babae0c56e66a2d";
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28,12&language=en-US&page=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results.slice(0, 12))) // first 12 movies
      .catch((err) => console.log(err));
  }, []);

  const openTrailer = async (movie) => {
    const detail = await fetchMovieDetail(movie.id);
    const key = getTrailer(detail);
    setTrailerKey(key);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-[100px]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold mb-4">Action & Adventure Movies</h1>

        {/* Movie Grid */}
        <div className="grid grid-cols-6 gap-4">
          {movies.map((movie) => (
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
