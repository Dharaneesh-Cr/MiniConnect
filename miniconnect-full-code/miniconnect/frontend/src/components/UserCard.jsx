import { Link } from 'react-router-dom';
import { useState } from 'react';
import API from '../services/api';
export default function UserCard({ u }) {
  const [following, setFollowing] = useState(false);
  const follow = async () => {
    const { data } = await API.post(`/users/${u._id}/follow`);
    setFollowing(data.following);
  };
  return <div className="user-card">
    <img src={u.avatar} /><div><Link to={`/profile/${u._id}`}><b>{u.name}</b></Link><small>{u.bio}</small></div>
    <button onClick={follow}>{following ? 'Following' : 'Follow'}</button>
  </div>;
}
