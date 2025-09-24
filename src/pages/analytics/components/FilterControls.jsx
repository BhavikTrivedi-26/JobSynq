import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const FilterControls = ({ 
  dateRange, 
  setDateRange, 
  selectedCompany, 
  setSelectedCompany, 
  positionType, 
  setPositionType,
  onExportData,
  onExportCharts 
}) => {
  const dateRangeOptions = [
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'last90', label: 'Last 3 Months' },
    { value: 'last180', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const companyOptions = [
    { value: 'all', label: 'All Companies' },
    { value: 'google', label: 'Google' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'apple', label: 'Apple' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'meta', label: 'Meta' },
    { value: 'netflix', label: 'Netflix' },
    { value: 'tesla', label: 'Tesla' },
    { value: 'uber', label: 'Uber' }
  ];

  const positionTypeOptions = [
    { value: 'all', label: 'All Positions' },
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'fullstack', label: 'Full Stack Developer' },
    { value: 'mobile', label: 'Mobile Developer' },
    { value: 'devops', label: 'DevOps Engineer' },
    { value: 'data', label: 'Data Scientist' },
    { value: 'product', label: 'Product Manager' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 min-w-0">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
              className="w-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Select
              label="Company"
              options={companyOptions}
              value={selectedCompany}
              onChange={setSelectedCompany}
              searchable
              className="w-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Select
              label="Position Type"
              options={positionTypeOptions}
              value={positionType}
              onChange={setPositionType}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 lg:ml-6">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExportData}
            className="whitespace-nowrap"
          >
            Export Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Image"
            iconPosition="left"
            onClick={onExportCharts}
            className="whitespace-nowrap"
          >
            Export Charts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;