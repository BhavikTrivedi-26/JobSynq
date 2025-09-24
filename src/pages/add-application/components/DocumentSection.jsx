import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DocumentSection = ({ formData, handleFileUpload, removeDocument }) => {
  const allowedFileTypes = ['.pdf', '.doc', '.docx'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleFileChange = (e, type) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (file?.size > maxFileSize) {
      alert('File size must be less than 5MB');
      return;
    }

    const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
    if (!allowedFileTypes?.includes(fileExtension)) {
      alert('Only PDF, DOC, and DOCX files are allowed');
      return;
    }

    handleFileUpload(type, file);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const DocumentUpload = ({ type, title, description, file }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors">
      <div className="text-center">
        {file ? (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
              <Icon name="FileText" size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{file?.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(file?.size)}</p>
            </div>
            <div className="flex justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(`${type}-upload`)?.click()}
              >
                Replace
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeDocument(type)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
              <Icon name="Upload" size={24} className="text-gray-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{title}</h3>
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById(`${type}-upload`)?.click()}
            >
              Choose File
            </Button>
          </div>
        )}
        
        <input
          id={`${type}-upload`}
          type="file"
          accept={allowedFileTypes?.join(',')}
          onChange={(e) => handleFileChange(e, type)}
          className="hidden"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentUpload
          type="resume"
          title="Resume"
          description="Upload your resume (PDF, DOC, DOCX - Max 5MB)"
          file={formData?.documents?.resume}
        />
        
        <DocumentUpload
          type="coverLetter"
          title="Cover Letter"
          description="Upload your cover letter (PDF, DOC, DOCX - Max 5MB)"
          file={formData?.documents?.coverLetter}
        />
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Document Tips:</p>
            <ul className="mt-1 list-disc list-inside space-y-1 text-xs">
              <li>Tailor your resume and cover letter for each application</li>
              <li>Use PDF format for best compatibility</li>
              <li>Keep file names professional (e.g., "Bhavik_Trivedi_Resume.pdf")</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentSection;