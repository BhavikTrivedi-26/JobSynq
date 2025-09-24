import React from 'react';
import Icon from '../AppIcon';

const MobileMenuToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div className="relative w-6 h-6">
        <Icon 
          name="Menu" 
          size={24} 
          className={`absolute inset-0 transition-all duration-200 ${
            isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
          }`}
        />
        <Icon 
          name="X" 
          size={24} 
          className={`absolute inset-0 transition-all duration-200 ${
            isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
          }`}
        />
      </div>
    </button>
  );
};

export default MobileMenuToggle;