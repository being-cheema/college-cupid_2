import React from 'react';

const Verify = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 relative text-indigo-400">
      <img
        src="./src/assets/logo.png"
        alt="College Cupid Logo"
        className="absolute top-5 left-5 w-24"
      />
      <div className="absolute top-5 right-5 flex gap-3">
        <a
          href="/"
          className="px-4 py-2 bg-indigo-500 text-black rounded transition duration-300 hover:bg-indigo-400"
        >
          Home
        </a>
        <a
          href="/login"
          className="px-4 py-2 bg-indigo-500 text-black rounded transition duration-300 hover:bg-indigo-400"
        >
          Login
        </a>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-4xl mb-6 font-extrabold">Hold Tight, Cupid's Got This!</h1>
        <p className="text-white text-lg mb-4">
          We're just doing a quick background check on your love life. Please
          give us a few hours to verify your account. We promise, it’ll be worth
          the wait!
        </p>
        <p className="text-white text-lg">For now, we're only taking users to sign up.</p>
        <p className="text-white text-lg">The final matching will be done on September 30th.</p>
      </div>
    </div>
  );
};

export default Verify;