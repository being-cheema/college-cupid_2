import React from 'react';

const CollegeCupid = () => {
  return (
    <div className="flex flex-col items-center">
      <img src="./src/assets/logo.png" alt="College Cupid Logo" className="w-64 mt-12" />
      <h1 className="text-5xl mt-8 mb-10">Welcome to College Cupid</h1>
      <div className="flex justify-center gap-10 mb-16">
        <a
          href="/signup"
          className="bg-[#8789FE] text-black px-8 py-4 rounded-lg font-bold text-xl border-2 border-indigo-300 transition-transform duration-300 transform hover:bg-indigo-500 hover:scale-105 hover:shadow-lg"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="bg-[#8789FE] text-black px-8 py-4 rounded-lg font-bold text-xl border-2 border-indigo-300 transition-transform duration-300 transform hover:bg-indigo-500 hover:scale-105 hover:shadow-lg"
        >
          Login
        </a>
      </div>

      <div className="text-left mb-16 w-full max-w-4xl px-6">
        <h2 className="text-3xl mb-4">Welcome to the Love Auditorium!</h2>
        <p className="text-lg mb-4">
          Welcome to College Cupid, where the only thing sharper than your GPA is your wit, and your
          future is as bright as that one classroom projector that’s always too bright...
        </p>
        <p className="text-lg">
          Forget swiping left and right; we're all about reading between the lines...
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mb-14">
        <div className="bg-gray-800 p-6 rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
          <p className="text-lg">
            <strong>Is this service only for college students?</strong>
            <br />
            Absolutely! This isn’t just any dating app; it’s where the smart cookies come to mingle. College Cupid is exclusively for the academically inclined and those who want to fall for someone as brilliant as they are.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
          <p className="text-lg">
            <strong>How do you ensure a safe dating environment?</strong>
            <br />
            Your safety is our top priority. Every profile gets a thorough Cupid-Check before joining the ranks. Think of it as an academic integrity test, but for love.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
          <p className="text-lg">
            <strong>I can’t find my college in the list?</strong>
            <br />
            No worries! Just send us a message. We're constantly adding new schools to our ever-growing love map. It’s like course registration, but way more exciting!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollegeCupid;
