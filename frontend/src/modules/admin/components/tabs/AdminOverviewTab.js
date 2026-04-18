import React from 'react';

const AdminOverviewTab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Welcome to Admin Dashboard</h2>
      <p className="text-gray-600">
        Use the tabs above to manage jobs, candidates, and learning resources. 
        Monitor statistics and make key administrative decisions.
      </p>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Quick Tips:</strong> Click on any tab to manage specific areas of your platform.
        </p>
      </div>
    </div>
  );
};

export default AdminOverviewTab;
