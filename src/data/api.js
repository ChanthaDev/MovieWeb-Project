const API_KEY = "6e7e94041df0fb864babae0c56e66a2d";
const BASE_URL = "https://api.themoviedb.org/3";

// =================== Movies ===================
export async function fetchMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data;
}

export async function fetchMovieDetail(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
  );
  const data = await res.json();
  return data;
}

export function getTrailer(movie) {
  if (!movie.videos?.results) return null;
  const trailer = movie.videos.results.find((v) => v.type === "Trailer");
  return trailer ? trailer.key : movie.videos.results[0]?.key || null;
}

// =================== TV Series ===================
export async function fetchTVSeries(page = 1) {
  const res = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data;
}

export async function fetchSeriesDetail(id) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
  );
  const data = await res.json();
  return data;
}
