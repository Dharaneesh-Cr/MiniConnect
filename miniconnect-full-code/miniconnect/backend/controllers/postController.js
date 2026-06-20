import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
export const createPost = async (req, res) => {
  const { caption, image } = req.body;
  if (!caption) return res.status(400).json({ message: 'Caption required' });
  const post = await Post.create({ user: req.user._id, caption, image });
  const populated = await post.populate('user', 'name avatar');
  res.status(201).json(populated);
};
export const getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'name avatar').sort({ createdAt: -1 });
  res.json(posts);
};
export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const liked = post.likes.some(id => String(id) === String(req.user._id));
  liked ? post.likes.pull(req.user._id) : post.likes.push(req.user._id);
  await post.save();
  res.json({ liked: !liked, likes: post.likes.length });
};
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (String(post.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });
  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};
