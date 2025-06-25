import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CardGrid from './components/CardGrid';
import ContactForm from './components/ContactForm';
import DaaMcq from './components/DaaMcq';
import Leaderboard from './components/Leaderboard';

function Home() {
  return (
    <>
      <Hero />
      <CardGrid />
      <ContactForm />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<DaaMcq userName={''} />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 