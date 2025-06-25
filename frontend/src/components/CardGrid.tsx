import React, { useState, useEffect } from 'react';

const cards = [
  {
    title: 'Dynamic Programming',
    desc: 'Practice DP questions and learn optimal substructure, overlapping subproblems, and more.',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.geeksforgeeks.org/dynamic-programming/'
  },
  {
    title: 'Greedy Algorithms',
    desc: 'Master greedy strategies with real-world problems and instant feedback.',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.geeksforgeeks.org/greedy-algorithms/'
  },
  {
    title: 'Graph Theory',
    desc: 'Explore BFS, DFS, shortest paths, and more with interactive quizzes.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/'
  },
  {
    title: 'Sorting & Searching',
    desc: 'Sharpen your skills in sorting and searching algorithms with step-by-step solutions.',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.geeksforgeeks.org/sorting-algorithms/'
  },
  {
    title: 'Divide & Conquer',
    desc: 'Understand the power of divide and conquer with classic algorithmic problems.',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.geeksforgeeks.org/divide-and-conquer-algorithm/'
  },
  {
    title: 'Heaps & Priority Queues',
    desc: 'Learn about heaps, priority queues, and their applications in real-time systems.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.geeksforgeeks.org/heap-data-structure/'
  },
  {
    title: 'Backtracking',
    desc: 'Solve puzzles and problems using backtracking techniques and recursion.',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.geeksforgeeks.org/backtracking-algorithms/'
  },
  {
    title: 'Practice All Topics',
    desc: 'Comprehensive quizzes covering all DAA topics for complete mastery.',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: '/quiz'
  }
];

const SkeletonCard = () => (
  <div className="card card-animate flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 shadow-xl animate-pulse">
    <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
    <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
    <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
);

const CardGrid: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white animate-fade-in">
        Explore Topics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
          : cards.map((card) => (
              <div key={card.title} className="card card-animate flex flex-col items-center text-center bg-white dark:bg-gray-800 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <img src={card.img} alt={card.title} className="w-full h-40 object-cover rounded-xl mb-4" loading="lazy" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{card.desc}</p>
                <a href={card.link} target={card.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="btn btn-primary w-full mt-auto">
                  {card.link === '/quiz' ? 'Start Quiz' : 'Learn More'}
                </a>
              </div>
            ))}
      </div>
    </section>
  );
};

export default CardGrid; 