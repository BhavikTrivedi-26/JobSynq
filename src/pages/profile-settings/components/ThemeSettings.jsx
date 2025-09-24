import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ThemeSettings = ({ themeData: propThemeData, onThemeUpdate: propOnThemeUpdate }) => {
  // Use internal state if props are not provided
  const [internalThemeData, setInternalThemeData] = useState(() => {
    const savedTheme = localStorage.getItem('jobsynq-theme');
    return {
      theme: savedTheme || 'light',
      autoTheme: false,
      lastChanged: new Date().toISOString()
    };
  });

  const themeData = propThemeData || internalThemeData;
  const onThemeUpdate = propOnThemeUpdate || ((data) => {
    setInternalThemeData(data);
    localStorage.setItem('jobsynq-theme', data.theme);
  });

  const [currentTheme, setCurrentTheme] = useState(themeData?.theme || 'light');
  const [autoTheme, setAutoTheme] = useState(themeData?.autoTheme || false);
  const [previewMode, setPreviewMode] = useState(false);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright interface',
      icon: 'Sun',
      preview: {
        bg: 'bg-white',
        text: 'text-gray-900',
        accent: 'bg-blue-500'
      }
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes in low light',
      icon: 'Moon',
      preview: {
        bg: 'bg-gray-900',
        text: 'text-white',
        accent: 'bg-blue-400'
      }
    },
    {
      id: 'system',
      name: 'System Default',
      description: 'Matches your device settings',
      icon: 'Monitor',
      preview: {
        bg: 'bg-gradient-to-br from-white to-gray-900',
        text: 'text-gray-700',
        accent: 'bg-blue-500'
      }
    }
  ];

  const applyTheme = (theme) => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('light', 'dark');
    
    if (theme === 'dark') {
      root.classList.add('dark');
      // Update CSS variables for dark mode - with better colors for aesthetics
      root.style.setProperty('--color-background', '#0F172A'); // Slate 900
      root.style.setProperty('--color-foreground', '#E2E8F0'); // Slate 200
      root.style.setProperty('--color-border', '#334155'); // Slate 700
      root.style.setProperty('--color-input', '#1E293B'); // Slate 800
      root.style.setProperty('--color-ring', '#60A5FA'); // Blue 400
      root.style.setProperty('--color-card', '#1E293B'); // Slate 800
      root.style.setProperty('--color-card-foreground', '#E2E8F0'); // Slate 200
      root.style.setProperty('--color-popover', '#1E293B'); // Slate 800
      root.style.setProperty('--color-popover-foreground', '#E2E8F0'); // Slate 200
      root.style.setProperty('--color-muted', '#334155'); // Slate 700
      root.style.setProperty('--color-muted-foreground', '#94A3B8'); // Slate 400
      root.style.setProperty('--color-primary', '#60A5FA'); // Blue 400
      root.style.setProperty('--color-primary-foreground', '#0F172A'); // Slate 900
      root.style.setProperty('--color-secondary', '#A78BFA'); // Violet 400
      root.style.setProperty('--color-secondary-foreground', '#0F172A'); // Slate 900
      root.style.setProperty('--color-accent', '#34D399'); // Emerald 400
      root.style.setProperty('--color-accent-foreground', '#0F172A'); // Slate 900
      root.style.setProperty('--color-destructive', '#F87171'); // Red 400
      root.style.setProperty('--color-destructive-foreground', '#0F172A'); // Slate 900
      root.style.setProperty('--color-success', '#10B981'); // Emerald 500
      root.style.setProperty('--color-success-foreground', '#FFFFFF'); // White
      root.style.setProperty('--color-warning', '#FBBF24'); // Amber 400
      root.style.setProperty('--color-warning-foreground', '#0F172A'); // Slate 900
      root.style.setProperty('--color-error', '#EF4444'); // Red 500
      root.style.setProperty('--color-error-foreground', '#FFFFFF'); // White
    } else if (theme === 'light') {
      root.classList.add('light');
      // Reset to light mode colors
      root.style.setProperty('--color-background', '#FAFBFC'); // Gray 50
      root.style.setProperty('--color-foreground', '#1F2937'); // Gray 800
      root.style.setProperty('--color-border', '#E5E7EB'); // Gray 200
      root.style.setProperty('--color-input', '#FFFFFF'); // White
      root.style.setProperty('--color-ring', '#3B82F6'); // Blue 500
      root.style.setProperty('--color-card', '#FFFFFF'); // White
      root.style.setProperty('--color-card-foreground', '#1F2937'); // Gray 800
      root.style.setProperty('--color-popover', '#FFFFFF'); // White
      root.style.setProperty('--color-popover-foreground', '#1F2937'); // Gray 800
      root.style.setProperty('--color-muted', '#F3F4F6'); // Gray 100
      root.style.setProperty('--color-muted-foreground', '#6B7280'); // Gray 500
      root.style.setProperty('--color-primary', '#3B82F6'); // Blue 500
      root.style.setProperty('--color-primary-foreground', '#FFFFFF'); // White
      root.style.setProperty('--color-secondary', '#8B5CF6'); // Violet 500
      root.style.setProperty('--color-secondary-foreground', '#FFFFFF'); // White
      root.style.setProperty('--color-accent', '#10B981'); // Emerald 500
      root.style.setProperty('--color-accent-foreground', '#FFFFFF'); // White
      root.style.setProperty('--color-destructive', '#DC2626'); // Red 600
      root.style.setProperty('--color-destructive-foreground', '#FFFFFF'); // White
      root.style.setProperty('--color-success', '#059669'); // Emerald 600
      root.style.setProperty('--color-success-foreground', '#FFFFFF'); // White
      root.style.setProperty('--color-warning', '#D97706'); // Amber 600
      root.style.setProperty('--color-warning-foreground', '#FFFFFF'); // White
      root.style.setProperty('--color-error', '#DC2626'); // Red 600
      root.style.setProperty('--color-error-foreground', '#FFFFFF'); // White
    } else if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
      return;
    }
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    const updatedThemeData = {
      ...themeData,
      theme: themeId,
      lastChanged: new Date().toISOString()
    };
    onThemeUpdate(updatedThemeData);
    
    // Store in localStorage
    localStorage.setItem('jobsynq-theme', themeId);
    
    // Apply theme immediately
    applyTheme(themeId);
  };

  const handleAutoThemeChange = (checked) => {
    setAutoTheme(checked);
    const updatedThemeData = {
      ...themeData,
      autoTheme: checked,
      lastChanged: new Date().toISOString()
    };
    onThemeUpdate(updatedThemeData);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  // Apply saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('jobsynq-theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('light');
    }
  }, []);

  // Auto theme functionality
  useEffect(() => {
    if (autoTheme) {
      const checkTime = () => {
        const hour = new Date().getHours();
        const shouldBeDark = hour >= 18 || hour < 6;
        const newTheme = shouldBeDark ? 'dark' : 'light';
        
        if (currentTheme !== newTheme && currentTheme !== 'system') {
          handleThemeChange(newTheme);
        }
      };

      checkTime();
      const interval = setInterval(checkTime, 60000);
      return () => clearInterval(interval);
    }
  }, [autoTheme, currentTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (currentTheme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery?.addEventListener('change', handleChange);
    return () => mediaQuery?.removeEventListener('change', handleChange);
  }, [currentTheme]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Palette" size={24} className="text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Theme & Appearance</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName={previewMode ? "EyeOff" : "Eye"}
          iconPosition="left"
          onClick={togglePreview}
        >
          {previewMode ? 'Exit Preview' : 'Preview Mode'}
        </Button>
      </div>
      <div className="space-y-8">
        {/* Theme Selection */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Choose Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes?.map((theme) => (
              <div
                key={theme?.id}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  currentTheme === theme?.id
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => handleThemeChange(theme?.id)}
              >
                {/* Theme Preview */}
                <div className={`w-full h-20 rounded-md mb-3 ${theme?.preview?.bg} border border-gray-200 dark:border-gray-700 relative overflow-hidden`}>
                  <div className={`absolute top-2 left-2 w-3 h-3 rounded-full ${theme?.preview?.accent}`} />
                  <div className={`absolute top-2 right-2 w-8 h-1 rounded ${theme?.preview?.text} opacity-60`} />
                  <div className={`absolute bottom-2 left-2 w-12 h-1 rounded ${theme?.preview?.text} opacity-40`} />
                  <div className={`absolute bottom-2 right-2 w-6 h-1 rounded ${theme?.preview?.text} opacity-40`} />
                </div>

                <div className="flex items-center space-x-3">
                  <Icon name={theme?.icon} size={20} className="text-gray-600 dark:text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{theme?.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{theme?.description}</p>
                  </div>
                </div>

                {/* Selected Indicator */}
                {currentTheme === theme?.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Auto Theme Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Automatic Theme</h3>
          <div className="space-y-4">
            <Checkbox
              label="Auto-switch based on time"
              description="Automatically switch to dark mode during evening hours (6 PM - 6 AM)"
              checked={autoTheme}
              onChange={(e) => handleAutoThemeChange(e?.target?.checked)}
            />
          </div>
        </div>

        {/* Theme Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Theme Preferences</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your theme preference is saved and will be applied across all your sessions. 
                System theme will automatically adjust based on your device's appearance settings.
              </p>
            </div>
          </div>
        </div>

        {/* Current Theme Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon 
              name={themes?.find(t => t?.id === currentTheme)?.icon || 'Monitor'} 
              size={20} 
              className="text-gray-600 dark:text-gray-400" 
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Current Theme</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {themes?.find(t => t?.id === currentTheme)?.name || 'System Default'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Last changed</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(themeData.lastChanged).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Preview Mode Indicator */}
        {previewMode && (
          <div className="fixed top-20 right-4 z-50 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/30 rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-800 dark:text-amber-200">Preview Mode Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSettings;