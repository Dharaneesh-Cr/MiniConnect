import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return <div className="navbar">
    <Link to="/" className="logo">Mini<span>Connect</span></Link>
    <input className="search" placeholder="Search users or posts..." />
    <div className="nav-right">
      <Link to={`/profile/${user?.id}`}>Profile</Link>
      <button onClick={() => { logout(); nav('/login'); }}>Logout</button>
    </div>
  </div>;
}
