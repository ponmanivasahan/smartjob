import React, { useEffect, useState } from 'react';
import api from '../../../../utils/api';
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

  const getStatusColor = (status) => {
    const colors = {
      selected: 'bg-green-100 text-green-800',
      shortlisted: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Your Applications</h3>
        <span className="text-sm text-gray-600">{applications.length} total</span>
      </div>
      <div className="space-y-4">
        {applications.length === 0 ? (
          <p className="text-gray-600">You have not applied to any jobs yet.</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="border rounded-lg p-4 hover:shadow-lg transition bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{app.job_title}</h4>
                  <p className="text-sm text-gray-600">{app.company_name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Applied on {new Date(app.applied_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4 ${getStatusColor(app.application_status)}`}>
                  {app.application_status.charAt(0).toUpperCase() + app.application_status.slice(1)}
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
