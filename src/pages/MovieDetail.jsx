import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetail, getTrailer } from "../data/api";
import Navbar from "../components/Navbar";
import TrailerModal from "../components/TrailerModal";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [inMyList, setInMyList] = useState(false); // state add/remove

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await fetchMovieDetail(id);
        setMovie(data);

        // check if in My List
        const existingList = JSON.parse(localStorage.getItem("myList") || "[]");
        const exists = existingList.find((item) => item.id === data.id && item.type === "movie");
        setInMyList(!!exists);

        // Fetch recommendations
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=6e7e94041df0fb864babae0c56e66a2d&language=en-US&page=1`
        );
        const recData = await res.json();
        setRecommendations(recData.results || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetail();
  }, [id]);

  if (!movie) return <p className="text-white p-4">Loading...</p>;

  const trailer = getTrailer(movie);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([...comments, commentText.trim()]);
    setCommentText("");
  };

  const handleToggleMyList = () => {
    const existingList = JSON.parse(localStorage.getItem("myList") || "[]");
    if (inMyList) {
      // remove
      const newList = existingList.filter((item) => !(item.id === movie.id && item.type === "movie"));
      localStorage.setItem("myList", JSON.stringify(newList));
      setInMyList(false);
      alert("Removed from My List");
    } else {
      // add
      existingList.push({
        id: movie.id,
        title: movie.title,
        type: "movie",
        poster_path: movie.poster_path,
      });
      localStorage.setItem("myList", JSON.stringify(existingList));
      setInMyList(true);
      alert("Added to My List!");
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pb-[100px]">
      <Navbar />

      {/* Trailer */}
      <div className="max-w-6xl mx-auto p-6 mt-6 relative">
        {trailer ? (
          <div className="relative w-full h-[600px] bg-black rounded overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${trailer}?autoplay=0&controls=1`}
              title={movie.title}
              className="w-full h-full"
              allowFullScreen
            />
            <button
              onClick={() => setTrailerKey(trailer)}
              className="absolute bottom-4 right-4 bg-red-600 px-4 py-2 rounded text-white"
            >
              Watch Trailer
            </button>
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[400px] object-cover rounded"
          />
        )}
      </div>

      {/* Details */}
      <div className="max-w-6xl mx-auto p-6 mt-6 flex flex-col md:flex-row gap-6">
        <div className="shrink w-full md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded shadow-lg w-full"
          />
          <button
            onClick={handleToggleMyList}
            className={`px-4 py-2 rounded text-white mt-4 w-full ${inMyList ? "bg-red-600" : "bg-green-600"}`}
          >
            {inMyList ? "Remove from My List" : "Add to My List"}
          </button>
        </div>

        <div className="flex-1 text-white">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-2">{movie.overview}</p>
          <p className="mb-2">Release: {movie.release_date}</p>
          <p className="mb-2">Rating: ⭐ {movie.vote_average?.toFixed(1)}</p>

          {/* Cast */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Cast</h2>
            <div className="grid grid-cols-6 gap-4">
              {movie.credits?.cast.slice(0, 6).map((actor) => (
                <div key={actor.cast_id} className="flex flex-col items-center text-center">
                  <img
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "https://via.placeholder.com/100?text=No+Image"}
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
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white w-32">
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
          {recommendations.slice(0, 12).map((rec) => (
            <div
              key={rec.id}
              className="cursor-pointer"
              onClick={() => navigate(`/movie/${rec.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                alt={rec.title}
                className="rounded-lg hover:scale-105 transition-transform"
              />
              <h3 className="text-white mt-2 font-semibold text-sm truncate">{rec.title}</h3>
              <p className="text-yellow-400 text-sm">⭐ {(rec.vote_average || 0).toFixed(1)}</p>
            </div>
          ))}
        </div>
      </div>

      <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
}
