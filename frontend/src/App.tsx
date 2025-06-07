import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DaaMcq from './components/DaaMcq';
import NameEntry from './components/NameEntry';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

interface Score {
  name: string;
  score: number;
}

function Leaderboard() {
  const [scores, setScores] = useState<Score[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/get_leaderboard`);
      const data = await response.json();
      setScores(data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Real-Time Leaderboard
        </h1>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Top Scores</h2>
          <div className="space-y-2">
            {scores.map((score, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-600">
                    #{index + 1}
                  </span>
                  <span className="font-medium">{score.name}</span>
                </div>
                <span className="font-bold text-primary">{score.score}</span>
              </div>
            ))}
            {scores.length === 0 && (
              <p className="text-gray-500 text-center py-4">No scores yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [userName, setUserName] = useState<string>('');

  const handleNameSubmit = (name: string) => {
    setUserName(name);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route 
            path="/quiz" 
            element={
              userName ? (
                <DaaMcq userName={userName} />
              ) : (
                <Navigate to="/enter-name" replace />
              )
            } 
          />
          <Route 
            path="/enter-name" 
            element={<NameEntry onNameSubmit={handleNameSubmit} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 