import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const makeToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, avatar: `https://i.pravatar.cc/150?u=${email}` });
  res.status(201).json({ token: makeToken(user._id), user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, bio: user.bio } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ token: makeToken(user._id), user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, bio: user.bio } });
};
