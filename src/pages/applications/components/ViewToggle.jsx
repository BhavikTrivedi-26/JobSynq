import React from 'react';

import Button from '../../../components/ui/Button';

const ViewToggle = ({ currentView, onViewChange }) => {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      <Button
        variant={currentView === 'table' ? 'default' : 'ghost'}
        size="sm"
        iconName="List"
        onClick={() => onViewChange('table')}
        className={`${
          currentView === 'table' ?'bg-white shadow-sm' :'hover:bg-gray-200'
        }`}
      >
        Table
      </Button>
      <Button
        variant={currentView === 'grid' ? 'default' : 'ghost'}
        size="sm"
        iconName="Grid3X3"
        onClick={() => onViewChange('grid')}
        className={`${
          currentView === 'grid' ?'bg-white shadow-sm' :'hover:bg-gray-200'
        }`}
      >
        Grid
      </Button>
    </div>
  );
};

export default ViewToggle;