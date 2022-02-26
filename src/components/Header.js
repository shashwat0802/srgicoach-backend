import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();
  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to Logout');
    }
  };

  const handleToggle = () => {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('hidden');
  };

  return (
    <>
      <nav className="bg-gray-100 bg-transparent p-4 md:py-8 lg:px-16">
        {error && <p>{error}</p>}
        <div className="mx-auto ">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <Link to="/login" className="hidden md:block">
                  <img src={Logo} alt="" />
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-1"></div>
            </div>

            <div className="md:hidden flex items-center">
              <button className="mobile-menu-button" onClick={handleToggle}>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-64 mx-auto my-6 md:hidden">
        <Link to="/login" className="">
          <img src={Logo} alt="" />
        </Link>
      </div>
    </>
  );
}
