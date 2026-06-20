import Comment from '../models/Comment.js';
export const addComment = async (req, res) => {
  const { postId, text } = req.body;
  if (!text) return res.status(400).json({ message: 'Comment required' });
  const comment = await Comment.create({ post: postId, user: req.user._id, text });
  const populated = await comment.populate('user', 'name avatar');
  res.status(201).json(populated);
};
export const getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('user', 'name avatar').sort({ createdAt: 1 });
  res.json(comments);
};
export const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (String(comment.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not allowed' });
  await comment.deleteOne();
  res.json({ message: 'Comment deleted' });
};
