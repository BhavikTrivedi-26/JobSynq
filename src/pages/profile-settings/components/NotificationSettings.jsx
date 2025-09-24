import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationSettings = ({ notificationData, onNotificationUpdate }) => {
  const [settings, setSettings] = useState(notificationData);
  const [showPreview, setShowPreview] = useState(false);

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Summary' },
    { value: 'never', label: 'Never' }
  ];

  const reminderTimeOptions = [
    { value: '1', label: '1 day before' },
    { value: '2', label: '2 days before' },
    { value: '3', label: '3 days before' },
    { value: '7', label: '1 week before' }
  ];

  const handleCheckboxChange = (field, checked) => {
    const updatedSettings = {
      ...settings,
      [field]: checked
    };
    setSettings(updatedSettings);
    onNotificationUpdate(updatedSettings);
  };

  const handleSelectChange = (field, value) => {
    const updatedSettings = {
      ...settings,
      [field]: value
    };
    setSettings(updatedSettings);
    onNotificationUpdate(updatedSettings);
  };

  const previewNotification = () => {
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={previewNotification}
        >
          Preview
        </Button>
      </div>
      <div className="space-y-8">
        {/* Email Notifications */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <Checkbox
              label="Interview Reminders"
              description="Get notified about upcoming interviews"
              checked={settings?.interviewReminders}
              onChange={(e) => handleCheckboxChange('interviewReminders', e?.target?.checked)}
            />
            
            <Checkbox
              label="Application Deadlines"
              description="Reminders for application closing dates"
              checked={settings?.applicationDeadlines}
              onChange={(e) => handleCheckboxChange('applicationDeadlines', e?.target?.checked)}
            />
            
            <Checkbox
              label="Follow-up Alerts"
              description="Reminders to follow up on applications"
              checked={settings?.followUpAlerts}
              onChange={(e) => handleCheckboxChange('followUpAlerts', e?.target?.checked)}
            />
            
            <Checkbox
              label="Weekly Summary"
              description="Weekly report of your application activity"
              checked={settings?.weeklySummary}
              onChange={(e) => handleCheckboxChange('weeklySummary', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Notification Frequency */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Frequency</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Email Frequency"
              options={frequencyOptions}
              value={settings?.emailFrequency}
              onChange={(value) => handleSelectChange('emailFrequency', value)}
            />
            
            <Select
              label="Reminder Timing"
              options={reminderTimeOptions}
              value={settings?.reminderTiming}
              onChange={(value) => handleSelectChange('reminderTiming', value)}
            />
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
          <div className="space-y-4">
            <Checkbox
              label="Browser Notifications"
              description="Show notifications in your browser"
              checked={settings?.browserNotifications}
              onChange={(e) => handleCheckboxChange('browserNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="Desktop Notifications"
              description="Show desktop notifications when app is closed"
              checked={settings?.desktopNotifications}
              onChange={(e) => handleCheckboxChange('desktopNotifications', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Marketing Communications */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Marketing Communications</h3>
          <div className="space-y-4">
            <Checkbox
              label="Product Updates"
              description="Get notified about new features and improvements"
              checked={settings?.productUpdates}
              onChange={(e) => handleCheckboxChange('productUpdates', e?.target?.checked)}
            />
            
            <Checkbox
              label="Tips & Resources"
              description="Receive job search tips and career advice"
              checked={settings?.tipsAndResources}
              onChange={(e) => handleCheckboxChange('tipsAndResources', e?.target?.checked)}
            />
            
            <Checkbox
              label="Newsletter"
              description="Monthly newsletter with industry insights"
              checked={settings?.newsletter}
              onChange={(e) => handleCheckboxChange('newsletter', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Preview Notification */}
      {showPreview && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm animate-slideIn">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Bell" size={16} color="white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Interview Reminder</h4>
              <p className="text-sm text-gray-600 mt-1">
                You have an interview with TechCorp tomorrow at 2:00 PM
              </p>
              <p className="text-xs text-gray-400 mt-2">Preview notification</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;