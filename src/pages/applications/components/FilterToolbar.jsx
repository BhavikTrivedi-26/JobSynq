import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterToolbar = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFiltersChange, 
  onClearFilters,
  resultCount 
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const statusOptions = [
    { value: 'Applied', label: 'Applied' },
    { value: 'Phone Screen', label: 'Phone Screen' },
    { value: 'Interview', label: 'Interview' },
    { value: 'Final Round', label: 'Final Round' },
    { value: 'Offer', label: 'Offer' },
    { value: 'Rejected', label: 'Rejected' }
  ];

  const platformOptions = [
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Indeed', label: 'Indeed' },
    { value: 'Glassdoor', label: 'Glassdoor' },
    { value: 'AngelList', label: 'AngelList' },
    { value: 'Company Website', label: 'Company Website' },
    { value: 'Referral', label: 'Referral' }
  ];

  const companyOptions = [
    { value: 'Google', label: 'Google' },
    { value: 'Microsoft', label: 'Microsoft' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Amazon', label: 'Amazon' },
    { value: 'Meta', label: 'Meta' },
    { value: 'Netflix', label: 'Netflix' },
    { value: 'Tesla', label: 'Tesla' },
    { value: 'Spotify', label: 'Spotify' },
    { value: 'Airbnb', label: 'Airbnb' },
    { value: 'Uber', label: 'Uber' }
  ];

  const hasActiveFilters = filters?.company || filters?.status?.length > 0 || filters?.platform?.length > 0 || filters?.dateFrom || filters?.dateTo;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <Input
              type="search"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Company Filter */}
          <Select
            placeholder="All companies"
            options={companyOptions}
            value={filters?.company}
            onChange={(value) => onFiltersChange({ ...filters, company: value })}
            clearable
          />

          {/* Status Filter */}
          <Select
            placeholder="All statuses"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFiltersChange({ ...filters, status: value })}
            multiple
            clearable
          />

          {/* Platform Filter */}
          <Select
            placeholder="All platforms"
            options={platformOptions}
            value={filters?.platform}
            onChange={(value) => onFiltersChange({ ...filters, platform: value })}
            multiple
            clearable
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="date"
            label="From Date"
            value={filters?.dateFrom}
            onChange={(e) => onFiltersChange({ ...filters, dateFrom: e?.target?.value })}
          />
          
          <Input
            type="date"
            label="To Date"
            value={filters?.dateTo}
            onChange={(e) => onFiltersChange({ ...filters, dateTo: e?.target?.value })}
          />

          <div className="flex items-end">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
                className="w-full"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Filters */}
      <div className="lg:hidden">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
            />
          </div>
          <Button
            variant="outline"
            iconName="Filter"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={hasActiveFilters ? 'border-primary text-primary' : ''}
          />
        </div>

        {showMobileFilters && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <Select
              label="Company"
              placeholder="All companies"
              options={companyOptions}
              value={filters?.company}
              onChange={(value) => onFiltersChange({ ...filters, company: value })}
              clearable
            />

            <Select
              label="Status"
              placeholder="All statuses"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => onFiltersChange({ ...filters, status: value })}
              multiple
              clearable
            />

            <Select
              label="Platform"
              placeholder="All platforms"
              options={platformOptions}
              value={filters?.platform}
              onChange={(value) => onFiltersChange({ ...filters, platform: value })}
              multiple
              clearable
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                label="From Date"
                value={filters?.dateFrom}
                onChange={(e) => onFiltersChange({ ...filters, dateFrom: e?.target?.value })}
              />
              
              <Input
                type="date"
                label="To Date"
                value={filters?.dateTo}
                onChange={(e) => onFiltersChange({ ...filters, dateTo: e?.target?.value })}
              />
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
                fullWidth
              >
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
        <p className="text-sm text-gray-600">
          {resultCount} application{resultCount !== 1 ? 's' : ''} found
        </p>
        
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Icon name="Filter" size={16} />
            <span>Filters active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterToolbar;