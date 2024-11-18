
//React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { backend_url } from '../config/variables';

export default function Login() {
  const [uname, setUname] = useState('');
  const [psw, setPsw] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${backend_url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ uname, psw })
    });

    const data = await response.json();

    if (data.status === "fail") {
      alert("Incorrect username or password.\nPlease try again");
      setUname('');
      setPsw('');
    } else if (data.status === 'success') {
      navigate('/');
    } else {
      console.error('Unexpected response:', data);
    }
    
  };

  return (
    <div className="relative  text-white">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={psw}
          onChange={(e) => setPsw(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};