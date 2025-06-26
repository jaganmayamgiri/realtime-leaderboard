import React from 'react';

const Hero: React.FC = () => (
  <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 relative overflow-hidden">
    <div className="max-w-2xl mx-auto z-10">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white drop-shadow animate-fade-in">
        Welcome to <span className="text-primary">DAA Quiz</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in delay-100">
        Master Data Structures & Algorithms with interactive quizzes, real-time leaderboards, and curated study resources.
      </p>
      <a href="/quiz" className="btn btn-primary text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform animate-fade-in delay-200">
        Start Quiz
      </a>
    </div>
    {/* Decorative background shapes */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg width="100%" height="100%" className="absolute inset-0 animate-pulse" style={{ opacity: 0.10 }}>
        <circle cx="20%" cy="30%" r="120" fill="#3B82F6" />
        <circle cx="80%" cy="70%" r="160" fill="#1E40AF" />
        <circle cx="50%" cy="10%" r="80" fill="#6366F1" />
        <circle cx="60%" cy="80%" r="60" fill="#60A5FA" />
      </svg>
    </div>
  </section>
);

export default Hero; 