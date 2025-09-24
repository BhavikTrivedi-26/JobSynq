import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RemindersPanel = () => {
  const reminders = [
    {
      id: 1,
      type: 'deadline',
      title: 'Application Deadline',
      company: 'Tesla',
      position: 'Software Engineer',
      dueDate: new Date(2025, 8, 24),
      priority: 'high',
      description: 'Submit application before midnight'
    },
    {
      id: 2,
      type: 'follow_up',
      title: 'Follow-up Email',
      company: 'Spotify',
      position: 'Frontend Developer',
      dueDate: new Date(2025, 8, 25),
      priority: 'medium',
      description: 'Send thank you email after interview'
    },
    {
      id: 3,
      type: 'document',
      title: 'Submit Documents',
      company: 'Airbnb',
      position: 'Full Stack Developer',
      dueDate: new Date(2025, 8, 26),
      priority: 'high',
      description: 'Upload portfolio and references'
    },
    {
      id: 4,
      type: 'preparation',
      title: 'Interview Prep',
      company: 'Uber',
      position: 'Senior Developer',
      dueDate: new Date(2025, 8, 27),
      priority: 'medium',
      description: 'Review system design concepts'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'status_update',
      title: 'Application Status Changed',
      company: 'LinkedIn',
      message: 'Your application has been reviewed',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'interview_scheduled',
      title: 'Interview Scheduled',
      company: 'Slack',
      message: 'Technical interview on Sept 26, 2:00 PM',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Follow-up Reminder',
      company: 'Dropbox',
      message: 'Send follow-up email today',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true
    }
  ];

  const formatDueDate = (date) => {
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays > 1) {
      return `${diffDays} days`;
    } else {
      return 'Overdue';
    }
  };

  const formatNotificationTime = (timestamp) => {
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

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors?.[priority] || colors?.medium;
  };

  const getTypeIcon = (type) => {
    const icons = {
      deadline: 'Clock',
      follow_up: 'Mail',
      document: 'FileText',
      preparation: 'BookOpen',
      status_update: 'Bell',
      interview_scheduled: 'Calendar',
      reminder: 'AlertCircle'
    };
    return icons?.[type] || 'Bell';
  };

  return (
    <div className="space-y-6">
      {/* Reminders Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Reminders</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => console.log('Add reminder clicked')}
          >
            Add
          </Button>
        </div>

        {reminders?.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="Clock" size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No reminders set</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders?.slice(0, 4)?.map((reminder) => (
              <div key={reminder?.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon name={getTypeIcon(reminder?.type)} size={16} className="text-gray-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {reminder?.title}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(reminder?.priority)}`}>
                      {formatDueDate(reminder?.dueDate)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    {reminder?.company} - {reminder?.position}
                  </p>
                  <p className="text-xs text-gray-500">{reminder?.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Notifications Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {notifications?.filter(n => !n?.read)?.length} unread
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="Check"
              onClick={() => console.log('Mark all as read')}
            />
          </div>
        </div>

        {notifications?.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="Bell" size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No notifications</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications?.map((notification) => (
              <div key={notification?.id} className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors duration-200 ${
                notification?.read 
                  ? 'border-gray-100 bg-gray-50' :'border-blue-200 bg-blue-50 hover:bg-blue-100'
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  notification?.read ? 'bg-gray-200' : 'bg-blue-100'
                }`}>
                  <Icon 
                    name={getTypeIcon(notification?.type)} 
                    size={16} 
                    className={notification?.read ? 'text-gray-600' : 'text-blue-600'} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-medium truncate ${
                      notification?.read ? 'text-gray-700' : 'text-gray-900'
                    }`}>
                      {notification?.title}
                    </p>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {formatNotificationTime(notification?.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{notification?.company}</p>
                  <p className="text-xs text-gray-500">{notification?.message}</p>
                </div>
                
                {!notification?.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindersPanel;