import React from 'react';

const JobDescriptionSection = ({ formData, handleInputChange }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Job Description & Notes</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData?.jobDescription}
            onChange={handleInputChange}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary resize-vertical"
            placeholder="Paste the job description here..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Copy and paste the complete job description for future reference
          </p>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Personal Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData?.notes}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary resize-vertical"
            placeholder="Add your personal notes, thoughts, or observations about this opportunity..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Track your thoughts, interview prep notes, or company research
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionSection;