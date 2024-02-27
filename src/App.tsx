import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
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
