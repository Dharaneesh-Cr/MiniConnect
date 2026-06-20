import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Register() {
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('');
  const { register } = useAuth(); const nav = useNavigate();
  const submit = async e => { e.preventDefault(); try { await register(name,email,password); nav('/'); } catch (x) { setErr(x.response?.data?.message || 'Register failed'); } };
  return <div className="auth"><div className="auth-img">👥</div><form className="auth-box" onSubmit={submit}><h2>Register</h2><p>Create your account</p>{err && <b className="error">{err}</b>}<input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><button>Register</button><small>Already have an account? <Link to="/login">Login</Link></small></form></div>;
}
