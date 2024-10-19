import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import ThemeOptions from '../ThemeOptions';
import NavLink from '../NavLink';
import { DesktopNavigationProps } from '../../types/all';

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  openTheme,
  toggleTheme,
  handleThemeChange,
}) => (
  <div className='relative hidden lg:flex items-center gap-6'>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/profile'>Profile</NavLink>
    <button
      className='relative text-text dark:text-darkText text-lg flex items-center gap-1'
      onClick={toggleTheme}
    >
      Theme
      {openTheme ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </button>
    {openTheme && <ThemeOptions onThemeChange={handleThemeChange} />}
  </div>
);

export default DesktopNavigation;
