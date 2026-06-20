import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createPost, getPosts, likePost, deletePost } from '../controllers/postController.js';
const router = express.Router();
router.post('/', protect, createPost);
router.get('/', protect, getPosts);
router.post('/:id/like', protect, likePost);
router.delete('/:id', protect, deletePost);
export default router;
