import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const IntegrationSettings = ({ integrationData, onIntegrationUpdate }) => {
  const [connections, setConnections] = useState(integrationData?.connections);
  const [syncSettings, setSyncSettings] = useState(integrationData?.syncSettings);
  const [isConnecting, setIsConnecting] = useState({});

  const availableIntegrations = [
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync interview schedules with your Google Calendar',
      icon: 'Calendar',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      connected: connections?.googleCalendar,
      features: ['Interview scheduling', 'Reminder notifications', 'Calendar blocking']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Import job applications from LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      connected: connections?.linkedin,
      features: ['Job import', 'Profile sync', 'Application tracking']
    },
    {
      id: 'indeed',
      name: 'Indeed',
      description: 'Track applications submitted through Indeed',
      icon: 'Briefcase',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      connected: connections?.indeed,
      features: ['Application import', 'Job alerts', 'Status updates']
    },
    {
      id: 'glassdoor',
      name: 'Glassdoor',
      description: 'Get company insights and salary data',
      icon: 'Building',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      connected: connections?.glassdoor,
      features: ['Company reviews', 'Salary insights', 'Interview tips']
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications in your Slack workspace',
      icon: 'MessageSquare',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      connected: connections?.slack,
      features: ['Interview reminders', 'Application updates', 'Team notifications']
    },
    {
      id: 'naukri',
      name: 'Naukri.com',
      description: 'India\'s leading job portal for professionals',
      icon: 'Globe',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      connected: connections?.naukri,
      features: ['Application import', 'Job recommendations', 'Profile visibility']
    }
  ];

  const syncFrequencyOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: 'hourly', label: 'Every hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'manual', label: 'Manual only' }
  ];

  const handleConnect = async (integrationId) => {
    setIsConnecting(prev => ({ ...prev, [integrationId]: true }));
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedConnections = {
      ...connections,
      [integrationId?.replace('-', '')]: true
    };
    
    setConnections(updatedConnections);
    setIsConnecting(prev => ({ ...prev, [integrationId]: false }));
    
    onIntegrationUpdate('connect', { integration: integrationId, connected: true });
  };

  const handleDisconnect = async (integrationId) => {
    const updatedConnections = {
      ...connections,
      [integrationId?.replace('-', '')]: false
    };
    
    setConnections(updatedConnections);
    onIntegrationUpdate('disconnect', { integration: integrationId, connected: false });
  };

  const handleSyncSettingChange = (setting, value) => {
    const updatedSettings = {
      ...syncSettings,
      [setting]: value
    };
    setSyncSettings(updatedSettings);
    onIntegrationUpdate('syncSettings', updatedSettings);
  };

  const getConnectionCount = () => {
    return Object.values(connections)?.filter(Boolean)?.length;
  };

  return (
    <div className="space-y-8">
      {/* Integration Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Zap" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">Integrations</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Connected Services</p>
            <p className="text-2xl font-bold text-primary">{getConnectionCount()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableIntegrations?.map((integration) => (
            <div key={integration?.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${integration?.bgColor} flex items-center justify-center`}>
                  <Icon name={integration?.icon} size={20} className={integration?.color} />
                </div>
                <div className="flex items-center space-x-2">
                  {integration?.connected && (
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                  )}
                  <div className={`w-2 h-2 rounded-full ${
                    integration?.connected ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                </div>
              </div>

              <h3 className="font-medium text-gray-900 mb-1">{integration?.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{integration?.description}</p>

              <div className="space-y-2 mb-4">
                {integration?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-green-600" />
                    <span className="text-xs text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {integration?.connected ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Icon name="CheckCircle" size={16} />
                    <span>Connected</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => handleDisconnect(integration?.id)}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  loading={isConnecting?.[integration?.id]}
                  onClick={() => handleConnect(integration?.id)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  {isConnecting?.[integration?.id] ? 'Connecting...' : 'Connect'}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Sync Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="RefreshCw" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Sync Settings</h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Sync Frequency"
              description="How often to sync data with connected services"
              options={syncFrequencyOptions}
              value={syncSettings?.frequency}
              onChange={(value) => handleSyncSettingChange('frequency', value)}
            />

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Auto-sync Options
              </label>
              <div className="space-y-3">
                <Checkbox
                  label="Calendar Events"
                  description="Automatically sync interview schedules"
                  checked={syncSettings?.autoSyncCalendar}
                  onChange={(e) => handleSyncSettingChange('autoSyncCalendar', e?.target?.checked)}
                />
                <Checkbox
                  label="Job Applications"
                  description="Import new applications automatically"
                  checked={syncSettings?.autoSyncApplications}
                  onChange={(e) => handleSyncSettingChange('autoSyncApplications', e?.target?.checked)}
                />
                <Checkbox
                  label="Company Data"
                  description="Update company information and insights"
                  checked={syncSettings?.autoSyncCompanyData}
                  onChange={(e) => handleSyncSettingChange('autoSyncCompanyData', e?.target?.checked)}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Last Sync</p>
                <p className="text-sm text-gray-500">January 22, 2024 at 2:30 PM</p>
              </div>
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
              >
                Sync Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* API Access */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Code" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">API Access</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">Personal Access Token</h4>
                <p className="text-sm text-gray-600">Use this token to access your data via API</p>
              </div>
              <Button variant="outline" size="sm">
                Generate Token
              </Button>
            </div>
            <div className="bg-white border border-gray-200 rounded p-3 font-mono text-sm text-gray-500">
              ••••••••••••••••••••••••••••••••
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">API Documentation</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Learn how to integrate JobSynq with your own tools and workflows using our REST API.
                </p>
                <Button variant="outline" size="sm">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Webhook Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Webhook" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Webhooks</h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Configure webhooks to receive real-time notifications when events occur in your account.
          </p>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Application Status Updates</h4>
                <p className="text-sm text-gray-600">https://your-app.com/webhooks/status</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>
          </div>

          <Button variant="outline" iconName="Plus" iconPosition="left">
            Add Webhook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;