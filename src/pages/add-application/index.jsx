import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import CompanyInfoSection from './components/CompanyInfoSection';
import SalarySection from './components/SalarySection';
import ApplicationDetailsSection from './components/ApplicationDetailsSection';
import JobDescriptionSection from './components/JobDescriptionSection';
import InterviewSection from './components/InterviewSection';
import DocumentSection from './components/DocumentSection';
import FormActions from './components/FormActions';
import AutoSaveIndicator from './components/AutoSaveIndicator';
import Icon from '../../components/AppIcon';

const AddApplication = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    salaryType: 'annual',
    status: 'applied',
    applicationDate: new Date()?.toISOString()?.split('T')?.[0],
    platforms: [],
    otherPlatform: '',
    jobUrl: '',
    jobDescription: '',
    notes: '',
    interviewDates: [],
    documents: {
      resume: null,
      coverLetter: null
    }
  });

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleAutoSave();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [formData, hasUnsavedChanges]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasUnsavedChanges(true);
    
    // Clear error for this field
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (platformId, checked) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev?.platforms, platformId]
        : prev?.platforms?.filter(p => p !== platformId)
    }));
    setHasUnsavedChanges(true);
  };

  const addInterviewDate = () => {
    setFormData(prev => ({
      ...prev,
      interviewDates: [
        ...prev?.interviewDates,
        { type: '', date: '', time: '' }
      ]
    }));
    setHasUnsavedChanges(true);
  };

  const removeInterviewDate = (index) => {
    setFormData(prev => ({
      ...prev,
      interviewDates: prev?.interviewDates?.filter((_, i) => i !== index)
    }));
    setHasUnsavedChanges(true);
  };

  const handleFileUpload = (type, file) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev?.documents,
        [type]: file
      }
    }));
    setHasUnsavedChanges(true);
  };

  const removeDocument = (type) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev?.documents,
        [type]: null
      }
    }));
    setHasUnsavedChanges(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.company?.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData?.position?.trim()) {
      newErrors.position = 'Position title is required';
    }
    
    if (!formData?.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData?.status) {
      newErrors.status = 'Application status is required';
    }
    
    if (!formData?.applicationDate) {
      newErrors.applicationDate = 'Application date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleAutoSave = async () => {
    if (!hasUnsavedChanges) return;
    
    setIsSaving(true);
    
    // Simulate auto-save API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage as backup
    localStorage.setItem('draft-application', JSON.stringify(formData));
    
    setIsSaving(false);
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to localStorage (mock database)
      const existingApplications = JSON.parse(localStorage.getItem('job-applications') || '[]');
      const newApplication = {
        ...formData,
        id: Date.now()?.toString(),
        createdAt: new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      };
      
      existingApplications?.push(newApplication);
      localStorage.setItem('job-applications', JSON.stringify(existingApplications));
      
      // Clear draft
      localStorage.removeItem('draft-application');
      
      // Show success message (you can implement toast notifications)
      alert('Application saved successfully!');
      
      // Navigate to applications page
      navigate('/applications');
    } catch (error) {
      console.error('Error saving application:', error);
      alert('Error saving application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAndAddAnother = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Save current application
      await handleSave();
      
      // Reset form for new application
      setFormData({
        company: '',
        position: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        salaryType: 'annual',
        status: 'applied',
        applicationDate: new Date()?.toISOString()?.split('T')?.[0],
        platforms: [],
        otherPlatform: '',
        jobUrl: '',
        jobDescription: '',
        notes: '',
        interviewDates: [],
        documents: {
          resume: null,
          coverLetter: null
        }
      });
      
      setHasUnsavedChanges(false);
      setErrors({});
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Error saving application:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page?'
      );
      if (!confirmLeave) return;
    }
    
    // Clear draft
    localStorage.removeItem('draft-application');
    navigate('/applications');
  };

  // Load draft on component mount
  useEffect(() => {
    const draft = localStorage.getItem('draft-application');
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setFormData(parsedDraft);
        setHasUnsavedChanges(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const isValid = formData?.company?.trim() && formData?.position?.trim() && formData?.location && formData?.status && formData?.applicationDate;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Application</h1>
              <p className="text-gray-600">Track your job application details and progress</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Fields marked with * are required
            </div>
            <AutoSaveIndicator lastSaved={lastSaved} isSaving={isSaving} />
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6 pb-20">
          <CompanyInfoSection 
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
          
          <SalarySection 
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
          
          <ApplicationDetailsSection 
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            errors={errors}
          />
          
          <JobDescriptionSection 
            formData={formData}
            handleInputChange={handleInputChange}
          />
          
          <InterviewSection 
            formData={formData}
            handleInputChange={handleInputChange}
            addInterviewDate={addInterviewDate}
            removeInterviewDate={removeInterviewDate}
          />
          
          <DocumentSection 
            formData={formData}
            handleFileUpload={handleFileUpload}
            removeDocument={removeDocument}
          />
        </div>

        {/* Form Actions */}
        <FormActions 
          onSave={handleSave}
          onSaveAndAddAnother={handleSaveAndAddAnother}
          onCancel={handleCancel}
          isLoading={isLoading}
          hasUnsavedChanges={hasUnsavedChanges}
          isValid={isValid}
        />
      </div>
    </div>
  );
};

export default AddApplication;