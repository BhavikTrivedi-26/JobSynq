import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ApplicationChart = () => {
  const statusData = [
    { name: 'Applied', value: 45, color: '#3B82F6' },
    { name: 'Interview', value: 12, color: '#10B981' },
    { name: 'Final Round', value: 8, color: '#8B5CF6' },
    { name: 'Offer', value: 3, color: '#059669' },
    { name: 'Rejected', value: 22, color: '#DC2626' }
  ];

  const monthlyData = [
    { month: 'Jul', applications: 15, interviews: 4, offers: 1 },
    { month: 'Aug', applications: 28, interviews: 8, offers: 2 },
    { month: 'Sep', applications: 35, interviews: 12, offers: 3 },
    { month: 'Oct', applications: 42, interviews: 15, offers: 4 },
    { month: 'Nov', applications: 38, interviews: 11, offers: 2 },
    { month: 'Dec', applications: 25, interviews: 7, offers: 1 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.dataKey}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{data?.name}</p>
          <p className="text-sm text-gray-600">{data?.value} applications</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {statusData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {statusData?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-sm text-gray-600">{item?.name}</span>
              <span className="text-sm font-medium text-gray-900">{item?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Monthly Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="applications" 
                fill="#3B82F6" 
                name="Applications"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="interviews" 
                fill="#10B981" 
                name="Interviews"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="offers" 
                fill="#059669" 
                name="Offers"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ApplicationChart;