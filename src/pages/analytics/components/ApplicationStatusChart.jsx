import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ApplicationStatusChart = ({ data }) => {
  const COLORS = {
    'Applied': '#3B82F6',
    'Phone Screen': '#8B5CF6',
    'Interview': '#10B981',
    'Final Round': '#F59E0B',
    'Offer': '#059669',
    'Rejected': '#DC2626'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data?.name}</p>
          <p className="text-sm text-gray-600">
            {data?.value} applications ({((data?.value / data?.payload?.total) * 100)?.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-sm text-gray-600">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[entry?.name]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ApplicationStatusChart;