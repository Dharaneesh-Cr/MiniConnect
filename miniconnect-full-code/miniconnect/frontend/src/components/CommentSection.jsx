import { useEffect, useState } from 'react';
import API from '../services/api';
export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const load = async () => setComments((await API.get(`/comments/${postId}`)).data);
  useEffect(() => { load(); }, [postId]);
  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await API.post('/comments', { postId, text });
    setComments([...comments, data]); setText('');
  };
  return <div className="comments">
    {comments.map(c => <p key={c._id}><b>{c.user.name}</b> {c.text}</p>)}
    <form onSubmit={submit} className="comment-form">
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Write a comment..." />
      <button>Send</button>
    </form>
  </div>;
}
