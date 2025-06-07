import React, { useState, useEffect } from 'react';

interface Score {
  name: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchScores = async () => {
    try {
      const response = await fetch('http://localhost:3001/get_leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch scores');
      }
      const data = await response.json();
      setScores(data);
      setError('');
    } catch (err) {
      setError('Failed to load leaderboard. Please try again later.');
      console.error('Error fetching scores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Real-Time Leaderboard
          </h1>
          <p className="text-gray-600">
            Top performers in DAA MCQ Practice
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading leaderboard...</p>
          </div>
        ) : scores.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No scores yet. Be the first to take the quiz!</p>
          </div>
        ) : (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scores.map((score, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index === 0 ? (
                            <span className="text-yellow-500 text-xl">🥇</span>
                          ) : index === 1 ? (
                            <span className="text-gray-400 text-xl">🥈</span>
                          ) : index === 2 ? (
                            <span className="text-amber-600 text-xl">🥉</span>
                          ) : (
                            <span className="text-gray-500">#{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {score.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{score.score}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {score.score === 10 ? (
                            <span className="text-green-600">Perfect! 🌟</span>
                          ) : score.score >= 8 ? (
                            <span className="text-blue-600">Excellent! 🎯</span>
                          ) : score.score >= 6 ? (
                            <span className="text-yellow-600">Good! 👍</span>
                          ) : (
                            <span className="text-gray-600">Keep practicing! 💪</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Leaderboard updates every 3 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 