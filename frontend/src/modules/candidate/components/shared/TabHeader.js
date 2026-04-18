import React from 'react';

const TabHeader = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 font-bold whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabHeader;
