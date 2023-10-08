import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
