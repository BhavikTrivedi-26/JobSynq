import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  application, 
  isBulk = false, 
  bulkCount = 0 
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isBulk ? 'Delete Applications' : 'Delete Application'}
            </h3>
            <p className="text-sm text-gray-600">This action cannot be undone</p>
          </div>
        </div>

        <div className="mb-6">
          {isBulk ? (
            <p className="text-gray-700">
              Are you sure you want to delete {bulkCount} selected application{bulkCount !== 1 ? 's' : ''}? 
              This will permanently remove {bulkCount !== 1 ? 'them' : 'it'} from your records.
            </p>
          ) : (
            <div>
              <p className="text-gray-700 mb-3">
                Are you sure you want to delete this application? This will permanently remove it from your records.
              </p>
              {application && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{application?.company}</div>
                    <div className="text-gray-600">{application?.position}</div>
                    <div className="text-gray-500">Applied on {new Date(application.applicationDate)?.toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            iconName="Trash2"
            iconPosition="left"
          >
            {isBulk ? `Delete ${bulkCount} Applications` : 'Delete Application'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;