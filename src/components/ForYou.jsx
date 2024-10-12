import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import RejectMessage from './RejectMessage';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const pb = new PocketBase('https://collegecupid.pockethost.io');

const ForYou = () => {
  const [message, setMessage] = useState(true);
  const [matchedPerson, setMatchedPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  // Validate token and log out if invalid
  const validateToken = async () => {
    const token = sessionStorage.getItem('token');
    try {
      if (!token) {
        handleLogout();
        return;
      }

      const userData = pb.authStore.model;
      if (!userData || !userData.id) {
        handleLogout();
      } else {
        setLoggedInUser(userData);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      handleLogout();
    }
  };

  // Logout function
  const handleLogout = () => {
    pb.authStore.clear();
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  // Fetch match data for the logged-in user
  const fetchMatch = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        handleLogout();
        return;
      }

      const matchRecord = await pb.collection('matches').getOne(userId, {
        expand: 'matchedUser',
      });

      if (matchRecord) {
        setMatchedPerson(matchRecord.expand.matchedUser);
      } else {
        setMatchedPerson(null);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching match:', error);
      setMatchedPerson(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    validateToken().then(fetchMatch);
  }, []);

  const acceptMessage = () => {
    navigate('/foryou/accepted');
  };

  const rejectMessage = () => {
    setMessage(false);
  };

  return (
    <>
      <Header />
      <div className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
          {/* Logged-in user's profile */}
          <div className="w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="w-full h-[300px]"> {/* Square box size */}
              <img
                className="w-full h-full object-cover"
                src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
                alt="Profile Image"
              />
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium text-center">
                {loggedInUser ? loggedInUser.first_name : 'Loading...'}
              </h5>
              <p className="mb-4 text-base text-center">
                Some quick example text to build on the card title and make up the bulk of the card's content. (Profile Description)
              </p>
              <div className="flex justify-center">
                <a href="/profile">
                  <button
                    type="button"
                    className="inline-block rounded bg-gray-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-gray-500"
                  >
                    Edit
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Matched person's profile or message */}
          {loading ? (
            <div className="flex justify-center items-center w-full bg-gray-800 shadow-lg rounded-lg h-[300px]">
              <p>Loading...</p>
            </div>
          ) : matchedPerson ? (
            <div className="w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="w-full h-[300px]"> {/* Square box size */}
                <img
                  className="w-full h-full object-cover"
                  src={matchedPerson.profile_picture || 'https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg'}
                  alt="Matched Profile"
                />
              </div>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium text-center">
                  {`${matchedPerson.first_name} ${matchedPerson.last_name}`}
                </h5>
                <p className="mb-4 text-base text-center">
                  {matchedPerson.description || 'Profile Description'}
                </p>
                <div className="flex justify-center gap-10">
                  <button
                    type="button"
                    className="inline-block rounded bg-emerald-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-emerald-500"
                    onClick={acceptMessage}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-red-500"
                    onClick={rejectMessage}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium text-center">
                  Your match is on its way!
                </h5>
                <p className="mb-4 text-base text-center">
                  Keep checking back for your perfect match.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForYou;
