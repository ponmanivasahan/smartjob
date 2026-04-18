import React, { useEffect, useState } from 'react';
import api from '../../../../utils/api';
import toast from 'react-hot-toast';

const AdminJobsTab = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/admin/jobs');
      setJobs(response.data.data || []);
    } catch {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading jobs...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Job Listings</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Post New Job
        </button>
      </div>
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="border-l-4 border-blue-600 pl-4 py-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <h4 className="font-bold text-gray-800">{job.job_title}</h4>
              <p className="text-sm text-gray-600">{job.company_name}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                  job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {job.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminJobsTab;
