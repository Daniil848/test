import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/students/homePage/HomePage';
import StudentPage from './pages/students/studentPage/StudentPage';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router';
import './App.css';
import CharactersPage from './pages/rickAndMorty/charactersPage/CharactersPage';

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
