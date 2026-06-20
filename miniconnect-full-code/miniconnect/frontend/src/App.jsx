import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
const Private = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
export default function App() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Private><Feed /></Private>} />
    <Route path="/profile/:id" element={<Private><Profile /></Private>} />
    <Route path="/edit-profile" element={<Private><EditProfile /></Private>} />
  </Routes>;
}
