import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingInterviews = () => {
  const interviews = [
    {
      id: 1,
      company: 'Google',
      position: 'Senior Frontend Developer',
      date: new Date(2025, 8, 25, 14, 30),
      type: 'Technical Interview',
      interviewer: 'Sarah Johnson',
      location: 'Video Call',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=64&h=64&fit=crop&crop=center',
      status: 'confirmed'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'React Developer',
      date: new Date(2025, 8, 27, 10, 0),
      type: 'Final Round',
      interviewer: 'Michael Chen',
      location: 'On-site - Seattle',
      logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=64&h=64&fit=crop&crop=center',
      status: 'pending'
    },
    {
      id: 3,
      company: 'Apple',
      position: 'iOS Developer',
      date: new Date(2025, 8, 28, 16, 0),
      type: 'System Design',
      interviewer: 'Lisa Wang',
      location: 'Video Call',
      logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=64&h=64&fit=crop&crop=center',
      status: 'confirmed'
    }
  ];

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays > 1 && diffDays <= 7) {
      return `In ${diffDays} days`;
    } else {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusColor = (status) => {
    return status === 'confirmed' ?'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800';
  };

  const getCountdownColor = (date) => {
    const now = new Date();
    const diffHours = (date - now) / (1000 * 60 * 60);
    
    if (diffHours <= 24) {
      return 'text-red-600 bg-red-50';
    } else if (diffHours <= 72) {
      return 'text-orange-600 bg-orange-50';
    } else {
      return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          onClick={() => console.log('View calendar clicked')}
        >
          View Calendar
        </Button>
      </div>
      {interviews?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No upcoming interviews</p>
          <p className="text-sm text-gray-400">Schedule your next interview to see it here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews?.map((interview) => (
            <div key={interview?.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-soft transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                    <Image 
                      src={interview?.logo} 
                      alt={`${interview?.company} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {interview?.company}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview?.status)}`}>
                        {interview?.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{interview?.position}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{formatTime(interview?.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{interview?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{interview?.interviewer}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCountdownColor(interview?.date)}`}>
                    {formatDate(interview?.date)}
                  </div>
                  <span className="text-xs text-gray-500">{interview?.type}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Video"
                    iconPosition="left"
                    onClick={() => console.log(`Join interview for ${interview?.company}`)}
                  >
                    Join
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    iconPosition="left"
                    onClick={() => console.log(`Message interviewer for ${interview?.company}`)}
                  >
                    Message
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  onClick={() => console.log(`More options for ${interview?.company}`)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingInterviews;