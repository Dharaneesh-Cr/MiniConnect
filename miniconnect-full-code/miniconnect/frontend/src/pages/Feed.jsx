import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
export default function Feed() {
  const { user } = useAuth(); const [posts,setPosts]=useState([]); const [users,setUsers]=useState([]); const [caption,setCaption]=useState(''); const [image,setImage]=useState('');
  const load = async () => { setPosts((await API.get('/posts')).data); setUsers((await API.get('/users')).data); };
  useEffect(()=>{ load(); },[]);
  const create = async e => { e.preventDefault(); if(!caption.trim()) return; const {data}=await API.post('/posts',{caption,image}); setPosts([data,...posts]); setCaption(''); setImage(''); };
  return <><Navbar/><div className="layout"><aside className="sidebar"><a>🏠 Home</a><a>🔎 Explore</a><a>🔔 Notifications</a><a>💬 Messages</a><a>⚙️ Settings</a></aside><main>
    <form className="card create" onSubmit={create}><div className="row"><img src={user.avatar}/><textarea value={caption} onChange={e=>setCaption(e.target.value)} placeholder={`What's on your mind, ${user.name}?`}/></div><input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL optional"/><button>Post</button></form>
    {posts.map(p=><PostCard key={p._id} post={p} onDelete={(id)=>setPosts(posts.filter(x=>x._id!==id))}/>)}</main><aside className="right"><div className="card"><h3>Who to follow</h3>{users.map(u=><UserCard key={u._id} u={u}/>)}</div></aside></div></>;
}
