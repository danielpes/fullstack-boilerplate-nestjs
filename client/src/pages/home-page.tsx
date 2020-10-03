import React from 'react';
import { useAuth } from '../context/auth-provider';

export function HomePage() {
  const { logout, data } = useAuth();
  const user = data.user;
  if (!user) return null;

  return (
    <div>
      {user.pictureUrl && <img alt="You" src={user.pictureUrl}></img>}
      <h1>{`Hello, ${user.name}`}</h1>
      {Object.entries(user).map(([key, value]) => (
        <div>{`${key}: ${value}`}</div>
      ))}
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
