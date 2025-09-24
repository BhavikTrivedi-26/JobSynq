import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  onSave, 
  onSaveAndAddAnother, 
  onCancel, 
  isLoading, 
  hasUnsavedChanges,
  isValid 
}) => {
  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4 sticky bottom-0 z-10">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          {hasUnsavedChanges && (
            <>
              <Icon name="AlertCircle" size={16} className="text-amber-500" />
              <span>You have unsaved changes</span>
            </>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          
          <Button
            variant="outline"
            onClick={onSaveAndAddAnother}
            disabled={isLoading || !isValid}
            loading={isLoading}
            iconName="Plus"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Save & Add Another
          </Button>
          
          <Button
            variant="default"
            onClick={onSave}
            disabled={isLoading || !isValid}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Save Application
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormActions;