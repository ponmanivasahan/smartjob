import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut, IoHome, IoPersonCircle } from 'react-icons/io5';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleHome = () => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
      return;
    }

    if (user?.role === 'candidate') {
      navigate('/candidate/dashboard');
      return;
    }

    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={handleHome}>
            <IoHome className="text-2xl mr-2" />
            <span className="text-xl font-bold">SmartJob Portal</span>
          </div>

          <div className="flex items-center gap-6">
            {user && (
              <>
                <div className="flex items-center gap-2">
                  <IoPersonCircle className="text-2xl" />
                  <span className="font-medium">{user.first_name} {user.last_name}</span>
                  <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                    {user.role.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                  <IoLogOut />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
