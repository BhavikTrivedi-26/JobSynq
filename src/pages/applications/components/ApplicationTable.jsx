import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationTable = ({ 
  applications, 
  onEdit, 
  onDelete, 
  onStatusUpdate, 
  selectedApplications, 
  onSelectAll, 
  onSelectApplication,
  sortConfig,
  onSort 
}) => {
  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Phone Screen': 'bg-yellow-100 text-yellow-800',
      'Interview': 'bg-purple-100 text-purple-800',
      'Final Round': 'bg-orange-100 text-orange-800',
      'Offer': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800';
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

  const getSortIcon = (field) => {
    if (sortConfig?.field !== field) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = applications?.length > 0 && selectedApplications?.length === applications?.length;
  const isIndeterminate = selectedApplications?.length > 0 && selectedApplications?.length < applications?.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => onSort('company')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Company</span>
                  <Icon name={getSortIcon('company')} size={14} />
                </button>
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => onSort('position')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Position</span>
                  <Icon name={getSortIcon('position')} size={14} />
                </button>
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary Range
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => onSort('applicationDate')}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <span>Applied Date</span>
                  <Icon name={getSortIcon('applicationDate')} size={14} />
                </button>
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {applications?.map((application) => (
              <tr 
                key={application?.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  selectedApplications?.includes(application?.id) ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedApplications?.includes(application?.id)}
                    onChange={(e) => onSelectApplication(application?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{application?.company}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{application?.position}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600 flex items-center">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {application?.location}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application?.status)}`}>
                    {application?.status}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {formatSalary(application?.salaryMin, application?.salaryMax)}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {formatDate(application?.applicationDate)}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{application?.platform}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEdit(application)}
                      className="text-gray-600 hover:text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onStatusUpdate(application)}
                      className="text-gray-600 hover:text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => onDelete(application)}
                      className="text-gray-600 hover:text-red-600"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {applications?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600">Try adjusting your filters or add a new application.</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationTable;