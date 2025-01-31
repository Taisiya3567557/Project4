import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://json-placeholder.mock.beeceptor.com/users')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
