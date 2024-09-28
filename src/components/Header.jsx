import React from 'react'

function Header() {

  return (
    <nav className="flex justify-between items-center bg-gray-900 p-4">
      {/* Dashboard on the left */}
      <div className="text-purple-400 font-bold text-2xl">
        <a href="/dashboard">Dashboard</a>
      </div>

      {/* Other items on the right */}
      <div className="space-x-6">
        <a href="/profile" className="text-purple-300 hover:underline">Profile</a>
        <a href="/settings" className="text-purple-300 hover:underline">Settings</a>
        <a href="/logout" className="text-purple-300 hover:underline">Logout</a>
      </div>
    </nav>
  )
}

export default Header