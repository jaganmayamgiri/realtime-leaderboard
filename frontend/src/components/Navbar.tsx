import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDarkMode(true);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary dark:text-white">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="inline-block"><circle cx="16" cy="16" r="16" fill="#3B82F6"/><text x="16" y="22" textAnchor="middle" fontSize="18" fill="#fff" fontWeight="bold">Q</text></svg>
            DAA Quiz Pro
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`font-semibold transition-colors duration-200 ${isActive('/') ? 'text-primary dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:text-primary'}`}>Home</Link>
            <Link to="/quiz" className={`font-semibold transition-colors duration-200 ${isActive('/quiz') ? 'text-primary dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:text-primary'}`}>Quiz</Link>
            <Link to="/leaderboard" className={`font-semibold transition-colors duration-200 ${isActive('/leaderboard') ? 'text-primary dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:text-primary'}`}>Leaderboard</Link>
            <button
              aria-label="Toggle dark mode"
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
              onClick={() => setDarkMode((d) => !d)}
            >
              {darkMode ? (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#fbbf24"/></svg>
              ) : (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#3B82F6"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/></svg>
              )}
            </button>
          </div>
          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link to="/" className={`font-semibold text-lg ${isActive('/') ? 'text-primary dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:text-primary'}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/quiz" className={`font-semibold text-lg ${isActive('/quiz') ? 'text-primary dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:text-primary'}`} onClick={() => setMenuOpen(false)}>Quiz</Link>
            <Link to="/leaderboard" className={`font-semibold text-lg ${isActive('/leaderboard') ? 'text-primary dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:text-primary'}`} onClick={() => setMenuOpen(false)}>Leaderboard</Link>
            <button
              aria-label="Toggle dark mode"
              className="mt-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
              onClick={() => setDarkMode((d) => !d)}
            >
              {darkMode ? (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#fbbf24"/></svg>
              ) : (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#3B82F6"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/></svg>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 