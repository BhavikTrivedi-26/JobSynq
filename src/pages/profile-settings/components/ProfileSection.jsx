import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileSection = ({ profileData, onProfileUpdate, hasUnsavedChanges }) => {
  const [formData, setFormData] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData?.phone && !/^\+?[\d\s\-\(\)]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onProfileUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="User" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={formData?.avatar}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Icon name="Camera" size={16} />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{formData?.fullName}</h3>
            <p className="text-sm text-gray-500">{formData?.email}</p>
            {isEditing && (
              <p className="text-xs text-gray-400 mt-1">Click camera icon to change photo</p>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            disabled={!isEditing}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            disabled={!isEditing}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            disabled={!isEditing}
            placeholder="+1 (555) 123-4567"
          />

          <Input
            label="Location"
            type="text"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            disabled={!isEditing}
            placeholder="City, State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Summary
          </label>
          <textarea
            value={formData?.summary}
            onChange={(e) => handleInputChange('summary', e?.target?.value)}
            disabled={!isEditing}
            rows={4}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${
              !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
            }`}
            placeholder="Brief description of your professional background and career goals..."
          />
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}

        {/* Unsaved Changes Indicator */}
        {hasUnsavedChanges && !isEditing && (
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm">You have unsaved changes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;