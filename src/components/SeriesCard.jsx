import { Link } from "react-router-dom";

export default function SeriesCard({ series }) {
  if (!series) return null;
  return (
    <Link to={`/series/${series.id}`}>
      <div className="rounded-lg overflow-hidden bg-gray-900 text-white shadow hover:scale-105 transition cursor-pointer">
        <img
          src={
            series.poster_path
              ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={series.name}
          className="w-full h-[300px] object-cover"
        />
        <div className="p-3">
          <h2 className="font-bold text-lg line-clamp-1">{series.name}</h2>
          <p className="text-sm opacity-70">{series.first_air_date?.slice(0, 4) ?? "N/A"}</p>
          <p className="text-yellow-400">⭐ {(series.vote_average || 0).toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
}
