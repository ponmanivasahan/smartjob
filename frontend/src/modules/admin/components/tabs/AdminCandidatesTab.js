import React, { useEffect, useState } from 'react';
import api from '../../../../utils/api';
import toast from 'react-hot-toast';

const AdminCandidatesTab = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await api.get('/admin/candidates');
      setCandidates(response.data.data || []);
    } catch {
      toast.error('Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading candidates...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">All Candidates</h3>
        <span className="text-sm text-gray-600">{candidates.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">College</th>
              <th className="px-4 py-2 text-left">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-600">
                  No candidates found
                </td>
              </tr>
            ) : (
              candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{candidate.first_name} {candidate.last_name}</td>
                  <td className="px-4 py-2">{candidate.email}</td>
                  <td className="px-4 py-2">{candidate.college_name || 'N/A'}</td>
                  <td className="px-4 py-2">{candidate.cgpa || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCandidatesTab;
