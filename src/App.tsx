import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import StudentPage from './components/StudentPage';
import { Routes, Route } from 'react-router';
import { Container } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Container maxWidth="sm" sx={{marginTop: "64px"}}>
        <Routes>
          <Route index element={<MainPage/>}/>
          <Route path="/student" element={<StudentPage/>}/>
        </Routes>
      </Container>
      <Footer/>
    </div>
  );
};

export default App;
