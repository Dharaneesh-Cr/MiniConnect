import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [err, setErr] = useState('');
  const { login } = useAuth(); const nav = useNavigate();
  const submit = async e => { e.preventDefault(); try { await login(email, password); nav('/'); } catch (x) { setErr(x.response?.data?.message || 'Login failed'); } };
  return <div className="auth"><div className="auth-img">💬</div><form className="auth-box" onSubmit={submit}><h2>Login</h2><p>Welcome back!</p>{err && <b className="error">{err}</b>}<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><button>Login</button><small>Don't have an account? <Link to="/register">Register</Link></small></form></div>;
}
