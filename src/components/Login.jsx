import React, { useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://collegecupid.pockethost.io');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);

      if (!authData.record.verified) {
        window.location.href = 'verify';
        return;
      }

      sessionStorage.setItem('userEmail', authData.record.email);
      localStorage.setItem('userEmail', authData.record.email);
      sessionStorage.setItem('userId', authData.record.id);
      sessionStorage.setItem('token', pb.authStore.token);

      window.location.href = 'dashboard';
    } catch (error) {
      alert('Login failed: Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <img src="./src/assets/logo.png" alt="College Cupid Logo" className="absolute top-5 left-5 w-24" />
      <a href="/" className="absolute top-5 right-5 px-4 py-2 bg-indigo-500 text-black rounded transition duration-300 hover:bg-indigo-400">
        Home
      </a>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl text-indigo-400 mb-6 text-center">Login to College Cupid</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            id="loginEmail"
            name="loginEmail"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 rounded bg-gray-700 border border-indigo-400 focus:outline-none"
          />
          <div className="text-sm text-indigo-400 mb-4">Use your college email to log in.</div>
          <input
            type="password"
            id="loginPassword"
            name="loginPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 rounded bg-gray-700 border border-indigo-400 focus:outline-none"
          />
          <div className="text-sm text-indigo-400 mb-4">Enter your password to access your account.</div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full p-3 bg-indigo-500 text-black rounded hover:bg-indigo-400 transition duration-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="w-24 h-24 border-t-4 border-indigo-400 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
