import React from 'react';
import useAuthStore from '../../../../store/authStore';

const CandidateProfileTab = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2">Edit Profile</h3>
        <p className="text-gray-600">Update your profile information and skills.</p>
      </div>
      
      <div className="bg-white border rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              defaultValue={`${user?.first_name} ${user?.last_name}`}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50"
              disabled
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileTab;
