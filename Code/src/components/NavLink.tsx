// components/NavLink.tsx
import { Link } from 'react-router-dom';
import { NavLinkProps } from '../types/all';
import { cn } from '../utils/cn';

const NavLink: React.FC<NavLinkProps> = ({ to, children, className = '' }) => (
  <Link to={to} className={cn('text-text dark:text-darkText text-lg ', className)}>
    {children}
  </Link>
);

export default NavLink;
