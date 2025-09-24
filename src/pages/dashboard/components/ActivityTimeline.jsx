import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      type: 'application',
      company: 'Google',
      position: 'Senior Frontend Developer',
      action: 'Applied',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=64&h=64&fit=crop&crop=center',
      status: 'applied',
      icon: 'FileText',
      color: 'blue'
    },
    {
      id: 2,
      type: 'interview',
      company: 'Microsoft',
      position: 'React Developer',
      action: 'Interview Scheduled',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=64&h=64&fit=crop&crop=center',
      status: 'interview',
      icon: 'Calendar',
      color: 'green'
    },
    {
      id: 3,
      type: 'status_update',
      company: 'Apple',
      position: 'iOS Developer',
      action: 'Moved to Final Round',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=64&h=64&fit=crop&crop=center',
      status: 'final_round',
      icon: 'ArrowRight',
      color: 'purple'
    },
    {
      id: 4,
      type: 'rejection',
      company: 'Netflix',
      position: 'Full Stack Developer',
      action: 'Application Rejected',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=64&h=64&fit=crop&crop=center',
      status: 'rejected',
      icon: 'X',
      color: 'red'
    },
    {
      id: 5,
      type: 'offer',
      company: 'Amazon',
      position: 'Software Engineer',
      action: 'Offer Received',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=64&h=64&fit=crop&crop=center',
      status: 'offer',
      icon: 'Gift',
      color: 'green'
    }
  ];

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      applied: 'bg-blue-100 text-blue-800',
      interview: 'bg-green-100 text-green-800',
      final_round: 'bg-purple-100 text-purple-800',
      rejected: 'bg-red-100 text-red-800',
      offer: 'bg-emerald-100 text-emerald-800'
    };
    return statusColors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const getIconColor = (color) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      purple: 'text-purple-600 bg-purple-50',
      red: 'text-red-600 bg-red-50'
    };
    return colorMap?.[color] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start space-x-4 group hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors duration-200">
            <div className="flex-shrink-0 relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image 
                  src={activity?.logo} 
                  alt={`${activity?.company} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${getIconColor(activity?.color)}`}>
                <Icon name={activity?.icon} size={12} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity?.company}
                  </p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity?.status)}`}>
                    {activity?.action}
                  </span>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {formatTime(activity?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity?.position}</p>
            </div>
            
            {index < activities?.length - 1 && (
              <div className="absolute left-7 mt-12 w-px h-4 bg-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;