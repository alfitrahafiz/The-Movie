import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, isLoggedIn } = useAuth(); // Mengambil status login dari context
  const navigate = useNavigate();

  // Cek jika sudah login, langsung redirect ke halaman profil
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  // Fungsi untuk menangani login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        await login(name, email, password); // Menggunakan fungsi login dari context
        // Redirect akan ditangani oleh AuthContext
      } catch (error) {
        console.error('Login failed:', error);
        // Anda bisa menambahkan penanganan error di sini jika diperlukan
      }
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-bg dark:bg-darkBg'>
      <div className='relative w-full max-w-md mx-auto bg-surface dark:bg-surface/80 shadow-lg rounded-lg overflow-hidden'>
        <div className='flex flex-col p-8'>
          <h2 className='text-3xl font-bold text-center mb-6'>Login</h2>

          {/* Form login */}
          <form className='w-full mb-4' onSubmit={handleLogin}>
            <div className='mb-4'>
              <input
                type='text'
                className='w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Name'
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <input
                type='email'
                className='w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Email'
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <input
                type='password'
                className='w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Password'
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type='submit'
              className='w-full py-2 rounded-lg transition duration-300 font-black bg-primary text-darkText hover:bg-darkPrimary'
            >
              Login
            </button>
          </form>

          <p className='text-center mt-2'>
            Or{' '}
            <Link to='/' className='text-blue-700 cursor-pointer'>
              continue as Guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
