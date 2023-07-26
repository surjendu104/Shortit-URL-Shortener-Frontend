import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import About from './components/About';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
