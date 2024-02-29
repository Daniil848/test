import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Students/HomePage';
import StudentPage from './pages/Students/StudentPage';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router';
import './App.css';
import CharactersPage from './pages/rickAndMorty/CharactersPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/student/:studentId" element={<StudentPage />} />
        <Route path="/characters" element={<CharactersPage />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
