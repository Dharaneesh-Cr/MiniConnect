import { Link } from 'react-router-dom';
import { useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import CommentSection from './CommentSection';
export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(post.likes?.includes(user.id));
  const like = async () => {
    const { data } = await API.post(`/posts/${post._id}/like`);
    setLiked(data.liked); setLikes(data.likes);
  };
  const remove = async () => { await API.delete(`/posts/${post._id}`); onDelete(post._id); };
  return <div className="card post">
    <div className="post-head">
      <img src={post.user.avatar} /><div><Link to={`/profile/${post.user._id}`}><b>{post.user.name}</b></Link><small>{new Date(post.createdAt).toLocaleString()}</small></div>
      {post.user._id === user.id && <button className="delete" onClick={remove}>Delete</button>}
    </div>
    <p>{post.caption}</p>
    {post.image && <img className="post-img" src={post.image} />}
    <div className="actions"><button onClick={like}>{liked ? '❤️' : '🤍'} {likes}</button><span>💬 Comment</span></div>
    <CommentSection postId={post._id} />
  </div>;
}
