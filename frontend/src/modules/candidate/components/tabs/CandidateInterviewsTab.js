import React from 'react';

const CandidateInterviewsTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2">Scheduled Interviews</h3>
        <p className="text-gray-600">Your upcoming interviews will be shown here.</p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          No interviews scheduled yet. Keep applying and improve your profile!
        </p>
      </div>
    </div>
  );
};

export default CandidateInterviewsTab;
