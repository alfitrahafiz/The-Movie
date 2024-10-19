export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  popularity: number;
}

export interface MovieCardProps {
  posterUrl: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
  popularity: number;
  onAddToFavourite: () => void;
  buttonTitle: string;
  Icon: React.FC<{ className?: string }>;
}

// navbar
export interface NavLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export interface ThemeOptionsProps {
  className?: string;
  isMobile?: boolean;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export interface MobileNavigationProps {
  hamburgerMenu: boolean;
  openTheme: boolean;
  toggleTheme: () => void;
  handleThemeChange: (selectedTheme: 'light' | 'dark') => void;
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
}

export interface DesktopNavigationProps {
  openTheme: boolean;
  toggleTheme: () => void;
  handleThemeChange: (selectedTheme: 'light' | 'dark') => void;
}
