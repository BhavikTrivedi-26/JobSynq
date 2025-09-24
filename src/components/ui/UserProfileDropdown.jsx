import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    closeDropdown();
    
    // Clear all stored data
    localStorage.clear();
    
    // You can also clear specific items if needed:
    // localStorage.removeItem('user');
    // localStorage.removeItem('authToken');
    // localStorage.removeItem('jobApplications');
    
    // Redirect to login page
    navigate('/login');
    
    // Optional: Show a success message or reload
    // window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        closeDropdown();
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isActiveRoute('/profile-settings') || isOpen
            ? 'text-primary bg-primary/10' 
            : 'text-gray-600 hover:text-primary hover:bg-gray-50'
        }`}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" strokeWidth={2} />
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[1002] animate-fadeIn">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={18} color="white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Bhavik Trivedi</p>
                <p className="text-xs text-gray-500">BT@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/profile-settings"
              onClick={closeDropdown}
              className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                isActiveRoute('/profile-settings')
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              <Icon name="Settings" size={16} />
              <span>Profile Settings</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;