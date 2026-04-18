import React from 'react';

const CandidateOverviewTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Track your journey towards placement success!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-3">Quick Tips</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Complete your profile to improve job matching</li>
            <li>✓ Learn new skills through our learning resources</li>
            <li>✓ Apply for jobs that match your skills</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-900 mb-3">Recommended for You</h3>
          <p className="text-sm text-green-800">Apply to 5 jobs today to increase your placement chances!</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateOverviewTab;
