import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SalarySection = ({ formData, handleInputChange, errors }) => {
  const salaryTypeOptions = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'annual', label: 'Annual' },
    { value: 'contract', label: 'Contract' }
  ];

  const formatSalary = (value) => {
    if (!value) return '';
    const numericValue = value?.replace(/[^\d]/g, '');
    return numericValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e?.target;
    const formattedValue = formatSalary(value);
    handleInputChange({ target: { name, value: formattedValue } });
  };

  // Get placeholder and description based on salary type
  const getSalaryPlaceholders = () => {
    switch (formData?.salaryType) {
      case 'hourly':
        return {
          minPlaceholder: '500',
          maxPlaceholder: '5,000',
          description: 'Enter hourly rate without currency symbol'
        };
      case 'contract':
        return {
          minPlaceholder: '50,000',
          maxPlaceholder: '5,00,000',
          description: 'Enter contract amount without currency symbol'
        };
      default: // annual
        return {
          minPlaceholder: '2,50,000',
          maxPlaceholder: '1,00,00,000',
          description: 'Enter annual amount without currency symbol'
        };
    }
  };

  // Format display text based on salary type
  const formatDisplayText = () => {
    const { salaryMin, salaryMax, salaryType } = formData;
    
    if (!salaryMin && !salaryMax) return '';
    
    let suffix = '';
    switch (salaryType) {
      case 'hourly':
        suffix = '/hour';
        break;
      case 'annual':
        suffix = '/year';
        break;
      case 'contract':
        suffix = ' (contract)';
        break;
      default:
        suffix = '';
    }
    
    return `₹${salaryMin || '0'} - ₹${salaryMax || '0'}${suffix}`;
  };

  const placeholders = getSalaryPlaceholders();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Salary Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Minimum Salary"
          type="text"
          name="salaryMin"
          value={formData?.salaryMin}
          onChange={handleSalaryChange}
          placeholder={placeholders.minPlaceholder}
          description={placeholders.description}
        />
        
        <Input
          label="Maximum Salary"
          type="text"
          name="salaryMax"
          value={formData?.salaryMax}
          onChange={handleSalaryChange}
          placeholder={placeholders.maxPlaceholder}
          description={placeholders.description}
        />
        
        <Select
          label="Salary Type"
          name="salaryType"
          options={salaryTypeOptions}
          value={formData?.salaryType}
          onChange={(value) => handleInputChange({ target: { name: 'salaryType', value } })}
          placeholder="Select type"
        />
      </div>
      {(formData?.salaryMin || formData?.salaryMax) && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Salary Range: {formatDisplayText()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SalarySection;