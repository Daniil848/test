import React from 'react';
import Header from './components/Students/Header';
import Footer from './components/Students/Footer';
import HomePage from './pages/Students/HomePage';
import StudentPage from './pages/Students/StudentPage';
import { Toaster } from 'react-hot-toast';
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
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
