import User from '../models/User.js';
import Post from '../models/Post.js';
export const getMe = async (req, res) => res.json(req.user);
export const getUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select('-password').limit(10);
  res.json(users);
};
export const getProfile = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password').populate('followers following', 'name avatar');
  if (!user) return res.status(404).json({ message: 'User not found' });
  const posts = await Post.find({ user: user._id }).populate('user', 'name avatar').sort({ createdAt: -1 });
  res.json({ user, posts });
};
export const updateProfile = async (req, res) => {
  const { name, bio, avatar } = req.body;
  const user = await User.findById(req.user._id);
  user.name = name || user.name;
  user.bio = bio ?? user.bio;
  user.avatar = avatar || user.avatar;
  await user.save();
  res.json({ id: user._id, name: user.name, email: user.email, avatar: user.avatar, bio: user.bio });
};
export const followUser = async (req, res) => {
  if (req.params.id === String(req.user._id)) return res.status(400).json({ message: 'You cannot follow yourself' });
  const target = await User.findById(req.params.id);
  const me = await User.findById(req.user._id);
  if (!target) return res.status(404).json({ message: 'User not found' });
  const already = target.followers.some(id => String(id) === String(me._id));
  if (already) {
    target.followers.pull(me._id); me.following.pull(target._id);
  } else {
    target.followers.push(me._id); me.following.push(target._id);
  }
  await target.save(); await me.save();
  res.json({ following: !already });
};
