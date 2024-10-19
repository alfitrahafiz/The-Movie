import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DesktopNavigation from './Navbar/DesktopNavigation';
import MobileNavigation from './Navbar/MobileNavigation';
import NavLink from './NavLink';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [hamburgerMenu, setHamburgerMenu] = useState<boolean>(false);
  const [openTheme, setOpenTheme] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userName, setUserName] = useState<string>('Login');

  // Memeriksa tema dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  // Mengambil email user dari localStorage
  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    } else {
      setUserName('Guest');
    }
  }, [isLoggedIn]); // Re-run effect ketika status login berubah

  const toggleMenu = () => setHamburgerMenu((prev) => !prev);
  const toggleTheme = () => setOpenTheme((prev) => !prev);

  const handleThemeChange = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme);
    document.documentElement.classList.toggle('dark', selectedTheme === 'dark');
    localStorage.setItem('theme', selectedTheme);
    setOpenTheme(false);
  };

  // Handler untuk logout
  const handleLogout = () => {
    logout();
    setUserName('Guest');
  };

  return (
    <nav className={`bg-surface ${theme === 'dark' ? 'dark:bg-darkSurface' : ''} p-4`}>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          {/* Brand Name */}
          <NavLink to='/' className='text-2xl font-bold flex items-center gap-2'>
            <img src={logo} alt='TMDB' className='w-6 h-6' />
            The Movie
          </NavLink>

          {/* Desktop Navigation */}
          <DesktopNavigation
            openTheme={openTheme}
            toggleTheme={toggleTheme}
            handleThemeChange={handleThemeChange}
          />

          {/* Desktop Login/User Button */}
          {isLoggedIn ? (
            <div className='hidden lg:flex items-center gap-4'>
              <span className='flex items-center gap-2 dark:text-darkText'>
                <FaUser /> {userName}
              </span>
              <button
                onClick={handleLogout}
                className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md'
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to='/login' className='hidden lg:flex items-center gap-2'>
              <FaUser /> Login
            </NavLink>
          )}

          {/* Hamburger Menu Button */}
          <button
            className='lg:hidden text-text dark:text-darkText'
            onClick={toggleMenu}
            aria-label='Toggle menu'
          >
            {hamburgerMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {hamburgerMenu && (
          <MobileNavigation
            hamburgerMenu={hamburgerMenu}
            openTheme={openTheme}
            toggleTheme={toggleTheme}
            handleThemeChange={handleThemeChange}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onLogout={handleLogout}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
