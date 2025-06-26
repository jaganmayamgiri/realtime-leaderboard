import React, { useState, useEffect } from 'react';

interface Score {
  name: string;
  score: number;
}

const studyResources = [
  {
    question: "What is the time complexity of the Merge Sort algorithm?",
    link: "https://www.geeksforgeeks.org/merge-sort/"
  },
  {
    question: "Which of the following is not a Divide and Conquer algorithm?",
    link: "https://www.geeksforgeeks.org/divide-and-conquer-algorithm/"
  },
  {
    question: "Which data structure is used in Breadth-First Search (BFS) of a graph?",
    link: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"
  },
  {
    question: "What is the worst-case time complexity of Quick Sort?",
    link: "https://www.geeksforgeeks.org/quick-sort/"
  },
  {
    question: "Which of the following algorithms is used to solve the Single Source Shortest Path problem for graphs with negative weights?",
    link: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/"
  },
  {
    question: "In Dynamic Programming, the technique of storing previously computed values to avoid repeated work is called:",
    link: "https://www.geeksforgeeks.org/dynamic-programming/"
  },
  {
    question: "Which of the following problems can be solved using Greedy Algorithm?",
    link: "https://www.geeksforgeeks.org/greedy-algorithms/"
  },
  {
    question: "What is the time complexity of inserting an element into a Min-Heap?",
    link: "https://www.geeksforgeeks.org/binary-heap/"
  },
  {
    question: "Which traversal technique is used by Topological Sorting of a Directed Acyclic Graph (DAG)?",
    link: "https://www.geeksforgeeks.org/topological-sorting/"
  },
  {
    question: "Which of the following is NOT a characteristic of Greedy Algorithm?",
    link: "https://www.geeksforgeeks.org/greedy-algorithms/"
  }
];

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
        const response = await fetch(`${API_URL}/get_leaderboard`);
        if (!response.ok) {
          throw new Error('Failed to fetch scores');
        }
        const data = await response.json();
        setScores(data);
        setError('');
      } catch (err) {
        setError('Failed to load leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  const handleClearLeaderboard = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/clear_leaderboard`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to clear leaderboard');
      setScores([]);
    } catch (err) {
      setError('Failed to clear leaderboard. Please try again later.');
    }
  };

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
          <button
            onClick={handleClearLeaderboard}
            className="btn btn-secondary mt-4 px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            Clear Leaderboard
          </button>
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
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr key={index} className="hover:bg-primary/10 transition-all duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap font-bold">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">{score.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900 font-bold group-hover:text-secondary transition-colors duration-200">{score.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Study Resources Section */}
        <div className="mt-12 card card-animate shadow-xl border border-primary/20 bg-white/90 backdrop-blur-lg animate-fade-in">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Study Resources for All Questions</h2>
          <ul className="space-y-6">
            {studyResources.map((q, idx) => (
              <li key={q.link} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="font-semibold text-gray-800 text-lg">
                    {idx + 1}. {q.question}
                  </span>
                  <a
                    href={q.link}
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
      </div>
    </div>
  );
};

export default Leaderboard; 