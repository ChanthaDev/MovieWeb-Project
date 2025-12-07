import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-900 text-white shadow hover:scale-105 transition">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="cursor-pointer"
        />
      </Link>

      <div className="p-3">
        <h2 className="font-bold text-lg">{movie.title}</h2>
        <p className="text-sm opacity-70">{movie.release_date?.slice(0, 4)}</p>
        <p className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}
