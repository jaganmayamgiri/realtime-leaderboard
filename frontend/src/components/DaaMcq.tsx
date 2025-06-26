import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import confetti from 'canvas-confetti';
import Modal from 'react-modal';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface DaaMcqProps {
  userName: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of the Merge Sort algorithm?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: "O(n log n)"
  },
  {
    id: 2,
    question: "Which of the following is not a Divide and Conquer algorithm?",
    options: ["Merge Sort", "Quick Sort", "Binary Search", "Prim's Algorithm"],
    correctAnswer: "Prim's Algorithm"
  },
  {
    id: 3,
    question: "Which data structure is used in Breadth-First Search (BFS) of a graph?",
    options: ["Stack", "Queue", "Heap", "Linked List"],
    correctAnswer: "Queue"
  },
  {
    id: 4,
    question: "What is the worst-case time complexity of Quick Sort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: "O(n²)"
  },
  {
    id: 5,
    question: "Which of the following algorithms is used to solve the Single Source Shortest Path problem for graphs with negative weights?",
    options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Floyd-Warshall Algorithm", "Prim's Algorithm"],
    correctAnswer: "Bellman-Ford Algorithm"
  },
  {
    id: 6,
    question: "In Dynamic Programming, the technique of storing previously computed values to avoid repeated work is called:",
    options: ["Memoization", "Recursion", "Backtracking", "Branch and Bound"],
    correctAnswer: "Memoization"
  },
  {
    id: 7,
    question: "Which of the following problems can be solved using Greedy Algorithm?",
    options: ["0/1 Knapsack Problem", "Longest Common Subsequence", "Huffman Coding", "Matrix Chain Multiplication"],
    correctAnswer: "Huffman Coding"
  },
  {
    id: 8,
    question: "What is the time complexity of inserting an element into a Min-Heap?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(log n)"
  },
  {
    id: 9,
    question: "Which traversal technique is used by Topological Sorting of a Directed Acyclic Graph (DAG)?",
    options: ["Breadth-First Search", "Depth-First Search", "Inorder Traversal", "Level Order Traversal"],
    correctAnswer: "Depth-First Search"
  },
  {
    id: 10,
    question: "Which of the following is NOT a characteristic of Greedy Algorithm?",
    options: ["Builds solution step by step", "Makes locally optimal choice at each step", "Backtracks to find optimal solution", "May not always give the globally optimal solution"],
    correctAnswer: "Backtracks to find optimal solution"
  }
];

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Study resources for each question
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

const DaaMcq: React.FC<DaaMcqProps> = ({ userName: propUserName }) => {
  const userName = propUserName || localStorage.getItem('userName') || 'Guest';
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [scoreForCountUp, setScoreForCountUp] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Shuffle questions and their options
    const shuffled = shuffleArray(questions).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    return Object.entries(selectedAnswers).reduce((score, [questionId, answer]) => {
      const question = shuffledQuestions.find(q => q.id === parseInt(questionId));
      return score + (question?.correctAnswer === answer ? 1 : 0);
    }, 0);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    const score = calculateScore();
    setScoreForCountUp(score);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (!backendUrl) {
        throw new Error('Backend URL is not configured');
      }
      const nameToSend = userName && userName.trim() !== '' ? userName : 'Guest';
      const response = await fetch(`${backendUrl}/add_score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ name: nameToSend, score }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to submit score: ${response.status} ${response.statusText}`);
      }
      setSubmitted(true);
      setShowScore(true);
      navigate('/leaderboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit score. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getOptionStyle = (questionId: number, option: string) => {
    if (!submitted) {
      return selectedAnswers[questionId] === option
        ? "bg-primary text-white"
        : "bg-white hover:bg-gray-50";
    }

    const question = shuffledQuestions.find(q => q.id === questionId);
    if (option === question?.correctAnswer) {
      return "bg-green-100 border-green-500 text-green-700";
    }
    if (selectedAnswers[questionId] === option && option !== question?.correctAnswer) {
      return "bg-red-100 border-red-500 text-red-700";
    }
    return "bg-white";
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute inset-0 animate-pulse" style={{ opacity: 0.12 }}>
          <circle cx="20%" cy="30%" r="60" fill="#3B82F6" />
          <circle cx="80%" cy="70%" r="80" fill="#1E40AF" />
          <circle cx="50%" cy="10%" r="40" fill="#6366F1" />
          <circle cx="60%" cy="80%" r="30" fill="#60A5FA" />
        </svg>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            DAA MCQ Practice
          </h1>
          <div className="text-lg font-medium text-gray-600">
            Welcome, {userName}!
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Animated Progress Bar */}
        <div className="w-full h-4 bg-gray-200 rounded-full mb-8 overflow-hidden shadow-inner">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
            style={{ width: `${(Object.keys(selectedAnswers).length / shuffledQuestions.length) * 100}%` }}
          ></div>
        </div>

        <div className="space-y-6">
          {shuffledQuestions.map((question, idx) => (
            <div key={question.id} className="card card-animate mb-8 hover:scale-[1.025] hover:shadow-2xl transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 drop-shadow-sm tracking-tight">
                <span className="text-primary mr-2">{idx + 1}.</span> {question.question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => !submitted && handleAnswerSelect(question.id, option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white bg-opacity-80 backdrop-blur-md card-animate ${getOptionStyle(question.id, option)}`}
                    disabled={submitted || isSubmitting}
                  >
                    <span className="text-lg font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!submitted && (
          <div className="mt-12 text-center">
            <button
              onClick={handleSubmit}
              className={`btn btn-primary px-10 py-4 text-xl shadow-xl rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={Object.keys(selectedAnswers).length !== shuffledQuestions.length || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Answers'}
            </button>
            {Object.keys(selectedAnswers).length !== shuffledQuestions.length && (
              <p className="mt-4 text-base text-gray-500 animate-pulse">
                Please answer all questions before submitting
              </p>
            )}
          </div>
        )}

        {showScore && (
          <div className="mt-12 text-center">
            <div className="card card-animate bg-white shadow-2xl">
              <h2 className="text-3xl font-extrabold mb-4 text-primary drop-shadow">
                Your Score: <CountUp end={scoreForCountUp} duration={1.2} className="inline-block text-4xl text-secondary font-bold" /> <span className="text-gray-700 font-medium">out of {shuffledQuestions.length}</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 animate-fade-in">
                {calculateScore() === shuffledQuestions.length
                  ? <span className="text-green-600 font-semibold">Perfect score! 🎉</span>
                  : <span className="text-blue-600 font-semibold">Keep practicing! 💪</span>}
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-primary w-full text-lg py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
                >
                  View Leaderboard
                </button>
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setSubmitted(false);
                    setShowScore(false);
                  }}
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full text-lg py-3 rounded-xl shadow"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary w-full text-lg py-3 rounded-xl shadow-lg hover:scale-105 transition-transform mt-2"
                >
                  Study Resources
                </button>
              </div>
            </div>
            {/* Study Resources Modal */}
            <Modal
              isOpen={showModal}
              onRequestClose={() => setShowModal(false)}
              className="fixed inset-0 flex items-center justify-center z-50 outline-none"
              overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-40"
              ariaHideApp={false}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-fade-in">
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
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-8 btn btn-primary w-full text-lg py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
                >
                  Close
                </button>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaaMcq; 