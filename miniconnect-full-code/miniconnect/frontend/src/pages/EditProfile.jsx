import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
export default function EditProfile(){
 const {user,setUser}=useAuth(); const [name,setName]=useState(user.name); const [bio,setBio]=useState(user.bio||''); const [avatar,setAvatar]=useState(user.avatar); const nav=useNavigate();
 const save=async e=>{e.preventDefault(); const {data}=await API.put('/users/me',{name,bio,avatar}); localStorage.setItem('miniconnect_user',JSON.stringify(data)); setUser(data); nav(`/profile/${data.id}`);};
 return <><Navbar/><form className="edit-form card" onSubmit={save}><h2>Edit Profile</h2><input value={name} onChange={e=>setName(e.target.value)} /><input value={avatar} onChange={e=>setAvatar(e.target.value)} /><textarea value={bio} onChange={e=>setBio(e.target.value)} /><button>Save</button></form></>;
}
