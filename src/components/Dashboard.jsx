import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://collegecupid.pockethost.io');

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(''); // State to store the logged-in user's first name
  const [profileLoading, setProfileLoading] = useState(false); // State for profile lazy loading

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    // Function to validate token
    const validateToken = async () => {
      try {
        // Use PocketBase to validate the token
        const userData = await pb.authStore.model; // Retrieve the current user data
        if (!userData || !userData.id) {
          // If no user data is returned, redirect to login
          window.location.href = '/login';
        } else {
          // Store user's first name for display from session storage
          setFirstName(sessionStorage.getItem('userName')); // Retrieve first name from session storage

          // Proceed to load users if the token is valid
          const loadUsers = async () => {
            try {
              const fetchedUsers = await pb.collection('users').getFullList({ sort: 'created' });
              setUsers(fetchedUsers);
              setLoading(false); // Data loading complete
            } catch (error) {
              console.error('Error loading users:', error);
              setLoading(false);
            }
          };

          loadUsers();
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        window.location.href = '/login'; // Redirect to login on validation failure
      }
    };

    // Only validate if the token is present
    if (token) {
      validateToken();
    } else {
      // Redirect to login if token is missing
      window.location.href = '/login';
    }
  }, []);

  const displayUser = (index) => {
    if (users.length === 0) return <p>No users available</p>;

    const user = users[index];
    const userImage = pb.files.getUrl(user, user.id_card);

    return (
      <div className="user-details text-center">
        {profileLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="loader"></div> {/* Display loader while profile loads */}
          </div>
        ) : (
          <>
            <img
              src={userImage}
              alt="Profile"
              className="rounded-lg mb-4 w-[300px] h-[300px] object-cover" // Ensures consistent size
            />
            <p>{`${user.first_name} ${user.last_name} - ${user.college}`}</p>
          </>
        )}
      </div>
    );
  };

  const handlePrevUser = async () => {
    setProfileLoading(true); // Show loader when changing profiles
    const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    setCurrentIndex(newIndex);

    // Simulate profile loading delay
    await new Promise((resolve) => setTimeout(resolve, 500)); // Fake delay for UX smoothness

    setProfileLoading(false); // Stop loader when profile data is ready
  };

  const handleNextUser = async () => {
    setProfileLoading(true); // Show loader when changing profiles
    const newIndex = (currentIndex + 1) % users.length;
    setCurrentIndex(newIndex);

    // Simulate profile loading delay
    await new Promise((resolve) => setTimeout(resolve, 500)); // Fake delay for UX smoothness

    setProfileLoading(false); // Stop loader when profile data is ready
  };

  const handleLogout = () => {
    // Clear PocketBase auth data
    pb.authStore.clear();
    
    // Remove data from sessionStorage
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName'); // Remove the userName from session storage
  
    // Redirect to the login page
    window.location.href = '/login'; // Assuming the login route
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#141414] text-white relative">
      <img src="./src/assets/logo.png" alt="College Cupid Logo" className="absolute top-5 left-5 w-24" />
      
      <div className="absolute top-5 right-5 flex items-center">
        <span className="mr-4">{firstName}</span> {/* Display user's first name */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-indigo-500 text-black rounded hover:bg-indigo-400"
        >
          Logout
        </button>
      </div>
      
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
            disabled={profileLoading} // Disable buttons while loading
          >
            Previous
          </button>
          <button
            onClick={handleNextUser}
            className="w-full p-3 bg-gray-700 border border-indigo-400 rounded hover:bg-indigo-500 transition duration-300"
            disabled={profileLoading} // Disable buttons while loading
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
