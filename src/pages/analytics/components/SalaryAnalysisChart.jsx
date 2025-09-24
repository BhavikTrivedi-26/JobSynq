import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalaryAnalysisChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data?.position}</p>
          <p className="text-sm text-gray-600">
            Salary: ${data?.salary?.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Experience: {data?.experience} years
          </p>
          <p className="text-sm text-gray-600">
            Company: {data?.company}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary vs Experience Analysis</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              type="number" 
              dataKey="experience" 
              name="Experience"
              unit=" years"
              stroke="#6B7280"
              fontSize={12}
              label={{ value: 'Years of Experience', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              type="number" 
              dataKey="salary" 
              name="Salary"
              unit="₹"
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000)?.toFixed(0)}k`}
              label={{ value: 'Salary (INR)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              dataKey="salary" 
              fill="#8B5CF6"
              fillOpacity={0.7}
              stroke="#8B5CF6"
              strokeWidth={2}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalaryAnalysisChart;