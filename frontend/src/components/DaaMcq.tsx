import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const DaaMcq: React.FC<DaaMcqProps> = ({ userName }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    return Object.entries(selectedAnswers).reduce((score, [questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      return score + (question?.correctAnswer === answer ? 1 : 0);
    }, 0);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    const score = calculateScore();
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (!backendUrl) {
        throw new Error('Backend URL is not configured');
      }
      
      console.log('Submitting to backend URL:', backendUrl); // Debug log
      
      const response = await fetch(`${backendUrl}/add_score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ name: userName, score }),
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData); // Debug log
        throw new Error(errorData.error || `Failed to submit score: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Score submitted successfully:', data); // Debug log
      setSubmitted(true);
      setShowScore(true);
    } catch (err) {
      console.error('Error submitting score:', err);
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

    const question = questions.find(q => q.id === questionId);
    if (option === question?.correctAnswer) {
      return "bg-green-100 border-green-500 text-green-700";
    }
    if (selectedAnswers[questionId] === option && option !== question?.correctAnswer) {
      return "bg-red-100 border-red-500 text-red-700";
    }
    return "bg-white";
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
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

        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="card">
              <h3 className="text-lg font-semibold mb-4">
                {question.id}. {question.question}
              </h3>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => !submitted && handleAnswerSelect(question.id, option)}
                    className={`w-full text-left p-3 rounded-md border transition-colors duration-200 ${getOptionStyle(question.id, option)}`}
                    disabled={submitted || isSubmitting}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!submitted && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className={`btn btn-primary px-8 py-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={Object.keys(selectedAnswers).length !== questions.length || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Answers'}
            </button>
            {Object.keys(selectedAnswers).length !== questions.length && (
              <p className="mt-2 text-sm text-gray-600">
                Please answer all questions before submitting
              </p>
            )}
          </div>
        )}

        {showScore && (
          <div className="mt-8 text-center">
            <div className="card bg-white">
              <h2 className="text-2xl font-bold mb-2">
                Your Score: {calculateScore()} out of {questions.length}
              </h2>
              <p className="text-gray-600 mb-4">
                {calculateScore() === questions.length
                  ? "Perfect score! 🎉"
                  : "Keep practicing! 💪"}
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="btn btn-primary w-full"
                >
                  View Leaderboard
                </button>
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setSubmitted(false);
                    setShowScore(false);
                  }}
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaaMcq; 