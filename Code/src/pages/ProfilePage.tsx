import { useEffect, useState } from 'react';
import { Movie } from '../types/all';
import MovieCard from '../components/MovieCard';
import { FaUser, FaTrash } from 'react-icons/fa';
import NavLink from '../components/NavLink';
import { ArrowRightIcon } from 'lucide-react';

const ProfilePage: React.FC = () => {
  // State untuk email dan daftar film favorit
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [favourite, setFavourite] = useState<Movie[]>([]);

  useEffect(() => {
    // Ambil email yang tersimpan di localStorage
    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);

    //ambiol nama yang tersimpan di localStorage
    const storedName = localStorage.getItem('name');
    setName(storedName);

    // Ambil daftar film favorit yang tersimpan di localStorage
    const storedFavo = localStorage.getItem('favorites');
    if (storedFavo) {
      setFavourite(JSON.parse(storedFavo));
    }
  }, []);

  // Fungsi untuk menghapus film dari favorit
  const removeFromFavourite = (movieId: number) => {
    const updatedFavourites = favourite.filter((movie) => movie.id !== movieId);
    setFavourite(updatedFavourites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavourites)); // Update localStorage
  };

  return (
    <div className='container mx-auto p-3 flex flex-col items-center'>
      {/* Header Profil */}
      <h1 className='text-4xl font-extrabold mb-4 dark:text-darkText flex items-center'>
        <FaUser className='inline mr-2 w-7 h-7' /> Profile
      </h1>

      {/* Tampilkan email atau pesan jika belum login */}
      {name ? (
        <>
          <p className='text-xl mb-6 dark:text-darkText'>Email : {email}</p>

          {/* Daftar film favorit jika ada */}
          {favourite.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {favourite.map((movie) => (
                <MovieCard
                  key={movie.id}
                  posterUrl={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                  popularity={movie.popularity}
                  onAddToFavourite={() => removeFromFavourite(movie.id)}
                  buttonTitle='Delete'
                  Icon={FaTrash}
                />
              ))}
            </div>
          ) : (
            <p className='p-5 bg-red-50 border border-red-200 text-red-700 shadow-lg rounded-md'>
              Belum ada Favourite
            </p>
          )}
        </>
      ) : (
        <>
          <p className='text-lg text-text dark:text-darkText mb-6'>You are not logged in.</p>
          <NavLink
            to='/login'
            className='bg-primary hover:bg-darkPrimary px-3 py-1 rounded-md font-semibold text-darkText flex items-center gap-1'
          >
            Login <ArrowRightIcon className='inline' />
          </NavLink>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
