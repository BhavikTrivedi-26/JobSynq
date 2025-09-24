import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import StatsCard from './components/StatsCard';
import ActivityTimeline from './components/ActivityTimeline';
import QuickActions from './components/QuickActions';
import ApplicationChart from './components/ApplicationChart';
import UpcomingInterviews from './components/UpcomingInterviews';
import RemindersPanel from './components/RemindersPanel';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const statsData = [
    {
      title: 'Total Applications',
      value: '90',
      change: '+12%',
      changeType: 'increase',
      icon: 'FileText',
      color: 'blue',
      description: 'Applications submitted this month'
    },
    {
      title: 'Interviews Scheduled',
      value: '15',
      change: '+8%',
      changeType: 'increase',
      icon: 'Calendar',
      color: 'green',
      description: 'Upcoming and completed interviews'
    },
    {
      title: 'Offers Received',
      value: '3',
      change: '+2',
      changeType: 'increase',
      icon: 'Gift',
      color: 'purple',
      description: 'Job offers pending response'
    },
    {
      title: 'Response Rate',
      value: '24%',
      change: '-3%',
      changeType: 'decrease',
      icon: 'TrendingUp',
      color: 'orange',
      description: 'Applications with responses'
    }
  ];

  const formatCurrentTime = () => {
    return currentTime?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - JobSynq | Job Application Tracker</title>
        <meta name="description" content="Track your job applications, monitor progress, and manage interviews from your centralized dashboard." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationBar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, Bhavik! 👋
                </h1>
                <p className="text-gray-600">
                  {formatCurrentTime()} • Here's your job search overview
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Last updated: {currentTime?.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData?.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                change={stat?.change}
                changeType={stat?.changeType}
                icon={stat?.icon}
                color={stat?.color}
                description={stat?.description}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <QuickActions />
              
              {/* Activity Timeline */}
              <ActivityTimeline />
              
              {/* Charts */}
              <ApplicationChart />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Upcoming Interviews */}
              <UpcomingInterviews />
              
              {/* Reminders and Notifications */}
              <RemindersPanel />
            </div>
          </div>

          {/* Footer Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">67%</p>
                <p className="text-sm text-gray-600">Application Success Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.2</p>
                <p className="text-sm text-gray-600">Avg. Days to Response</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Active Applications</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;