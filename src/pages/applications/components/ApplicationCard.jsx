import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationCard = ({ 
  application, 
  onEdit, 
  onDelete, 
  onStatusUpdate, 
  isSelected, 
  onSelect 
}) => {
  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800 border-blue-200',
      'Phone Screen': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Interview': 'bg-purple-100 text-purple-800 border-purple-200',
      'Final Round': 'bg-orange-100 text-orange-800 border-orange-200',
      'Offer': 'bg-green-100 text-green-800 border-green-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Not specified';
    if (min && max) return `₹${min?.toLocaleString()} - ₹${max?.toLocaleString()}`;
    if (min) return `₹${min?.toLocaleString()}+`;
    return `Up to ₹${max?.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
      isSelected ? 'border-primary shadow-md' : 'border-gray-200'
    }`}>
      <div className="p-6">
        {/* Header with checkbox and company */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(application?.id, e?.target?.checked)}
              className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {application?.company}
              </h3>
              <p className="text-gray-600 font-medium">{application?.position}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application?.status)}`}>
            {application?.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Icon name="MapPin" size={16} className="mr-2" />
            <span>{application?.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Icon name="DollarSign" size={16} className="mr-2" />
            <span>{formatSalary(application?.salaryMin, application?.salaryMax)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Icon name="Calendar" size={16} className="mr-2" />
            <span>Applied {formatDate(application?.applicationDate)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Icon name="Globe" size={16} className="mr-2" />
            <span>{application?.platform}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={() => onEdit(application)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onStatusUpdate(application)}
            >
              View
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(application)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;