import React from 'react';
import { Link } from 'react-router-dom';
import { IoBriefcase, IoSchool, IoArrowForward } from 'react-icons/io5';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">SmartJob Portal</h1>
            <p className="text-xl mb-8">Your gateway to college placements. Find the perfect job and develop skills for success.</p>
            <div className="flex gap-4">
              <Link to="/login" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                Login
              </Link>
              <Link to="/login" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
                Continue
              </Link>
            </div>
          </div>
          <div className="text-6xl">
            <IoBriefcase />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Why Choose SmartJob?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <div className="text-4xl mb-4 text-blue-600">💼</div>
            <h3 className="text-xl font-bold mb-4">Job Listings</h3>
            <p className="text-gray-600">Browse and apply for thousands of job opportunities from top companies.</p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <div className="text-4xl mb-4 text-purple-600">📚</div>
            <h3 className="text-xl font-bold mb-4">Learning Resources</h3>
            <p className="text-gray-600">Develop new skills with curated learning paths for placement success.</p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <div className="text-4xl mb-4 text-green-600">🎯</div>
            <h3 className="text-xl font-bold mb-4">Smart Matching</h3>
            <p className="text-gray-600">Get matched with jobs that fit your skills and career goals.</p>
          </div>
        </div>
      </div>

      {/* Admin & Candidate Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">For Everyone</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Admin */}
            <div className="border-2 border-blue-600 rounded-lg p-8 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <div className="text-3xl text-blue-600 mr-4">⚙️</div>
                <h3 className="text-2xl font-bold text-gray-800">Administrators</h3>
              </div>
              <p className="text-gray-600 mb-6">Manage jobs, candidates, and placement processes efficiently.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Post and manage job listings</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> View candidate profiles</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Manage applications</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Schedule interviews</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Add learning resources</li>
              </ul>
              <Link to="/login" className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Admin Login <IoArrowForward className="ml-2" />
              </Link>
            </div>

            {/* Candidate */}
            <div className="border-2 border-purple-600 rounded-lg p-8 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <div className="text-3xl text-purple-600 mr-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-800">Candidates</h3>
              </div>
              <p className="text-gray-600 mb-6">Find your dream job and accelerate your placement journey.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Browse job listings</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Build your profile</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Apply for jobs</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Access learning resources</li>
                <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Track applications</li>
              </ul>
              <Link to="/login" className="inline-flex items-center bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                Candidate Login <IoArrowForward className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
