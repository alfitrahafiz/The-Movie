import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNowPlayingMovies, fetchPopularMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/all';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart } from 'react-icons/fa';

const HomePage = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Fetch data saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchInitialData = async () => {
      const nowPlayingMovies = await fetchNowPlayingMovies();
      setNowPlaying(nowPlayingMovies);

      // Ambil 30 film pertama: 20 dari halaman 1 dan 10 dari halaman 2
      const firstPageMovies = await fetchPopularMovies(1);
      const secondPageMovies = await fetchPopularMovies(2);
      const combinedMovies = [...firstPageMovies, ...secondPageMovies.slice(0, 10)];

      setPopular(combinedMovies);
    };

    fetchInitialData();
  }, []);

  const loadMoreMovies = async () => {
    const nextPage = page + 1;
    const moreMovies = await fetchPopularMovies(nextPage);

    const newMovies = moreMovies
      .filter((movie: Movie) => !popular.some((p) => p.id === movie.id))
      .slice(0, 6);

    setPopular((prevPopular) => [...prevPopular, ...newMovies]);
    setPage(nextPage);
  };

  const addToFavorites = (movie: Movie) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!favorites.some((favMovie: Movie) => favMovie.id === movie.id)) {
      localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
    }
  };

  return (
    <div className='container mx-auto p-3 flex flex-col items-center'>
      <h1 className='text-3xl text-text dark:text-darkText text-center p-5'>Now Playing</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {nowPlaying.map((movie) => (
          <MovieCard
            key={`now-playing-${movie.id}`}
            posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            releaseDate={movie.release_date}
            voteAverage={movie.vote_average}
            popularity={movie.popularity}
            onAddToFavourite={() => addToFavorites(movie)}
            buttonTitle='Add to Favorites'
            Icon={FaHeart}
          />
        ))}
      </div>
      <hr className='my-10' />
      <h1 className='text-3xl text-text dark:text-darkText text-center p-5'>Popular Movies</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {popular.map((movie) => (
          <MovieCard
            key={`popular-${movie.id}`}
            posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            releaseDate={movie.release_date}
            voteAverage={movie.vote_average}
            popularity={movie.popularity}
            onAddToFavourite={() => addToFavorites(movie)}
            buttonTitle='Add to Favorites'
            Icon={FaHeart}
          />
        ))}
      </div>
      <button
        className='mt-4 bg-accent text-text font-bold px-4 py-2 rounded-md'
        onClick={loadMoreMovies}
      >
        Load More
      </button>
    </div>
  );
};

export default HomePage;
