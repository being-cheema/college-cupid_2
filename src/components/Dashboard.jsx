import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://collegecupid.pockethost.io');

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await pb.collection('users').getFullList({ sort: 'created' });
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error loading users:', error);
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const displayUser = (index) => {
    if (users.length === 0) return <p>No users available</p>;

    const user = users[index];
    const userImage = pb.files.getUrl(user, user.id_card);

    return (
      <div className="user-details text-center">
        <img
          src={userImage}
          alt="Profile"
          className="rounded-lg mb-4 w-[490px] h-48 object-cover" // Ensures consistent size
        />
        <p>{`${user.first_name} ${user.last_name} - ${user.college}`}</p>
      </div>
    );
  };

  const handlePrevUser = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
  };

  const handleNextUser = () => {
    setCurrentIndex((currentIndex + 1) % users.length);
  };

  const handleLogout = () => {
    pb.authStore.clear();
    window.location.href = '/login'; // Assuming login route
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#141414] text-white relative">
      <img src="./src/assets/logo.png" alt="College Cupid Logo" className="absolute top-5 left-5 w-24" />
      
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 px-4 py-2 bg-indigo-500 text-black rounded hover:bg-indigo-400"
      >
        Logout
      </button>
      
      <a href="/foryou" className="absolute top-5 left-36 px-4 py-2 bg-indigo-500 text-black rounded hover:bg-indigo-400">
        For You
      </a>

      <div className="container bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-indigo-400 mb-4 text-3xl font-extrabold">Dashboard</h1>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          displayUser(currentIndex)
        )}
        
        <div className="swipe-buttons flex justify-between gap-4 mt-4">
          <button
            onClick={handlePrevUser}
            className="w-full p-3 bg-gray-700 border border-indigo-400 rounded hover:bg-indigo-500 transition duration-300"
          >
            Previous
          </button>
          <button
            onClick={handleNextUser}
            className="w-full p-3 bg-gray-700 border border-indigo-400 rounded hover:bg-indigo-500 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
