import React from "react";
import Header from "./Header.jsx";

function AcceptMessage() {
  return (
    <>
    <Header/>
    <div className="bg-gray-800 p-[2rem]">
    <div className="block w-full max-w-md mx-auto bg-slate-200 shadow-lg rounded-lg overflow-hidden">
      <img
        className="rounded-[50%] p-10"
        src="https://cdn.pixabay.com/photo/2020/12/27/20/25/smile-5865209_1280.png"
        alt="unhappy"
      />
      <div className="p-6 text-surface text-purple-500">
        <h5 className="mb-2 text-xl font-medium leading-tight text-center">
          Person1
        </h5>
        <p className="mb-4 text-base text-center">
          Yahoo!!! We found it. You two make a great couple.
        </p>
      </div>
      <div className="flex justify-center space-x-10 mb-8">
        <button
          type="button"
          className="inline-block rounded bg-slate-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong justify-center"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          Message
        </button>
        <a href="/dashboard">
          <button
            type="button"
            className="inline-block rounded bg-slate-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong justify-center"
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            Go Back
          </button>
        </a>
      </div>
    </div>
    </div>
    </>
  );
}

export default AcceptMessage;
