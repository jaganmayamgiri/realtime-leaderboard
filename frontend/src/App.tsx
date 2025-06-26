import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CardGrid from './components/CardGrid';
import DaaMcq from './components/DaaMcq';
import Leaderboard from './components/Leaderboard';
import Modal from 'react-modal';

function Home({ onNameSet }: { onNameSet: (name: string) => void }) {
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'Guest';
    localStorage.setItem('userName', finalName);
    onNameSet(finalName);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    // Optionally, you can also clear the name or redirect
    // setName('');
    // window.location.href = '/';
  };

  return (
    <>
      <Hero />
      <CardGrid />
      <Modal
        isOpen={showModal}
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-40"
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Enter Your Name</h2>
          <input
            type="text"
            className="input w-full mb-4"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary w-full text-lg py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
              Continue
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary w-full text-lg py-3 rounded-xl shadow hover:scale-105 transition-transform">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function App() {
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || 'Guest');

  return (
    <Router>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home onNameSet={setUserName} />} />
            <Route path="/quiz" element={<DaaMcq userName={userName} />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;