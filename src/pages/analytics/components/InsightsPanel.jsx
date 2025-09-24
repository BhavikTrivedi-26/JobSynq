import React from 'react';
import Icon from '../../../components/AppIcon';

const InsightsPanel = ({ insights }) => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'success': return 'TrendingUp';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      case 'tip': return 'Lightbulb';
      default: return 'Info';
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'tip': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <Icon name="Brain" size={20} />
        <span>AI Insights & Recommendations</span>
      </h3>
      <div className="space-y-4">
        {insights?.map((insight, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${getInsightColor(insight?.type)}`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={getInsightIcon(insight?.type)} 
                size={20} 
                className="flex-shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <h4 className="font-medium mb-1">{insight?.title}</h4>
                <p className="text-sm opacity-90">{insight?.description}</p>
                {insight?.action && (
                  <p className="text-sm font-medium mt-2">
                    💡 Action: {insight?.action}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;