import React from 'react';

const CandidateOverviewTab = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
      <p className="text-gray-600 mb-4">Track your journey towards placement success!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">Quick Tips</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>Complete your profile to improve job matching</li>
            <li>Learn new skills through our learning resources</li>
            <li>Apply for jobs that match your skills</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-900 mb-2">Recommended for You</h3>
          <p className="text-sm text-green-800">Apply to 5 jobs today to increase your placement chances!</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateOverviewTab;
