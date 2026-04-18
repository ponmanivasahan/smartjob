import React, { useState } from 'react';
import { IoSearch, IoClose, IoMail, IoCall, IoArrowForward } from 'react-icons/io5';
import toast from 'react-hot-toast';
import useAdminDataStore from '../../../store/adminDataStore';

const CandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const candidates = useAdminDataStore((state) => state.candidates);
  const removeCandidate = useAdminDataStore((state) => state.removeCandidate);

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Manage Candidates</h2>
        <p className="text-gray-600">View and manage all candidate profiles</p>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <IoSearch className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition duration-300" size={22} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300 text-lg"
        />
      </div>

      {/* Candidate Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <p className="text-xs text-gray-600 font-bold mb-2 uppercase">Total Candidates</p>
          <p className="text-3xl font-bold text-blue-600">{candidates.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <p className="text-xs text-gray-600 font-bold mb-2 uppercase">Active</p>
          <p className="text-3xl font-bold text-green-600">
            {candidates.filter((c) => c.status === 'Active').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border border-amber-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <p className="text-xs text-gray-600 font-bold mb-2 uppercase">Shortlisted</p>
          <p className="text-3xl font-bold text-amber-600">
            {candidates.filter((c) => c.status === 'Shortlisted').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <p className="text-xs text-gray-600 font-bold mb-2 uppercase">Placed</p>
          <p className="text-3xl font-bold text-purple-600">
            {candidates.filter((c) => c.status === 'Placed').length}
          </p>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-2xl shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1"></div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4 gap-3">
                <h3 className="font-bold text-gray-800 text-2xl leading-tight">{candidate.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                  candidate.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : candidate.status === 'Shortlisted'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {candidate.status}
                </span>
              </div>

              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-bold">{candidate.college}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">CGPA {candidate.cgpa}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-600 font-bold mb-1">APPLIED</p>
                  <p className="font-bold text-gray-800">{candidate.applications}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 font-bold mb-1">SKILLS</p>
                  <p className="font-bold text-gray-800">{candidate.skills.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 font-bold mb-1">STATUS</p>
                  <p className="font-bold text-gray-800 text-sm">{candidate.status}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCandidate(candidate)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-medium duration-200 border border-gray-200"
                >
                  <IoArrowForward size={16} />
                  View
                </button>
                <button onClick={() => { removeCandidate(candidate.id); toast.success('Candidate removed'); }} className="flex-1 bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600 px-4 py-2 rounded-lg transition font-bold duration-200 border border-gray-300">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 animate-slide-up max-h-96 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 flex justify-between items-center p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedCandidate.name}</h3>
                <p className="text-blue-100 text-sm mt-1">Profile Information</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition duration-300"
              >
                <IoClose size={28} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <IoMail className="text-white" size={20} />
                    </div>
                    <span className="text-gray-700 font-semibold">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <IoCall className="text-white" size={20} />
                    </div>
                    <span className="text-gray-700 font-semibold">{selectedCandidate.phone}</span>
                  </div>
                </div>
              </div>

              {/* Education */}
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                <h4 className="font-bold text-gray-800 mb-4">Education</h4>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-800">{selectedCandidate.college}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">CGPA</p>
                    <p className="font-bold text-lg text-purple-600">{selectedCandidate.cgpa}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                <h4 className="font-bold text-gray-800 mb-4">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

                {/* Resume */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-4">Resume</h4>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {selectedCandidate.resume}
                  </div>
                  <div className="mt-4">
                    <button onClick={() => toast.success('Resume downloaded')} className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm">Download Resume</button>
                  </div>
                </div>

              {/* Applications */}
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                <h4 className="font-bold text-gray-800 mb-4">Application Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Total Applications</p>
                    <p className="font-bold text-2xl text-amber-600">{selectedCandidate.applications}</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-amber-200">
                    <p className="text-gray-600">Current Status</p>
                    <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                      selectedCandidate.status === 'Active' ? 'bg-green-100 text-green-800' :
                      selectedCandidate.status === 'Shortlisted' ? 'bg-amber-100 text-amber-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {selectedCandidate.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
              <button onClick={() => toast.success('Message sent to candidate')} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl transition font-bold shadow-lg hover:shadow-xl duration-300">
                Send Message
              </button>
              <button onClick={() => toast.success('Interview scheduled')} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-xl transition font-bold shadow-lg hover:shadow-xl duration-300">
                Schedule Interview
              </button>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl transition font-bold duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;
