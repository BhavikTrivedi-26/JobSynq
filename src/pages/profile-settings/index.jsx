import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import ProfileSection from './components/ProfileSection';
import NotificationSettings from './components/NotificationSettings';
import ApplicationPreferences from './components/ApplicationPreferences';
import ThemeSettings from './components/ThemeSettings';
import DataManagement from './components/DataManagement';
import SecuritySettings from './components/SecuritySettings';
import IntegrationSettings from './components/IntegrationSettings';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data for all settings
  const [profileData, setProfileData] = useState({
    fullName: "Bhavik Trivedi",
    email: "BT@example.com",
    phone: "+91 0123456789",
    location: "Surat, GJ",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    summary: `Experienced software engineer with 5+ years in full-stack development. Passionate about creating scalable web applications and leading development teams. Currently seeking senior-level opportunities in fintech and healthcare sectors.`
  });

  const [notificationData, setNotificationData] = useState({
    interviewReminders: true,
    applicationDeadlines: true,
    followUpAlerts: false,
    weeklySummary: true,
    browserNotifications: true,
    desktopNotifications: false,
    productUpdates: true,
    tipsAndResources: true,
    newsletter: false,
    emailFrequency: 'daily',
    reminderTiming: '2'
  });

  const [preferencesData, setPreferencesData] = useState({
    targetIndustries: ['technology', 'finance'],
    preferredJobTypes: ['full-time', 'contract'],
    experienceLevel: 'senior',
    minSalary: '900000',
    maxSalary: '2000000',
    preferredLocations: ['Banglore', 'Mumbai', 'Remote'],
    workMode: ['remote', 'hybrid'],
    autoApplyFilters: true,
    saveSearches: true,
    emailAlerts: true
  });

  const [themeData, setThemeData] = useState({
    theme: 'light',
    autoTheme: false
  });

  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: false,
    lastPasswordChange: '2024-01-15',
    activeSessions: 3
  });

  const [integrationData, setIntegrationData] = useState({
    connections: {
      googleCalendar: true,
      linkedin: false,
      indeed: false,
      glassdoor: true,
      slack: false,
      outlook: false
    },
    syncSettings: {
      frequency: 'daily',
      autoSyncCalendar: true,
      autoSyncApplications: false,
      autoSyncCompanyData: true
    }
  });

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and bio'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Email and push notification preferences'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      description: 'Job search and application settings'
    },
    {
      id: 'theme',
      label: 'Appearance',
      icon: 'Palette',
      description: 'Theme and display options'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password and account security'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Zap',
      description: 'Connected services and API access'
    },
    {
      id: 'data',
      label: 'Data',
      icon: 'Database',
      description: 'Export, import, and backup options'
    }
  ];

  const handleProfileUpdate = (updatedProfile) => {
    setProfileData(updatedProfile);
    setHasUnsavedChanges(false);
    showSuccess();
  };

  const handleNotificationUpdate = (updatedNotifications) => {
    setNotificationData(updatedNotifications);
    showSuccess();
  };

  const handlePreferencesUpdate = (updatedPreferences) => {
    setPreferencesData(updatedPreferences);
    showSuccess();
  };

  const handleThemeUpdate = (updatedTheme) => {
    setThemeData(updatedTheme);
    showSuccess();
  };

  const handleSecurityUpdate = (type, data) => {
    if (type === 'password') {
      setSecurityData(prev => ({
        ...prev,
        lastPasswordChange: new Date()?.toISOString()?.split('T')?.[0]
      }));
    } else if (type === 'twoFactor') {
      setSecurityData(data);
    }
    showSuccess();
  };

  const handleIntegrationUpdate = (action, data) => {
    if (action === 'connect' || action === 'disconnect') {
      setIntegrationData(prev => ({
        ...prev,
        connections: {
          ...prev?.connections,
          [data?.integration?.replace('-', '')]: data?.connected
        }
      }));
    } else if (action === 'syncSettings') {
      setIntegrationData(prev => ({
        ...prev,
        syncSettings: data
      }));
    }
    showSuccess();
  };

  const handleDataAction = (action, data) => {
    if (action === 'export') {
      console.log('Exporting data:', data);
    } else if (action === 'import') {
      console.log('Importing data:', data);
    } else if (action === 'delete') {
      console.log('Deleting all data');
    }
    showSuccess();
  };

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const resetAllSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      // Reset all data to defaults
      setProfileData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        avatar: "",
        summary: ""
      });
      setNotificationData({
        interviewReminders: true,
        applicationDeadlines: true,
        followUpAlerts: false,
        weeklySummary: true,
        browserNotifications: false,
        desktopNotifications: false,
        productUpdates: false,
        tipsAndResources: false,
        newsletter: false,
        emailFrequency: 'daily',
        reminderTiming: '1'
      });
      setPreferencesData({
        targetIndustries: [],
        preferredJobTypes: [],
        experienceLevel: '',
        minSalary: '',
        maxSalary: '',
        preferredLocations: [],
        workMode: [],
        autoApplyFilters: false,
        saveSearches: true,
        emailAlerts: true
      });
      setThemeData({
        theme: 'system',
        autoTheme: false
      });
      showSuccess();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileSection
            profileData={profileData}
            onProfileUpdate={handleProfileUpdate}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            notificationData={notificationData}
            onNotificationUpdate={handleNotificationUpdate}
          />
        );
      case 'preferences':
        return (
          <ApplicationPreferences
            preferencesData={preferencesData}
            onPreferencesUpdate={handlePreferencesUpdate}
          />
        );
      case 'theme':
        return (
          <ThemeSettings
            themeData={themeData}
            onThemeUpdate={handleThemeUpdate}
          />
        );
      case 'security':
        return (
          <SecuritySettings
            securityData={securityData}
            onSecurityUpdate={handleSecurityUpdate}
          />
        );
      case 'integrations':
        return (
          <IntegrationSettings
            integrationData={integrationData}
            onIntegrationUpdate={handleIntegrationUpdate}
          />
        );
      case 'data':
        return (
          <DataManagement
            onDataAction={handleDataAction}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // Set page title
    document.title = 'Profile Settings - Huntly';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2">
                Manage your account preferences and application settings
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={resetAllSettings}
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Settings Navigation - Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab?.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    <Icon 
                      name={tab?.icon} 
                      size={20} 
                      className={activeTab === tab?.id ? 'text-white' : 'text-gray-500'}
                    />
                    <div>
                      <p className="font-medium">{tab?.label}</p>
                      <p className={`text-sm ${
                        activeTab === tab?.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {tab?.description}
                      </p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Navigation - Mobile Tabs */}
          <div className="lg:hidden">
            <div className="bg-white rounded-lg border border-gray-200 p-2 mb-6">
              <div className="flex overflow-x-auto space-x-2">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab?.id
                        ? 'bg-primary text-white' :'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 min-w-0">
            {renderTabContent()}
          </div>
        </div>
      </div>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slideIn">
          <Icon name="CheckCircle" size={20} />
          <span>Settings saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;