import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const DataManagement = ({ onDataAction }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportOptions, setExportOptions] = useState({
    applications: true,
    interviews: true,
    notes: false,
    analytics: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated Values)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON (Raw Data)' }
  ];

  const handleExportOptionChange = (option, checked) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock export data
    const exportData = {
      applications: [
        {
          id: 1,
          company: "TechCorp Inc.",
          position: "Senior Frontend Developer",
          status: "Interview",
          appliedDate: "2024-01-15",
          salary: "₹95,0000 - ₹120,0000"
        },
        {
          id: 2,
          company: "StartupXYZ",
          position: "Full Stack Developer",
          status: "Applied",
          appliedDate: "2024-01-18",
          salary: "₹800,000 - ₹1000,000"
        }
      ],
      exportDate: new Date()?.toISOString(),
      format: exportFormat
    };

    // Create and download file
    const dataStr = exportFormat === 'json' 
      ? JSON.stringify(exportData, null, 2)
      : convertToCSV(exportData?.applications);
    
    const dataBlob = new Blob([dataStr], { type: exportFormat === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `huntly-export-${new Date()?.toISOString()?.split('T')?.[0]}.${exportFormat}`;
    link?.click();
    
    setIsExporting(false);
    onDataAction('export', { format: exportFormat, options: exportOptions });
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data?.[0])?.join(',');
    const rows = data?.map(row => Object.values(row)?.join(','));
    return [headers, ...rows]?.join('\n');
  };

  const handleImport = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    setIsImporting(true);
    
    // Simulate import process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsImporting(false);
    onDataAction('import', { fileName: file?.name, size: file?.size });
    
    // Reset file input
    event.target.value = '';
  };

  const handleDeleteAllData = () => {
    onDataAction('delete', {});
    setShowDeleteConfirm(false);
  };

  const getDataSize = () => {
    // Mock data size calculation
    return "2.4 MB";
  };

  const getLastBackup = () => {
    return "January 20, 2024";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Database" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
      </div>
      <div className="space-y-8">
        {/* Data Overview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Your Data Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-gray-600">Applications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-gray-600">Interviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{getDataSize()}</p>
              <p className="text-gray-600">Total Size</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{getLastBackup()}</p>
              <p className="text-gray-600">Last Backup</p>
            </div>
          </div>
        </div>

        {/* Export Data */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Export Your Data</h3>
          <div className="space-y-4">
            <Select
              label="Export Format"
              description="Choose the format for your exported data"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What to Export
              </label>
              <div className="space-y-2">
                <Checkbox
                  label="Job Applications"
                  description="All your job applications and their details"
                  checked={exportOptions?.applications}
                  onChange={(e) => handleExportOptionChange('applications', e?.target?.checked)}
                />
                <Checkbox
                  label="Interview Records"
                  description="Interview schedules and notes"
                  checked={exportOptions?.interviews}
                  onChange={(e) => handleExportOptionChange('interviews', e?.target?.checked)}
                />
                <Checkbox
                  label="Personal Notes"
                  description="Your private notes and comments"
                  checked={exportOptions?.notes}
                  onChange={(e) => handleExportOptionChange('notes', e?.target?.checked)}
                />
                <Checkbox
                  label="Analytics Data"
                  description="Your application statistics and trends"
                  checked={exportOptions?.analytics}
                  onChange={(e) => handleExportOptionChange('analytics', e?.target?.checked)}
                />
              </div>
            </div>

            <Button
              variant="default"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              disabled={!Object.values(exportOptions)?.some(Boolean)}
            >
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>
        </div>

        {/* Import Data */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Import Data</h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
              <Icon name="Upload" size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop your backup file here, or click to browse
              </p>
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleImport}
                className="hidden"
                id="import-file"
                disabled={isImporting}
              />
              <label htmlFor="import-file">
                <Button
                  variant="outline"
                  loading={isImporting}
                  iconName="FolderOpen"
                  iconPosition="left"
                  asChild
                >
                  {isImporting ? 'Importing...' : 'Choose File'}
                </Button>
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Supported formats: CSV, JSON. Maximum file size: 10MB
            </p>
          </div>
        </div>

        {/* Backup Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Automatic Backup</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Auto-backup Enabled</p>
                  <p className="text-sm text-green-700">Your data is automatically backed up weekly</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-900 mb-1">Delete All Data</h4>
                <p className="text-sm text-red-700 mb-4">
                  This will permanently delete all your applications, interviews, notes, and settings. 
                  This action cannot be undone.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete All Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Data Deletion</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you absolutely sure you want to delete all your data? This action cannot be undone 
              and you will lose all your applications, interviews, and settings permanently.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAllData}
                fullWidth
              >
                Yes, Delete Everything
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement;