import { createContext, useContext, useState } from 'react';
import API from '../services/api';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('miniconnect_user')) || null);
  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('miniconnect_token', data.token);
    localStorage.setItem('miniconnect_user', JSON.stringify(data.user));
    setUser(data.user);
  };
  const register = async (name, email, password) => {
    const { data } = await API.post('/auth/register', { name, email, password });
    localStorage.setItem('miniconnect_token', data.token);
    localStorage.setItem('miniconnect_user', JSON.stringify(data.user));
    setUser(data.user);
  };
  const logout = () => { localStorage.clear(); setUser(null); };
  return <AuthContext.Provider value={{ user, setUser, login, register, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
