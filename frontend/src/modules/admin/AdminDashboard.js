import React, { useState, useEffect } from 'react';
import { IoAdd, IoBriefcase, IoPeople, IoCalendar } from 'react-icons/io5';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import AdminOverview from './components/AdminOverview';
import AdminJobsTab from './components/AdminJobsTab';
import AdminCandidatesTab from './components/AdminCandidatesTab';
import AdminResourcesTab from './components/AdminResourcesTab';

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
    } catch {
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
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'jobs' && <AdminJobsTab />}
          {activeTab === 'candidates' && <AdminCandidatesTab />}
          {activeTab === 'resources' && <AdminResourcesTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
