import React, { useState, useEffect } from 'react';
import { IoBriefcase, IoBook, IoCheckmark, IoCalendar } from 'react-icons/io5';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';

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
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
              <p className="text-gray-600 mb-4">Track your journey towards placement success!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">Quick Tips</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>✓ Complete your profile to improve job matching</li>
                    <li>✓ Learn new skills through our learning resources</li>
                    <li>✓ Apply for jobs that match your skills</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-2">Recommended for You</h3>
                  <p className="text-sm text-green-800">Apply to 5 jobs today to increase your placement chances!</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'applications' && <ApplicationsTab />}
          {activeTab === 'learning' && <LearningTab />}
          {activeTab === 'interviews' && <InterviewsTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </div>
      </div>
    </div>
  );
};

const ApplicationsTab = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/candidate/applications');
      setApplications(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-gray-600">Loading applications...</p>;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Your Applications</h3>
      <div className="space-y-4">
        {applications.length === 0 ? (
          <p className="text-gray-600">You haven't applied to any jobs yet.</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{app.job_title}</h4>
                  <p className="text-sm text-gray-600">{app.company_name}</p>
                  <p className="text-xs text-gray-500">Applied on {new Date(app.applied_at).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  app.application_status === 'selected' ? 'bg-green-100 text-green-800' :
                  app.application_status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                  app.application_status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
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

const LearningTab = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Your Learning Progress</h3>
      <p className="text-gray-600">Access learning resources to improve your skills for placements.</p>
    </div>
  );
};

const InterviewsTab = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Scheduled Interviews</h3>
      <p className="text-gray-600">Your upcoming interviews will appear here.</p>
    </div>
  );
};

const ProfileTab = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
      <p className="text-gray-600">Update your profile information and skills.</p>
    </div>
  );
};

export default CandidateDashboard;
