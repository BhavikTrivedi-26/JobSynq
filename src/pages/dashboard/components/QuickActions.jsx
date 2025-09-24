import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add New Application',
      description: 'Track a new job application',
      icon: 'Plus',
      variant: 'default',
      path: '/add-application',
      color: 'bg-primary'
    },
    {
      title: 'View All Applications',
      description: 'Manage your applications',
      icon: 'FileText',
      variant: 'outline',
      path: '/applications',
      color: 'bg-secondary'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View insights and trends',
      icon: 'BarChart3',
      variant: 'secondary',
      path: '/analytics',
      color: 'bg-accent'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions?.map((action, index) => (
          <Link key={index} to={action?.path} className="block group">
            <div className="p-4 rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-soft transition-all duration-200 group-hover:bg-gray-50">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${action?.color} flex items-center justify-center`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName={action?.icon}
                    iconSize={20}
                    className="text-white hover:bg-transparent"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                    {action?.title}
                  </h4>
                </div>
              </div>
              <p className="text-xs text-gray-600">{action?.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
            onClick={() => console.log('Schedule interview clicked')}
          >
            Schedule Interview
          </Button>
          <Button
            variant="ghost"
            iconName="Bell"
            iconPosition="left"
            className="flex-1"
            onClick={() => console.log('Set reminder clicked')}
          >
            Set Reminder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;