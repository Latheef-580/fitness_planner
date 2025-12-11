import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar(){
  const linkClass = ({isActive}) => isActive ? 'text-white bg-blue-600 px-3 py-2 rounded' : 'text-gray-700 px-3 py-2 hover:bg-gray-200 rounded'
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">FitMetrics</h1>
        <nav className="flex gap-2">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/workouts" className={linkClass}>Workouts</NavLink>
          <NavLink to="/meals" className={linkClass}>Meals</NavLink>
        </nav>
      </div>
    </header>
  )
}
