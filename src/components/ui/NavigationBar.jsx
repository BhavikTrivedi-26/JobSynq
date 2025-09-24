import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import MobileMenuToggle from './MobileMenuToggle';
import UserProfileDropdown from './UserProfileDropdown';

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View application overview and statistics'
    },
    {
      label: 'Applications',
      path: '/applications',
      icon: 'FileText',
      tooltip: 'Manage your job applications'
    },
    {
      label: 'Add Application',
      path: '/add-application',
      icon: 'Plus',
      tooltip: 'Add a new job application'
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: 'BarChart3',
      tooltip: 'View performance insights and trends'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-card/95 dark:bg-card/95 backdrop-blur-sm border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/dashboard" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200">
                  JobSynq
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 group ${
                      isActiveRoute(item?.path)
                        ? 'text-primary bg-primary/10 border border-primary/20' 
                        : 'text-muted-foreground hover:text-primary hover:bg-muted'
                    }`}
                    title={item?.tooltip}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={18} 
                      className={`transition-transform duration-200 ${
                        isActiveRoute(item?.path) ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              <UserProfileDropdown />
              <MobileMenuToggle 
                isOpen={isMobileMenuOpen} 
                onToggle={toggleMobileMenu} 
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-[1001] bg-black/50 dark:bg-black/70 md:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Menu Panel */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-card z-[1002] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-semibold text-card-foreground">JobSynq</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md text-muted-foreground hover:text-card-foreground hover:bg-muted transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <div className="flex-1 py-4">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-6 py-4 text-base font-medium transition-all duration-200 ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-primary/10 border-r-2 border-primary' 
                      : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="border-t border-border p-4">
              <Link
                to="/profile-settings"
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-2 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                  isActiveRoute('/profile-settings')
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name="Settings" size={20} />
                <span>Profile Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default NavigationBar;