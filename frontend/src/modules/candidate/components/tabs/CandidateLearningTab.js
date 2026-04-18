import React from 'react';

const CandidateLearningTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2">Your Learning Progress</h3>
        <p className="text-gray-600">Access learning resources to improve your skills for placements.</p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          Learning resources will be available soon. Stay tuned for curated content to enhance your skills!
        </p>
      </div>
    </div>
  );
};

export default CandidateLearningTab;
