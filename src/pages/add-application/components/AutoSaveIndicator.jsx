import React from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ lastSaved, isSaving }) => {
  const formatLastSaved = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInSeconds = Math.floor((now - saved) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Saved just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Saved ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `Saved at ${saved?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  if (isSaving) {
    return (
      <div className="flex items-center space-x-2 text-sm text-blue-600">
        <div className="animate-spin">
          <Icon name="Loader2" size={16} />
        </div>
        <span>Saving...</span>
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div className="flex items-center space-x-2 text-sm text-green-600">
        <Icon name="Check" size={16} />
        <span>{formatLastSaved(lastSaved)}</span>
      </div>
    );
  }

  return null;
};

export default AutoSaveIndicator;