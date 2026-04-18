import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const CandidateApplicationsTab = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/candidate/applications');
      setApplications(response.data.data || []);
    } catch {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading applications...</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Your Applications</h3>
      <div className="space-y-4">
        {applications.length === 0 ? (
          <p className="text-gray-600">You have not applied to any jobs yet.</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{app.job_title}</h4>
                  <p className="text-sm text-gray-600">{app.company_name}</p>
                  <p className="text-xs text-gray-500">
                    Applied on {new Date(app.applied_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.application_status === 'selected'
                      ? 'bg-green-100 text-green-800'
                      : app.application_status === 'shortlisted'
                        ? 'bg-blue-100 text-blue-800'
                        : app.application_status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {app.application_status.toUpperCase()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidateApplicationsTab;
