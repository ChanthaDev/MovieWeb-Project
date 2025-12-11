import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  if (!movie) return null;
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="rounded-lg overflow-hidden bg-gray-900 text-white shadow hover:scale-105 transition cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[300px] object-cover"
        />
        <div className="p-3">
          <h2 className="font-bold text-lg line-clamp-1">{movie.title}</h2>
          <p className="text-sm opacity-70">{movie.release_date?.slice(0, 4)}</p>
          <p className="text-yellow-400">⭐ {movie.vote_average?.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
}
