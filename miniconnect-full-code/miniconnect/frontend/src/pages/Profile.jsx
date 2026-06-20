import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
export default function Profile(){
 const {id}=useParams(); const {user:me}=useAuth(); const [data,setData]=useState(null);
 useEffect(()=>{API.get(`/users/${id}`).then(res=>setData(res.data));},[id]);
 if(!data) return <><Navbar/><p className="loading">Loading...</p></>;
 const {user,posts}=data;
 return <><Navbar/><div className="profile"><div className="cover"></div><div className="profile-info"><img src={user.avatar}/><div><h2>{user.name}</h2><p>{user.bio}</p><small>{user.followers.length} Followers • {user.following.length} Following</small></div>{me.id===user._id && <Link className="edit" to="/edit-profile">Edit Profile</Link>}</div><h3>Posts</h3>{posts.map(p=><PostCard key={p._id} post={p} onDelete={()=>{}} />)}</div></>;
}
