import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InterviewSection = ({ formData, handleInputChange, addInterviewDate, removeInterviewDate }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Interview Dates</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={addInterviewDate}
          iconName="Plus"
          iconPosition="left"
        >
          Add Date
        </Button>
      </div>
      {formData?.interviewDates?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Icon name="Calendar" size={48} className="mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No interview dates scheduled yet</p>
          <p className="text-xs mt-1">Click "Add Date" to schedule interviews</p>
        </div>
      ) : (
        <div className="space-y-4">
          {formData?.interviewDates?.map((interview, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Interview Type"
                  type="text"
                  value={interview?.type}
                  onChange={(e) => {
                    const updatedDates = [...formData?.interviewDates];
                    updatedDates[index].type = e?.target?.value;
                    handleInputChange({ target: { name: 'interviewDates', value: updatedDates } });
                  }}
                  placeholder="e.g., Phone Screen, Technical"
                />
                
                <Input
                  label="Date"
                  type="date"
                  value={interview?.date}
                  onChange={(e) => {
                    const updatedDates = [...formData?.interviewDates];
                    updatedDates[index].date = e?.target?.value;
                    handleInputChange({ target: { name: 'interviewDates', value: updatedDates } });
                  }}
                />
                
                <Input
                  label="Time"
                  type="time"
                  value={interview?.time}
                  onChange={(e) => {
                    const updatedDates = [...formData?.interviewDates];
                    updatedDates[index].time = e?.target?.value;
                    handleInputChange({ target: { name: 'interviewDates', value: updatedDates } });
                  }}
                />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeInterviewDate(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewSection;