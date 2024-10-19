import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import ThemeOptions from '../ThemeOptions';
import NavLink from '../NavLink';
import { FaUser } from 'react-icons/fa';
import { MobileNavigationProps } from '../../types/all';

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  hamburgerMenu,
  openTheme,
  toggleTheme,
  handleThemeChange,
  isLoggedIn,
  userName,
  onLogout,
}) => (
  <>
    {hamburgerMenu && (
      <div className='lg:hidden mt-4 flex flex-col gap-4 border-t pt-4'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <button
          className='text-text dark:text-darkText text-lg flex items-center gap-1'
          onClick={toggleTheme}
          aria-expanded={openTheme}
        >
          Theme
          {openTheme ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {openTheme && <ThemeOptions isMobile onThemeChange={handleThemeChange} />}
        {isLoggedIn ? (
          <div className='flex flex-col gap-2'>
            <span className='flex items-center gap-2 dark:text-darkText'>
              <FaUser /> {userName}
            </span>
            <button onClick={onLogout} className='text-red-500 hover:text-red-600'>
              Logout
            </button>
          </div>
        ) : (
          <NavLink to='/login' className='flex items-center gap-2'>
            <FaUser /> Login
          </NavLink>
        )}
      </div>
    )}
  </>
);

export default MobileNavigation;
