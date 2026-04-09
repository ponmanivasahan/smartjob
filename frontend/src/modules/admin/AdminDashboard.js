import React, { useState, useEffect } from 'react';
import { IoAdd, IoBriefcase, IoPeople, IoBook, IoCalendar } from 'react-icons/io5';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ candidates: 0, jobs: 0, applications: 0, interviews: 0 });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all stats
      const [candidatesRes, jobsRes] = await Promise.all([
        api.get('/admin/candidates'),
        api.get('/admin/jobs'),
      ]);

      setStats({
        candidates: candidatesRes.data.count || 0,
        jobs: jobsRes.data.count || 0,
        applications: 0,
        interviews: 0,
      });
    } catch (error) {
      toast.error('Failed to fetch statistics');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Candidates</p>
              <p className="text-3xl font-bold">{stats.candidates}</p>
            </div>
            <IoPeople className="text-4xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Active Jobs</p>
              <p className="text-3xl font-bold">{stats.jobs}</p>
            </div>
            <IoBriefcase className="text-4xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Applications</p>
              <p className="text-3xl font-bold">{stats.applications}</p>
            </div>
            <IoAdd className="text-4xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Interviews Scheduled</p>
              <p className="text-3xl font-bold">{stats.interviews}</p>
            </div>
            <IoCalendar className="text-4xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-bold ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 font-bold ${activeTab === 'jobs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Manage Jobs
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`px-6 py-3 font-bold ${activeTab === 'candidates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Candidates
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 font-bold ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Learning Resources
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Welcome to Admin Dashboard</h2>
              <p className="text-gray-600">Use the tabs above to manage jobs, candidates, and learning resources.</p>
            </div>
          )}
          {activeTab === 'jobs' && <JobsTab />}
          {activeTab === 'candidates' && <CandidatesTab />}
          {activeTab === 'resources' && <ResourcesTab />}
        </div>
      </div>
    </div>
  );
};

const JobsTab = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/admin/jobs');
      setJobs(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-600">Loading jobs...</p>;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Job Listings</h3>
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="border-l-4 border-blue-600 pl-4 py-2">
              <h4 className="font-bold text-gray-800">{job.job_title}</h4>
              <p className="text-sm text-gray-600">{job.company_name}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {job.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const CandidatesTab = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await api.get('/admin/candidates');
      setCandidates(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-600">Loading candidates...</p>;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">All Candidates</h3>
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
                <td colSpan="4" className="px-4 py-2 text-center text-gray-600">No candidates found</td>
              </tr>
            ) : (
              candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b">
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

const ResourcesTab = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Learning Resources</h3>
      <p className="text-gray-600">Add and manage learning resources for candidates here.</p>
    </div>
  );
};

export default AdminDashboard;
