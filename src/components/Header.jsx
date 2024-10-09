import React from 'react'

function Header() {

  return (
    <nav className="flex justify-between items-center bg-[#141414] p-4">
      {/* Dashboard on the left */}
      <div className="font-bold text-2xl">
        <a href="/foryou"><img src="./src/assets/logo.png" alt="College Cupid Logo" className="absolute top-5 left-5 w-24" /></a>
      </div>

      {/* Other items on the right */}
      <div className="space-x-6">
        <a href="/profile" className="hover:underline">Profile</a>
        <a href="/settings" className="hover:underline">Settings</a>
        <a href="/logout" className="hover:underline">Logout</a>
      </div>
    </nav>
  )
}

export default Header