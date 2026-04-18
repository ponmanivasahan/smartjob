import React, { useState, useEffect } from 'react';
import { IoBriefcase, IoBook, IoCheckmark, IoCalendar } from 'react-icons/io5';
import api from '../../../utils/api';
import useAuthStore from '../../../store/authStore';
import CandidateOverviewTab from './CandidateOverviewTab';
import CandidateApplicationsTab from './CandidateApplicationsTab';
import CandidateLearningTab from './CandidateLearningTab';
import CandidateInterviewsTab from './CandidateInterviewsTab';
import CandidateProfileTab from './CandidateProfileTab';

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ appliedJobs: 0, shortlisted: 0, learningProgress: 0, upcomingInterviews: 0 });
  const { user } = useAuthStore();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [applicationsRes] = await Promise.all([
        api.get('/candidate/applications'),
      ]);

      setStats({
        appliedJobs: applicationsRes.data.data?.length || 0,
        shortlisted: applicationsRes.data.data?.filter(app => app.application_status === 'shortlisted').length || 0,
        learningProgress: 0,
        upcomingInterviews: 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user?.first_name}!</h1>
      <p className="text-gray-600 mb-8">Track your job applications and learning progress</p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Jobs Applied</p>
              <p className="text-3xl font-bold">{stats.appliedJobs}</p>
            </div>
            <IoBriefcase className="text-4xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Shortlisted</p>
              <p className="text-3xl font-bold">{stats.shortlisted}</p>
            </div>
            <IoCheckmark className="text-4xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Learning Progress</p>
              <p className="text-3xl font-bold">{stats.learningProgress}%</p>
            </div>
            <IoBook className="text-4xl opacity-30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Upcoming Interviews</p>
              <p className="text-3xl font-bold">{stats.upcomingInterviews}</p>
            </div>
            <IoCalendar className="text-4xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-bold whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 font-bold whitespace-nowrap ${activeTab === 'applications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`px-6 py-3 font-bold whitespace-nowrap ${activeTab === 'learning' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Learning
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`px-6 py-3 font-bold whitespace-nowrap ${activeTab === 'interviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Interviews
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-bold whitespace-nowrap ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Profile
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && <CandidateOverviewTab />}
          {activeTab === 'applications' && <CandidateApplicationsTab />}
          {activeTab === 'learning' && <CandidateLearningTab />}
          {activeTab === 'interviews' && <CandidateInterviewsTab />}
          {activeTab === 'profile' && <CandidateProfileTab />}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
