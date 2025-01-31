import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://json-placeholder.mock.beeceptor.com/users/${userId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err));
  }, [userId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>ID: {user.id}</p> {/* Добавили ID */}
      <p>Name: {user.name}</p>
      <p>Name: {user.name}</p>
      <p>Company: {user.company}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p> 
      <p>zip: {user.zip}</p>
      <p>state: {user.state}</p>
      <p>country:{user.country}</p>
      <p>Phone: {user.phone}</p>
      <img src={user.photo} style={{ width: 40, height: 40}}/>
    </div>
  );
}

export default UserDetail;