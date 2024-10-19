import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('name');
    setIsLoggedIn(!!name);
  }, []);

  const login = async (name: string, email: string) => {
    // Simpan email dan nama di localStorage sebagai status login
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    setIsLoggedIn(true);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
