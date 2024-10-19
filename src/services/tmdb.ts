import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Menggunakan Vite environment variables
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchNowPlayingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: { api_key: API_KEY, language: 'en-US', page: 1 },
  });
  return response.data.results.slice(0, 6); // Limit 6
};

export const fetchPopularMovies = async (page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, language: 'en-US', page },
  });
  return response.data.results;
};
