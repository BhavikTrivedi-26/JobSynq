import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ApplicationDetailsSection = ({ formData, handleInputChange, handleCheckboxChange, errors }) => {
  const statusOptions = [
    { value: 'applied', label: 'Applied' },
    { value: 'phone-screen', label: 'Phone Screen' },
    { value: 'interview', label: 'Interview' },
    { value: 'final-round', label: 'Final Round' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'withdrawn', label: 'Withdrawn' }
  ];

  const platforms = [
  { id: 'naukri', label: 'Naukri.com' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'indeed-india', label: 'Indeed India' },
  { id: 'monster-india', label: 'Monster India' },
  { id: 'shine', label: 'Shine.com' },
  { id: 'company-website', label: 'Company Website' },
  { id: 'referral', label: 'Referral' },
  { id: 'recruiter', label: 'Recruiter' },
  { id: 'angellist', label: 'AngelList' }
];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Select
          label="Application Status"
          name="status"
          options={statusOptions}
          value={formData?.status}
          onChange={(value) => handleInputChange({ target: { name: 'status', value } })}
          placeholder="Select status"
          required
          error={errors?.status}
        />
        
        <Input
          label="Application Date"
          type="date"
          name="applicationDate"
          value={formData?.applicationDate}
          onChange={handleInputChange}
          required
          error={errors?.applicationDate}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Application Platform
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platforms?.map((platform) => (
            <Checkbox
              key={platform?.id}
              label={platform?.label}
              checked={formData?.platforms?.includes(platform?.id)}
              onChange={(e) => handleCheckboxChange(platform?.id, e?.target?.checked)}
            />
          ))}
        </div>
        {formData?.platforms?.includes('other') && (
          <div className="mt-3">
            <Input
              label="Other Platform"
              type="text"
              name="otherPlatform"
              value={formData?.otherPlatform}
              onChange={handleInputChange}
              placeholder="Specify other platform"
            />
          </div>
        )}
      </div>
      <Input
        label="Job Posting URL"
        type="url"
        name="jobUrl"
        value={formData?.jobUrl}
        onChange={handleInputChange}
        placeholder="https://example.com/job-posting"
        description="Link to the original job posting"
      />
    </div>
  );
};

export default ApplicationDetailsSection;