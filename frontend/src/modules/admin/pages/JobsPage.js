import React, { useState } from 'react';
import { IoArrowForward, IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import useAdminDataStore from '../../../store/adminDataStore';

const JobsPage = () => {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const internships = useAdminDataStore((state) => state.internships);
  const removeInternship = useAdminDataStore((state) => state.removeInternship);
  const updateInternshipStatus = useAdminDataStore((state) => state.updateInternshipStatus);
  const activeCount = internships.filter((job) => job.status === 'active').length;
  const closedCount = internships.filter((job) => job.status !== 'active').length;
  const filteredInternships = internships.filter((job) => {
    if (activeFilter === 'active') {
      return job.status === 'active';
    }
    if (activeFilter === 'closed') {
      return job.status !== 'active';
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Internship Postings</h2>
          <p className="text-gray-600">All internship posts added from Tools are listed here</p>
        </div>
      </div>

      {/* Filter and Stats */}
      <div className="flex gap-3 flex-wrap">
        <button onClick={() => setActiveFilter('all')} className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border ${activeFilter === 'all' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-300 hover:shadow-lg hover:scale-105' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
          All Internships ({internships.length})
        </button>
        <button onClick={() => setActiveFilter('active')} className={`px-6 py-2 rounded-full transition-all duration-300 border ${activeFilter === 'active' ? 'bg-green-100 text-green-700 border-green-300 font-bold' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
          Active ({activeCount})
        </button>
        <button onClick={() => setActiveFilter('closed')} className={`px-6 py-2 rounded-full transition-all duration-300 border ${activeFilter === 'closed' ? 'bg-red-100 text-red-700 border-red-300 font-bold' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
          Closed ({closedCount})
        </button>
      </div>

      {/* Internship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1"></div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4 gap-3">
                <h3 className="font-bold text-gray-800 text-2xl leading-tight">{job.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {job.status === 'active' ? 'Active' : 'Closed'}
                </span>
              </div>

              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-bold">{job.company}</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-bold">{job.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-600 font-bold mb-1">SALARY</p>
                  <p className="font-bold text-gray-800 text-sm">{job.salary}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 font-bold mb-1">APPLIED</p>
                  <p className="font-bold text-gray-800">{job.applications}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 font-bold mb-1">POSTED</p>
                  <p className="font-bold text-gray-800 text-sm">{job.posted}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedInternship(job)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-medium duration-200 border border-gray-200"
                >
                  <IoArrowForward size={16} />
                  View
                </button>
                <button onClick={() => { removeInternship(job.id); toast.success('Internship removed'); }} className="flex-1 bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600 px-4 py-2 rounded-lg transition font-bold duration-200 border border-gray-300">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedInternship.title}</h3>
                <p className="text-sm text-gray-500">{selectedInternship.company} • {selectedInternship.location}</p>
              </div>
              <button className="text-gray-500" onClick={() => setSelectedInternship(null)}><IoClose size={26} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 border-t pt-6">
              <div className="md:col-span-2">
                <p className="text-gray-700">Salary: <span className="font-semibold text-gray-800">{selectedInternship.salary}</span></p>
                <p className="text-gray-700 mt-2">Applications: <span className="font-semibold text-gray-800">{selectedInternship.applications}</span></p>
                <p className="text-gray-700 mt-2">Posted: <span className="font-semibold text-gray-800">{selectedInternship.posted}</span></p>
                <p className="text-gray-700 mt-4">Description: <span className="text-gray-600 block mt-2">{selectedInternship.description}</span></p>
              </div>
              <div className="md:col-span-1 flex flex-col gap-3">
                <button onClick={() => toast.success('Opened applications list')} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100">View Applications</button>
                <button onClick={() => toast.success('Edit form ready')} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100">Edit Internship</button>
                <button onClick={() => { updateInternshipStatus(selectedInternship.id, 'closed'); toast.success('Internship marked as closed'); setSelectedInternship((prev) => ({ ...prev, status: 'closed' })); }} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100">Close Internship</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
