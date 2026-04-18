import React, { useState } from 'react';
import { IoClose, IoDownload } from 'react-icons/io5';
import useAdminDataStore from '../../../store/adminDataStore';
import toast from 'react-hot-toast';

const ResourcesPage = () => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const courses = useAdminDataStore((state) => state.courses);
  const removeCourse = useAdminDataStore((state) => state.removeCourse);

  const categories = [...new Set(courses.map((course) => course.category))];
  const filteredCourses = activeCategory === 'All'
    ? courses
    : courses.filter((course) => course.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Learning Resources</h2>
          <p className="text-gray-600">Curated learning materials for candidate skill development</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setActiveCategory('All')} className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border ${activeCategory === 'All' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-300 hover:shadow-lg hover:scale-105' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
          All ({courses.length})
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full border transition-all duration-300 hover:shadow-md ${activeCategory === category ? 'bg-blue-100 text-blue-700 border-blue-300 font-bold' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 group"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1"></div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-800 text-lg flex-1 group-hover:text-blue-600 transition duration-300 line-clamp-2">{resource.title}</h3>
                <span className="ml-2 flex items-center gap-1 text-amber-500 font-bold whitespace-nowrap">
                  <span className="text-xl">★</span>
                  {resource.rating}
                </span>
              </div>

              {/* Category and Level */}
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-bold hover:bg-blue-200 transition">
                  {resource.category}
                </span>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-bold whitespace-nowrap transition ${
                    resource.level === 'Beginner'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : resource.level === 'Intermediate'
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {resource.level}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-600 font-bold mb-1">DURATION</p>
                  <p className="font-bold text-gray-800">{resource.duration}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 font-bold mb-1">ENROLLED</p>
                  <p className="font-bold text-gray-800">{resource.enrolled}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 font-bold mb-1">PLATFORM</p>
                  <p className="font-bold text-gray-800 text-sm">{resource.platform}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => setSelectedResource(resource)} className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-medium duration-200 border border-gray-200">
                  <IoDownload size={16} />
                  View
                </button>
                <button onClick={() => { removeCourse(resource.id); toast.success('Course removed'); }} className="flex-1 bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600 px-4 py-2 rounded-lg transition font-bold hover:scale-105 duration-300 border border-gray-300">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resource View Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedResource.title}</h3>
                <p className="text-sm text-gray-500">{selectedResource.category} • {selectedResource.level} • {selectedResource.platform}</p>
              </div>
              <button className="text-gray-500" onClick={() => setSelectedResource(null)}><IoClose size={26} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 border-t pt-6">
              <div className="md:col-span-2">
                <p className="text-gray-700">Duration: <span className="font-semibold text-gray-800">{selectedResource.duration}</span></p>
                <p className="text-gray-700 mt-2">Enrolled: <span className="font-semibold text-gray-800">{selectedResource.enrolled}</span></p>
                <p className="text-gray-700 mt-4">Description: <span className="text-gray-600 block mt-2">This is a curated course to help candidates upskill in {selectedResource.category}.</span></p>
              </div>
              <div className="md:col-span-1 flex flex-col gap-3">
                <button onClick={() => toast.success('Course opened')} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100">Open Course</button>
                <button onClick={() => toast.success('Materials downloaded')} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100">Download Materials</button>
                <button onClick={() => toast.success('Course link shared')} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100">Share</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
