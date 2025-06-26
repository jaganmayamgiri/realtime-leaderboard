import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 shadow-lg backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="inline-block"><circle cx="16" cy="16" r="16" fill="#3B82F6"/><text x="16" y="22" textAnchor="middle" fontSize="18" fill="#fff" fontWeight="bold">Q</text></svg>
            DAA Quiz 
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`font-semibold transition-colors duration-200 ${isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>Home</Link>
            <Link to="/quiz" className={`font-semibold transition-colors duration-200 ${isActive('/quiz') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>Quiz</Link>
            <Link to="/leaderboard" className={`font-semibold transition-colors duration-200 ${isActive('/leaderboard') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>Leaderboard</Link>
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
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link to="/" className={`font-semibold text-lg ${isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/quiz" className={`font-semibold text-lg ${isActive('/quiz') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`} onClick={() => setMenuOpen(false)}>Quiz</Link>
            <Link to="/leaderboard" className={`font-semibold text-lg ${isActive('/leaderboard') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`} onClick={() => setMenuOpen(false)}>Leaderboard</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 