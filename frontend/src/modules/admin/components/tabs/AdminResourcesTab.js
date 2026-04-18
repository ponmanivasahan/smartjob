import React from 'react';

const AdminResourcesTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Learning Resources</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add Resource
        </button>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          Learning resources section. Add and manage resources for candidates here.
        </p>
      </div>
    </div>
  );
};

export default AdminResourcesTab;
