import React from 'react';

import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortConfig, onSort }) => {
  const sortOptions = [
    { value: 'applicationDate', label: 'Application Date' },
    { value: 'company', label: 'Company Name' },
    { value: 'position', label: 'Position' },
    { value: 'status', label: 'Status' },
    { value: 'salaryMin', label: 'Salary Range' }
  ];

  const toggleDirection = () => {
    onSort(sortConfig?.field, sortConfig?.direction === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
      <Select
        placeholder="Choose field"
        options={sortOptions}
        value={sortConfig?.field}
        onChange={(value) => onSort(value, sortConfig?.direction)}
        className="min-w-[150px]"
      />
      <Button
        variant="outline"
        size="sm"
        iconName={sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'}
        onClick={toggleDirection}
        className="flex-shrink-0"
      />
    </div>
  );
};

export default SortControls;