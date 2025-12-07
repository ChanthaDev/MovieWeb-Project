import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TrailerModal from "../components/TrailerModal";
import MovieCard from "../components/MovieCard";
import { fetchSeriesDetail, fetchTVSeries, getTrailer } from "../data/api";

export default function SeriesDetail() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // Fetch series detail
  useEffect(() => {
    fetchSeriesDetail(id).then((data) => setSeries(data));
  }, [id]);

  // Fetch recommendations (TV series)
  useEffect(() => {
    fetchTVSeries(1).then((data) => setRecommendations(data.results));
  }, []);

  if (!series) return <p className="text-white p-4">Loading...</p>;

  const trailer = getTrailer(series);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    setComments([...comments, commentText.trim()]);
    setCommentText("");
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      {/* Trailer Banner */}
      <div className="max-w-6xl mx-auto p-6 mt-6 relative">
        {trailer ? (
          <div className="relative w-full h-[600px] bg-black rounded overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${trailer}?autoplay=0&controls=1`}
              title={series.name}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setTrailerKey(trailer)}
              className="absolute bottom-4 right-4 bg-red-600 px-4 py-2 rounded text-white"
            >
              Watch Trailer
            </button>
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${series.backdrop_path || series.poster_path}`}
            alt={series.name}
            className="w-full h-[400px] object-cover rounded"
          />
        )}
      </div>

      {/* Series Details */}
      <div className="max-w-6xl mx-auto p-6 mt-6 flex flex-col md:flex-row gap-6">
        {/* Left: Poster */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={
              series.poster_path
                ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={series.name}
            className="rounded shadow-lg w-full"
          />
        </div>

        {/* Right: Details */}
        <div className="flex-1 text-white">
          <h1 className="text-3xl font-bold mb-4">{series.name}</h1>
          <p className="mb-2">{series.overview}</p>
          <p className="mb-2">First Air Date: {series.first_air_date}</p>
          <p className="mb-2">Rating: ⭐ {(series.vote_average ?? 0).toFixed(1)}</p>

          {/* Cast */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Cast</h2>
            <div className="grid grid-cols-6 gap-4">
              {series.credits?.cast.slice(0, 6).map((actor) => (
                <div key={actor.id} className="flex flex-col items-center text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://via.placeholder.com/100?text=No+Image"
                    }
                    alt={actor.name}
                    className="w-16 h-16 object-cover rounded-full mb-1 border-2 border-gray-700"
                  />
                  <p className="text-xs font-semibold line-clamp-1">{actor.name}</p>
                  <p className="text-[10px] text-gray-400 line-clamp-1">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2 mb-4">
          <textarea
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded text-white w-32"
          >
            Post Comment
          </button>
        </form>
        <div className="flex flex-col gap-3">
          {comments.length === 0 && <p>No comments yet.</p>}
          {comments.map((c, idx) => (
            <div key={idx} className="bg-gray-800 p-3 rounded">{c}</div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
        <div className="grid grid-cols-6 gap-4">
          {recommendations.slice(0, 12).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
}
