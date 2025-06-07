import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NameEntryProps {
  onNameSubmit: (name: string) => void;
}

const NameEntry: React.FC<NameEntryProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    onNameSubmit(name.trim());
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Welcome to DAA Quiz
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full"
                placeholder="Your name"
                autoFocus
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Start Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NameEntry; 