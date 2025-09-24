import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  selectedCount, 
  onBulkStatusUpdate, 
  onBulkDelete, 
  onExportSelected,
  onClearSelection 
}) => {
  const statusOptions = [
    { value: 'Applied', label: 'Applied' },
    { value: 'Phone Screen', label: 'Phone Screen' },
    { value: 'Interview', label: 'Interview' },
    { value: 'Final Round', label: 'Final Round' },
    { value: 'Offer', label: 'Offer' },
    { value: 'Rejected', label: 'Rejected' }
  ];

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <span className="text-sm font-medium text-gray-900">
            {selectedCount} application{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearSelection}
            className="text-gray-600 hover:text-gray-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Update */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Update status:</span>
            <Select
              placeholder="Choose status"
              options={statusOptions}
              value=""
              onChange={(value) => onBulkStatusUpdate(value)}
              className="min-w-[140px]"
            />
          </div>

          {/* Export Options */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => onExportSelected('csv')}
            >
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              onClick={() => onExportSelected('pdf')}
            >
              PDF
            </Button>
          </div>

          {/* Delete */}
          <Button
            variant="destructive"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            onClick={onBulkDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;