import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CompanyInfoSection = ({ formData, handleInputChange, errors }) => {
  const locationOptions = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'bangalore-karnataka', label: 'Bangalore, Karnataka' },
  { value: 'mumbai-maharashtra', label: 'Mumbai, Maharashtra' },
  { value: 'delhi-delhi', label: 'Delhi, Delhi' },
  { value: 'gurgaon-haryana', label: 'Gurgaon, Haryana' },
  { value: 'noida-uttar-pradesh', label: 'Noida, Uttar Pradesh' },
  { value: 'hyderabad-telangana', label: 'Hyderabad, Telangana' },
  { value: 'pune-maharashtra', label: 'Pune, Maharashtra' },
  { value: 'chennai-tamil-nadu', label: 'Chennai, Tamil Nadu' },
  { value: 'kolkata-west-bengal', label: 'Kolkata, West Bengal' },
  { value: 'ahmedabad-gujarat', label: 'Ahmedabad, Gujarat' },
  { value: 'surat-gujarat', label: 'Surat, Gujarat' },
  { value: 'kochi-kerala', label: 'Kochi, Kerala' },
  { value: 'indore-madhya-pradesh', label: 'Indore, Madhya Pradesh' },
  { value: 'jaipur-rajasthan', label: 'Jaipur, Rajasthan' },
  { value: 'chandigarh-chandigarh', label: 'Chandigarh, Chandigarh' },
  { value: 'bhubaneswar-odisha', label: 'Bhubaneswar, Odisha' },
  { value: 'coimbatore-tamil-nadu', label: 'Coimbatore, Tamil Nadu' },
  { value: 'vadodara-gujarat', label: 'Vadodara, Gujarat' },
  { value: 'nagpur-maharashtra', label: 'Nagpur, Maharashtra' },
  { value: 'lucknow-uttar-pradesh', label: 'Lucknow, Uttar Pradesh' },
  { value: 'thiruvananthapuram-kerala', label: 'Thiruvananthapuram, Kerala' },
  { value: 'other', label: 'Other' }
];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Company Name"
            type="text"
            name="company"
            value={formData?.company}
            onChange={handleInputChange}
            placeholder="Enter company name"
            required
            error={errors?.company}
          />
        </div>
        
        <Input
          label="Position Title"
          type="text"
          name="position"
          value={formData?.position}
          onChange={handleInputChange}
          placeholder="e.g., Senior Software Engineer"
          required
          error={errors?.position}
        />
        
        <Select
          label="Location"
          name="location"
          options={locationOptions}
          value={formData?.location}
          onChange={(value) => handleInputChange({ target: { name: 'location', value } })}
          placeholder="Select location"
          searchable
          required
          error={errors?.location}
        />
      </div>
    </div>
  );
};

export default CompanyInfoSection;