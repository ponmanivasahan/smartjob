import React from 'react';

const StatCard = ({ title, value, icon: Icon, gradient }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-lg p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className="text-4xl opacity-30" />
      </div>
    </div>
  );
};

export default StatCard;
