import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import MetricCard from './components/MetricCard';
import ApplicationStatusChart from './components/ApplicationStatusChart';
import ApplicationTrendsChart from './components/ApplicationTrendsChart';
import CompanyResponseChart from './components/CompanyResponseChart';
import FilterControls from './components/FilterControls';
import InsightsPanel from './components/InsightsPanel';
import PlatformEffectivenessChart from './components/PlatformEffectivenessChart';
import SalaryAnalysisChart from './components/SalaryAnalysisChart';
import Icon from '../../components/AppIcon';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('last90');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [positionType, setPositionType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for analytics
  const metricsData = [
    {
      title: "Total Applications",
      value: "127",
      change: "+12%",
      changeType: "positive",
      icon: "FileText",
      description: "Applications sent in the last 3 months"
    },
    {
      title: "Response Rate",
      value: "23.6%",
      change: "+5.2%",
      changeType: "positive",
      icon: "MessageSquare",
      description: "Companies that responded to applications"
    },
    {
      title: "Interview Rate",
      value: "8.7%",
      change: "-2.1%",
      changeType: "negative",
      icon: "Users",
      description: "Applications that led to interviews"
    },
    {
      title: "Offer Rate",
      value: "3.9%",
      change: "+1.2%",
      changeType: "positive",
      icon: "Award",
      description: "Interviews that resulted in offers"
    }
  ];

  const statusDistributionData = [
    { name: 'Applied', value: 45, total: 127 },
    { name: 'Phone Screen', value: 18, total: 127 },
    { name: 'Interview', value: 12, total: 127 },
    { name: 'Final Round', value: 8, total: 127 },
    { name: 'Offer', value: 5, total: 127 },
    { name: 'Rejected', value: 39, total: 127 }
  ];

  const trendsData = [
    { month: 'Jun 2024', applications: 18, responses: 4 },
    { month: 'Jul 2024', applications: 25, responses: 7 },
    { month: 'Aug 2024', applications: 32, responses: 9 },
    { month: 'Sep 2024', applications: 28, responses: 6 },
    { month: 'Oct 2024', applications: 24, responses: 4 }
  ];

  const companyResponseData = [
    { company: 'Google', responseRate: 45, responses: 9, applications: 20 },
    { company: 'Microsoft', responseRate: 38, responses: 6, applications: 16 },
    { company: 'Apple', responseRate: 33, responses: 4, applications: 12 },
    { company: 'Amazon', responseRate: 29, responses: 5, applications: 17 },
    { company: 'Meta', responseRate: 25, responses: 3, applications: 12 },
    { company: 'Netflix', responseRate: 22, responses: 2, applications: 9 },
    { company: 'Tesla', responseRate: 18, responses: 2, applications: 11 },
    { company: 'Uber', responseRate: 15, responses: 1, applications: 7 }
  ];

  const platformEffectivenessData = [
    { platform: 'LinkedIn', responseRate: 28, interviewRate: 12, offerRate: 4 },
    { platform: 'Indeed', responseRate: 22, interviewRate: 8, offerRate: 3 },
    { platform: 'AngelList', responseRate: 35, interviewRate: 15, offerRate: 6 },
    { platform: 'Glassdoor', responseRate: 18, interviewRate: 6, offerRate: 2 },
    { platform: 'Company Site', responseRate: 31, interviewRate: 14, offerRate: 5 }
  ];

  const salaryAnalysisData = [
    { position: 'Frontend Dev', salary: 950000, experience: 3, company: 'Google' },
    { position: 'Backend Dev', salary: 1100000, experience: 5, company: 'Microsoft' },
    { position: 'Full Stack', salary: 1050000, experience: 4, company: 'Apple' },
    { position: 'Mobile Dev', salary: 980000, experience: 3, company: 'Meta' },
    { position: 'DevOps', salary: 1150000, experience: 6, company: 'Amazon' },
    { position: 'Data Scientist', salary: 1250000, experience: 4, company: 'Netflix' },
    { position: 'Product Manager', salary: 1300000, experience: 7, company: 'Tesla' },
    { position: 'Frontend Dev', salary: 880000, experience: 2, company: 'Uber' },
    { position: 'Backend Dev', salary: 1020000, experience: 4, company: 'Airbnb' },
    { position: 'Full Stack', salary: 920000, experience: 3, company: 'Spotify' }
  ];

  const insightsData = [
    {
      type: 'success',
      title: 'Strong Performance on AngelList',
      description: 'Your response rate on AngelList (35%) is significantly higher than other platforms. Consider focusing more applications here.',
      action: 'Increase AngelList applications by 40% next month'
    },
    {
      type: 'warning',
      title: 'Low Interview Conversion',
      description: 'Your interview rate has decreased by 2.1% this month. Review your application materials and consider tailoring them more specifically.',
      action: 'Update resume and cover letter templates'
    },
    {
      type: 'tip',
      title: 'Optimal Application Timing',
      description: 'Data shows you get 23% more responses when applying on Tuesday-Thursday between 9-11 AM.',
      action: 'Schedule applications during peak response times'
    },
    {
      type: 'info',
      title: 'Salary Expectations Alignment',
      description: 'Your target salary range aligns well with market rates for your experience level in your target companies.',
      action: 'Continue with current salary expectations'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleExportData = () => {
    // Mock export functionality
    const csvData = `Date,Company,Position,Status,Platform,Salary\n${companyResponseData?.map(item => 
      `2024-09-22,${item?.company},Software Engineer,Applied,LinkedIn,$100000`
    )?.join('\n')}`;
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job_applications_analytics.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const handleExportCharts = () => {
    // Mock chart export functionality
    alert('Charts exported successfully! (This is a demo feature)');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)]?.map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)]?.map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={24} color="white" strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Comprehensive insights into your job search performance and trends
          </p>
        </div>

        {/* Filter Controls */}
        <FilterControls
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          positionType={positionType}
          setPositionType={setPositionType}
          onExportData={handleExportData}
          onExportCharts={handleExportCharts}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData?.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              description={metric?.description}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ApplicationStatusChart data={statusDistributionData} />
          <ApplicationTrendsChart data={trendsData} />
          <CompanyResponseChart data={companyResponseData} />
          <PlatformEffectivenessChart data={platformEffectivenessData} />
        </div>

        {/* Additional Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SalaryAnalysisChart data={salaryAnalysisData} />
          </div>
          <div className="lg:col-span-1">
            <InsightsPanel insights={insightsData} />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Icon name="Target" size={20} />
            <span>Performance Summary</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">127</div>
              <div className="text-sm text-gray-600">Total Applications</div>
              <div className="text-xs text-gray-500 mt-1">Last 3 months</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">30</div>
              <div className="text-sm text-gray-600">Responses Received</div>
              <div className="text-xs text-gray-500 mt-1">23.6% response rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 mb-1">5</div>
              <div className="text-sm text-gray-600">Offers Received</div>
              <div className="text-xs text-gray-500 mt-1">3.9% offer rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;