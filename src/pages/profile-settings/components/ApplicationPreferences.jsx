import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ApplicationPreferences = ({ preferencesData, onPreferencesUpdate }) => {
  const [preferences, setPreferences] = useState(preferencesData);

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' }
  ];

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const experienceLevelOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' },
    { value: 'executive', label: 'Executive' }
  ];

  const workModeOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' }
  ];

  const handleInputChange = (field, value) => {
    const updatedPreferences = {
      ...preferences,
      [field]: value
    };
    setPreferences(updatedPreferences);
    onPreferencesUpdate(updatedPreferences);
  };

  const handleCheckboxChange = (field, checked) => {
    const updatedPreferences = {
      ...preferences,
      [field]: checked
    };
    setPreferences(updatedPreferences);
    onPreferencesUpdate(updatedPreferences);
  };

  const resetToDefaults = () => {
    const defaultPreferences = {
      targetIndustries: [],
      preferredJobTypes: [],
      experienceLevel: '',
      minSalary: '',
      maxSalary: '',
      preferredLocations: [],
      workMode: [],
      autoApplyFilters: false,
      saveSearches: true,
      emailAlerts: true
    };
    setPreferences(defaultPreferences);
    onPreferencesUpdate(defaultPreferences);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Application Preferences</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={resetToDefaults}
        >
          Reset Defaults
        </Button>
      </div>
      <div className="space-y-8">
        {/* Job Preferences */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Job Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Target Industries"
              description="Select industries you're interested in"
              options={industryOptions}
              value={preferences?.targetIndustries}
              onChange={(value) => handleInputChange('targetIndustries', value)}
              multiple
              searchable
              clearable
            />

            <Select
              label="Preferred Job Types"
              description="Select your preferred employment types"
              options={jobTypeOptions}
              value={preferences?.preferredJobTypes}
              onChange={(value) => handleInputChange('preferredJobTypes', value)}
              multiple
            />

            <Select
              label="Experience Level"
              description="Your current experience level"
              options={experienceLevelOptions}
              value={preferences?.experienceLevel}
              onChange={(value) => handleInputChange('experienceLevel', value)}
            />

            <Select
              label="Work Mode Preference"
              description="Your preferred work arrangement"
              options={workModeOptions}
              value={preferences?.workMode}
              onChange={(value) => handleInputChange('workMode', value)}
              multiple
            />
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Salary Expectations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Minimum Salary (INR)"
              type="number"
              value={preferences?.minSalary}
              onChange={(e) => handleInputChange('minSalary', e?.target?.value)}
              placeholder="50000"
            />

            <Input
              label="Maximum Salary (INR)"
              type="number"
              value={preferences?.maxSalary}
              onChange={(e) => handleInputChange('maxSalary', e?.target?.value)}
              placeholder="100000"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Leave blank if you prefer not to specify salary range
          </p>
        </div>

        {/* Location Preferences */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Location Preferences</h3>
          <div className="space-y-4">
            <Input
              label="Preferred Locations"
              type="text"
              value={preferences?.preferredLocations?.join(', ')}
              onChange={(e) => handleInputChange('preferredLocations', e?.target?.value?.split(', ')?.filter(loc => loc?.trim()))}
              placeholder="Bangalore, Mumbai, Remote"
              description="Separate multiple locations with commas"
            />
          </div>
        </div>

        {/* Application Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Application Settings</h3>
          <div className="space-y-4">
            <Checkbox
              label="Auto-apply Filters"
              description="Automatically apply your preferences when searching"
              checked={preferences?.autoApplyFilters}
              onChange={(e) => handleCheckboxChange('autoApplyFilters', e?.target?.checked)}
            />

            <Checkbox
              label="Save Search Queries"
              description="Remember your search history for quick access"
              checked={preferences?.saveSearches}
              onChange={(e) => handleCheckboxChange('saveSearches', e?.target?.checked)}
            />

            <Checkbox
              label="Job Alert Emails"
              description="Receive emails when new jobs match your preferences"
              checked={preferences?.emailAlerts}
              onChange={(e) => handleCheckboxChange('emailAlerts', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Current Preferences Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Current Preferences Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Industries:</span>
              <span className="ml-2 text-gray-900">
                {preferences?.targetIndustries?.length > 0 
                  ? preferences?.targetIndustries?.join(', ') 
                  : 'Not specified'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Job Types:</span>
              <span className="ml-2 text-gray-900">
                {preferences?.preferredJobTypes?.length > 0 
                  ? preferences?.preferredJobTypes?.join(', ') 
                  : 'Not specified'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Salary Range:</span>
              <span className="ml-2 text-gray-900">
                {preferences?.minSalary || preferences?.maxSalary 
                  ? `₹${preferences?.minSalary || '0'} - ₹${preferences?.maxSalary || '∞'}` 
                  : 'Not specified'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Work Mode:</span>
              <span className="ml-2 text-gray-900">
                {preferences?.workMode?.length > 0 
                  ? preferences?.workMode?.join(', ') 
                  : 'Not specified'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPreferences;