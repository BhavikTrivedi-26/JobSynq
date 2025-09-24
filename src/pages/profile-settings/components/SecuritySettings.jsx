import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

// Add this function for handling authentication
const signOutSession = async (sessionId) => {
  // In a real app, this would call your API
  try {
    // Simulating an API call to sign out a specific session
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  } catch (error) {
    console.error('Error signing out session:', error);
    return { success: false, error };
  }
};

// Add this function for signing out all other sessions
const signOutAllOtherSessions = async () => {
  // In a real app, this would call your API
  try {
    // Simulating an API call to sign out all other sessions
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true };
  } catch (error) {
    console.error('Error signing out all sessions:', error);
    return { success: false, error };
  }
};

const SecuritySettings = ({ securityData, onSecurityUpdate }) => {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securityData?.twoFactorEnabled);
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro',
      location: 'New York, NY',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 13',
      location: 'New York, NY',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'Chrome Browser',
      location: 'San Francisco, CA',
      lastActive: '2 days ago',
      current: false
    }
  ]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[a-z]/?.test(password)) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return 'bg-red-500';
    if (strength < 50) return 'bg-orange-500';
    if (strength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const handlePasswordChange = (field, value) => {
    const updatedData = {
      ...passwordData,
      [field]: value
    };
    setPasswordData(updatedData);

    if (field === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear errors when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (passwordData?.currentPassword === passwordData?.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordSubmit = async () => {
    if (!validatePasswordForm()) return;

    setIsChangingPassword(true);
    
    // Simulate password change
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordStrength(0);
    setIsChangingPassword(false);
    
    onSecurityUpdate('password', { success: true });
  };

  const handleTwoFactorToggle = async (enabled) => {
    setTwoFactorEnabled(enabled);
    
    // Simulate 2FA setup/disable
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedSecurityData = {
      ...securityData,
      twoFactorEnabled: enabled
    };
    onSecurityUpdate('twoFactor', updatedSecurityData);
  };

  // New function to handle signing out an individual session
  const handleSignOutSession = async (sessionId) => {
    try {
      setIsLoading(true);
      const result = await signOutSession(sessionId);
      
      if (result.success) {
        // Update local state to remove the session
        setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
        // Show success toast or notification
      }
    } catch (error) {
      console.error('Error signing out session:', error);
      // Show error toast or notification
    } finally {
      setIsLoading(false);
    }
  };

  // New function to handle signing out all other sessions
  const handleSignOutAllOtherSessions = async () => {
    try {
      setIsLoading(true);
      
      // Show confirmation dialog before proceeding
      if (window.confirm('Are you sure you want to sign out of all other devices? This will end all other active sessions immediately.')) {
        const result = await signOutAllOtherSessions();
        
        if (result.success) {
          // Keep only the current session
          setActiveSessions(prev => prev.filter(session => session.current));
          // Show success toast or notification
        }
      }
    } catch (error) {
      console.error('Error signing out all sessions:', error);
      // Show error toast or notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Password Change */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Lock" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Change Password</h2>
        </div>

        <div className="space-y-4">
          <Input
            label="Current Password"
            type={showPasswords ? "text" : "password"}
            value={passwordData?.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
            error={errors?.currentPassword}
            required
          />

          <Input
            label="New Password"
            type={showPasswords ? "text" : "password"}
            value={passwordData?.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
            error={errors?.newPassword}
            required
          />

          {passwordData?.newPassword && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Password Strength</span>
                <span className={`font-medium ${
                  passwordStrength < 50 ? 'text-red-600 dark:text-red-400' : 
                  passwordStrength < 75 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
                }`}>
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
            </div>
          )}

          <Input
            label="Confirm New Password"
            type={showPasswords ? "text" : "password"}
            value={passwordData?.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />

          <Checkbox
            label="Show passwords"
            checked={showPasswords}
            onChange={(e) => setShowPasswords(e?.target?.checked)}
          />

          <div className="flex space-x-3 pt-4">
            <Button
              variant="default"
              onClick={handlePasswordSubmit}
              loading={isChangingPassword}
              iconName="Save"
              iconPosition="left"
              disabled={!passwordData?.currentPassword || !passwordData?.newPassword || !passwordData?.confirmPassword}
            >
              {isChangingPassword ? 'Changing Password...' : 'Change Password'}
            </Button>
          </div>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Shield" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={twoFactorEnabled ? "ShieldCheck" : "Shield"} 
                size={20} 
                className={twoFactorEnabled ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"} 
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {twoFactorEnabled 
                    ? 'Your account is protected with 2FA' :'Add an extra layer of security to your account'
                  }
                </p>
              </div>
            </div>
            <Button
              variant={twoFactorEnabled ? "destructive" : "default"}
              size="sm"
              onClick={() => handleTwoFactorToggle(!twoFactorEnabled)}
              iconName={twoFactorEnabled ? "ShieldOff" : "ShieldCheck"}
              iconPosition="left"
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'}
            </Button>
          </div>

          {twoFactorEnabled && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} className="text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-300 mb-1">2FA is Active</h4>
                  <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                    Your account is protected with authenticator app-based two-factor authentication.
                  </p>
                  <Button variant="outline" size="sm">
                    View Recovery Codes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Active Sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Monitor" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Sessions</h2>
        </div>

        <div className="space-y-4">
          {activeSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={session?.device?.includes('iPhone') ? "Smartphone" : "Monitor"} 
                  size={20} 
                  className="text-gray-600 dark:text-gray-400" 
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900 dark:text-white">{session?.device}</p>
                    {session?.current && (
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{session?.location}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Last active: {session?.lastActive}</p>
                </div>
              </div>
              {!session?.current && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="LogOut"
                  iconPosition="left"
                  onClick={() => handleSignOutSession(session.id)}
                  loading={isLoading}
                >
                  Sign Out
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="destructive"
            iconName="LogOut"
            iconPosition="left"
            onClick={handleSignOutAllOtherSessions}
            loading={isLoading}
            disabled={activeSessions.filter(s => !s.current).length === 0}
          >
            Sign Out All Other Sessions
          </Button>
        </div>
      </div>
      {/* Security Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Security Recommendations</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use a unique, strong password for your account</li>
              <li>• Enable two-factor authentication for added security</li>
              <li>• Regularly review your active sessions</li>
              <li>• Keep your recovery codes in a safe place</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;