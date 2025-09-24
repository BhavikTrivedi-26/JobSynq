import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PlatformEffectivenessChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Effectiveness</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="platform" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="responseRate" 
              fill="#3B82F6" 
              name="Response Rate"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="interviewRate" 
              fill="#10B981" 
              name="Interview Rate"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="offerRate" 
              fill="#F59E0B" 
              name="Offer Rate"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlatformEffectivenessChart;