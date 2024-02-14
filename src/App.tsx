import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import { Container } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Container maxWidth="sm" sx={{marginTop: "64px"}}>
        <MainPage/>
      </Container>
      <Footer/>
    </div>
  );
};

export default App;
