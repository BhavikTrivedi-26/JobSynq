import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, change, changeType, icon, color, description }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200'
    };
    return colorMap?.[color] || colorMap?.blue;
  };

  const getChangeColor = (type) => {
    return type === 'increase' ? 'text-green-600' : type === 'decrease' ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-elevation transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
                size={16} 
                className={getChangeColor(changeType)}
              />
              <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
                {change}
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;