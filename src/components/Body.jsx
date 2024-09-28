import React, { useState } from "react";
import RejectMessage from "./RejectMessage.jsx";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";

function Body() {
  const [message, setMessage] = useState(true);

  const navigate = useNavigate();

  function acceptMessage() {
    navigate("/accepted");
  }

  function rejectMessage() {
    setMessage(false);
  }

  return (
    <>
      <Header />
      <div className="bg-gray-800 text-indigo-400 p-[6.95rem]">
        <div className="flex">
          <div className="block w-full max-w-md mx-auto bg-slate-200 shadow-lg rounded-lg overflow-hidden">
            <img
              className="rounded-t-lg"
              src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
              alt="image"
            />
            <div className="p-6 text-surface text-indigo-400">
              <h5 className="mb-2 text-xl font-medium leading-tight text-center">
                Person1
              </h5>
              <p className="mb-4 text-base text-center">
                Some quick example text to build on the card title and make up
                the bulk of the card's content. (Profile Description)
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="inline-block rounded bg-slate-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong justify-center"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          {message ? (
            <div className="block w-full max-w-md mx-auto bg-slate-200 shadow-lg rounded-lg overflow-hidden">
              <img
                className="rounded-t-lg"
                src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
                alt="image"
              />
              <div className="p-6 text-surface text-indigo-400">
                <h5 className="mb-2 text-xl font-medium leading-tight text-center">
                  Your Potential Mate
                </h5>
                <p className="mb-4 text-base text-center">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content. Profile Description
                </p>
                <div className="flex justify-center gap-10">
                  <button
                    type="button"
                    className="inline-block rounded bg-emerald-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong justify-center"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    onClick={acceptMessage}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong justify-center"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    onClick={rejectMessage}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <RejectMessage />
          )}
        </div>
      </div>
    </>
  );
}

export default Body;
