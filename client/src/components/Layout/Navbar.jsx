import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="bg-white shadow">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img src="/src/assets/karma-logo.png" alt="logo" className="w-12 h-12"/>
          <span className="font-bold text-xl">Karma Studios</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/admin/login" className="px-3 py-1 bg-blue-600 text-white rounded">Admin Login</Link>
        </div>
      </div>
    </nav>
  )
}
