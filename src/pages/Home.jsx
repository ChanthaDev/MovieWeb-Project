import { useEffect, useState } from "react";
import { fetchMovies, fetchMovieDetail, getTrailer } from "../data/api";
import TrailerModal from "../components/TrailerModal";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [trailerKey, setTrailerKey] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");

  // 🔍 Handle Search
  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const fetchSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=6e7e94041df0fb864babae0c56e66a2d&query=${query}`
      );

      const data = await res.json();
      setSearchResults(data.results || []);
    };

    fetchSearch();
  }, [query]);

  // Fetch home sections (only if NOT searching)
  useEffect(() => {
    if (query) return;

    fetchMovies(1).then((data) => setTopMovies(data.results.slice(0, 12)));
    fetchMovies(2).then((data) => setPopularMovies(data.results.slice(0, 12)));
    fetchMovies(3).then((data) => setRecentMovies(data.results.slice(0, 12)));

    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=6e7e94041df0fb864babae0c56e66a2d&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((data) => setTvSeries(data.results.slice(0, 12)));
  }, [query]);

  // Banner auto slide
  useEffect(() => {
    if (topMovies.length === 0 || query) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % topMovies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [topMovies, query]);

  const openTrailer = async (movie) => {
    const detail = await fetchMovieDetail(movie.id);
    const key = getTrailer(detail);
    setTrailerKey(key);
  };

  const currentBanner = topMovies[bannerIndex];

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-[100px]">

      {/* =======================================
          🔍 SHOW SEARCH RESULTS IF SEARCHING
      ======================================== */}
      {query ? (
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Search Results for: <span className="text-red-500">{query}</span>
          </h2>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-6 gap-4">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(
                      item.media_type === "tv"
                        ? `/tv/${item.id}`
                        : `/movie/${item.id}`
                    )
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      item.poster_path || item.backdrop_path
                    }`}
                    className="rounded-lg hover:scale-105 transition"
                  />
                  <h3 className="text-white mt-2 text-sm truncate">
                    {item.title || item.name}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xl">No results found.</p>
          )}
        </div>
      ) : (
        <>
          {/* ==== Top Movie Banner ==== */}
          {currentBanner && (
            <div
              onClick={() => navigate(`/movie/${currentBanner.id}`)}
              className="w-full h-[550px] relative mb-6 rounded overflow-hidden cursor-pointer transition-all duration-700"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${
                  currentBanner.backdrop_path || currentBanner.poster_path
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-6">
                <h1 className="text-4xl font-bold mb-2">{currentBanner.title}</h1>
                <p className="max-w-2xl text-gray-200 mb-4 line-clamp-3">
                  {currentBanner.overview}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openTrailer(currentBanner);
                  }}
                  className="bg-red-600 px-4 py-2 rounded text-white w-36 font-semibold"
                >
                  Watch Trailer
                </button>
              </div>
            </div>
          )}

          {/* ==== Sections ==== */}
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            <Section title="Top Movies" items={topMovies} navigate={navigate} />
            <Section title="Popular Movies" items={popularMovies} navigate={navigate} />
            <Section title="Recently Added" items={recentMovies} navigate={navigate} />
            <Section title="TV Series" items={tvSeries} navigate={navigate} />
          </div>
        </>
      )}

      {/* Trailer Modal */}
      <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
}

// ================= Section Component =================
function Section({ title, items, navigate }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-6 gap-4">
        {items.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="rounded-lg hover:scale-105 transition"
            />
            <h3 className="text-white mt-2 font-semibold text-sm truncate">
              {movie.title || movie.name}
            </h3>
            <p className="text-yellow-400 text-sm">
              ⭐ {(movie.vote_average || 0).toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
