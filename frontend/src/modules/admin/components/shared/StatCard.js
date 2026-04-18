import React from 'react';

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg p-5 text-gray-800 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-md bg-gray-50 flex items-center justify-center text-gray-400">
          {Icon ? <Icon className="text-2xl" /> : null}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
