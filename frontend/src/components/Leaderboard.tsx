import React, { useState, useEffect } from 'react';

interface Score {
  name: string;
  score: number;
}

// Add the questions and resources (copy from DaaMcq.tsx)
const questions = [
  {
    id: 1,
    question: "What is the time complexity of the Merge Sort algorithm?",
    resource: "https://www.geeksforgeeks.org/merge-sort/"
  },
  {
    id: 2,
    question: "Which of the following is not a Divide and Conquer algorithm?",
    resource: "https://www.geeksforgeeks.org/divide-and-conquer-algorithm/"
  },
  {
    id: 3,
    question: "Which data structure is used in Breadth-First Search (BFS) of a graph?",
    resource: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"
  },
  {
    id: 4,
    question: "What is the worst-case time complexity of Quick Sort?",
    resource: "https://www.geeksforgeeks.org/quick-sort/"
  },
  {
    id: 5,
    question: "Which of the following algorithms is used to solve the Single Source Shortest Path problem for graphs with negative weights?",
    resource: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/"
  },
  {
    id: 6,
    question: "In Dynamic Programming, the technique of storing previously computed values to avoid repeated work is called:",
    resource: "https://www.geeksforgeeks.org/dynamic-programming/"
  },
  {
    id: 7,
    question: "Which of the following problems can be solved using Greedy Algorithm?",
    resource: "https://www.geeksforgeeks.org/greedy-algorithms/"
  },
  {
    id: 8,
    question: "What is the time complexity of inserting an element into a Min-Heap?",
    resource: "https://www.geeksforgeeks.org/binary-heap/"
  },
  {
    id: 9,
    question: "Which traversal technique is used by Topological Sorting of a Directed Acyclic Graph (DAG)?",
    resource: "https://www.geeksforgeeks.org/topological-sorting/"
  },
  {
    id: 10,
    question: "Which of the following is NOT a characteristic of Greedy Algorithm?",
    resource: "https://www.geeksforgeeks.org/greedy-algorithms/"
  }
];

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showResources, setShowResources] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

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

  useEffect(() => {
    setCurrentUser(localStorage.getItem('userName'));
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
          <div className="card card-animate shadow-2xl border-2 border-primary/10 bg-white/80 backdrop-blur-lg mb-12">
            <div className="overflow-x-auto animate-fade-in">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary/10 to-secondary/10">
                    <th className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Performance</th>
                  </tr>
                </thead>
                <tbody className="bg-white/80 divide-y divide-gray-200">
                  {scores.map((score, index) => {
                    const isCurrentUser = currentUser && score.name === currentUser;
                    return (
                      <tr
                        key={index}
                        className={`hover:bg-primary/10 transition-all duration-200 group ${isCurrentUser ? 'bg-yellow-50 animate-pulse shadow-lg ring-2 ring-yellow-400/60' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {index === 0 ? (
                              <span className="text-yellow-500 text-2xl animate-bounce">🥇</span>
                            ) : index === 1 ? (
                              <span className="text-gray-400 text-2xl animate-bounce">🥈</span>
                            ) : index === 2 ? (
                              <span className="text-amber-600 text-2xl animate-bounce">🥉</span>
                            ) : (
                              <span className="text-gray-500 font-bold">#{index + 1}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
                            {score.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg text-gray-900 font-bold group-hover:text-secondary transition-colors duration-200">{score.score}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base">
                            {score.score === 10 ? (
                              <span className="text-green-600 font-bold animate-pulse">Perfect! 🌟</span>
                            ) : score.score >= 8 ? (
                              <span className="text-blue-600 font-bold animate-fade-in">Excellent! 🎯</span>
                            ) : score.score >= 6 ? (
                              <span className="text-yellow-600 font-bold animate-fade-in">Good! 👍</span>
                            ) : (
                              <span className="text-gray-600 font-bold animate-fade-in">Keep practicing! 💪</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Leaderboard updates every 3 seconds
          </p>
          <button
            className="mt-6 btn btn-primary px-8 py-3 text-lg rounded-full shadow-lg hover:scale-105 transition-transform animate-fade-in"
            onClick={() => setShowResources((prev) => !prev)}
          >
            {showResources ? 'Hide' : 'Show'} Study Resources
          </button>
        </div>

        {/* Study Resources Section */}
        {showResources && (
          <div className="mt-12 card card-animate shadow-xl border border-primary/20 bg-white/90 backdrop-blur-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Study Resources for All Questions</h2>
            <ul className="space-y-6">
              {questions.map((q, idx) => (
                <li key={q.id} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-semibold text-gray-800 text-lg">
                      {idx + 1}. {q.question}
                    </span>
                    <a
                      href={q.resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary text-base px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
                    >
                      Study
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard; 