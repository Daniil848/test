import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import StudentPage from './components/StudentPage';
import { Routes, Route } from 'react-router';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/student/:studentId" element={<StudentPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
