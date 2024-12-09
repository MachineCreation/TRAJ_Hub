
//React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//components
import Header from '../components/header';

//variables
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
    <article className="relative flex flex-col w-full h-dvh min-h-custom-main text-white">
      <Header 
      name='Login'/>
      <div className='flex flex-row p-4 h-full justify-center'>
        <section className='flex flex-col p-3 justify-self-center self-center shadow-outer-green rounded-xl'>
          <h2 className='my-2 text-xl text-cyan-600'>Login</h2>
          <p className='flex text-yellow-600 text-xs'>Login page for members only. If you are not a member please navigate back to the main page</p>
          <form 
            onSubmit={handleSubmit}
            className='flex flex-col'>
            <input
              type="text"
              placeholder="Username"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              required
              className='my-3'
            />
            <input
              type="password"
              placeholder="Password"
              value={psw}
              onChange={(e) => setPsw(e.target.value)}
              required
              className='my-2'
            />
            <button 
              type="submit"
              className='my-2'
              >
                Login
            </button>
          </form>
        </section>
      </div>
    </article>
  );
};