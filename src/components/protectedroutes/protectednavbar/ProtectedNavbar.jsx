import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProtectedNavbar.css';
import { useAuth } from '../../../store/authContext';
const ProtectedNavbar = ({ toggleMenu, hamburgerIsOpen }) => {
  const { authState, logout } = useAuth();
  return (
    <header className={`nav bg-blue-100 flex w-full flex-row gap-6 md:gap-0 md:flex-row items-center py-4 px-2 md:px-6
      ${!hamburgerIsOpen ? 'justify-between' : 'justify-end'}
    `}>

      {
        hamburgerIsOpen == false &&
        <Link to="/">
          <h3 className="text-blue-700 text-2xl font-mono pl-3 sm:pl-0">
            track code
          </h3>
        </Link>
      }

      {/* Hamburger Menu Icon */}
      <div className={`sm:hidden cursor-pointer mr-3 
      
       ${hamburgerIsOpen ? 'mt-2.5' : 'mt-0'} 
      `}
        onClick={toggleMenu}>
        <div className={`menu-icon ${hamburgerIsOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
        </div>
      </div>

      <nav className="hidden sm:flex">
        <ul className="flex flex-row justify-evenly gap-8">
          <li>
            <Link to="/super">Dashboard</Link>
          </li>
          <li>
            <Link to="/batchreport">Batch Report</Link>
          </li>
          <li>
            <Link to="/studentreport">Student Report</Link>
          </li>
          <li>
            <Link to="/contestanalysis">Contest Analysis</Link>
          </li>
          <li>
            <button 
              onClick={logout}
            >
              Logout
            </button>
          </li>


        </ul>
      </nav>
    </header>
  );
};

export default ProtectedNavbar;
