// src/components/MovieCard.jsx
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  // Use title for movies, name for TV series
  const displayTitle = movie.title || movie.name;

  return (
    <div
      className="cursor-pointer hover:scale-105 transition-transform"
      onClick={() =>
        navigate(movie.title ? `/movie/${movie.id}` : `/series/${movie.id}`)
      }
    >
      {/* Movie/Series Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={displayTitle}
        className="rounded-lg w-full h-[300px] object-cover"
      />

      {/* Title */}
      <h3 className="text-white mt-2 font-semibold text-sm truncate">
        {displayTitle}
      </h3>

      {/* Rating */}
      <p className="text-yellow-400 text-sm">
        ⭐ {(movie.vote_average || 0).toFixed(1)}
      </p>
    </div>
  );
}
