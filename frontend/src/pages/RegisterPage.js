import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMail, IoLockClosed, IoPerson, IoCall } from 'react-icons/io5';
import api from '../utils/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'candidate',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/register', formData);
      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <IoPerson className="text-gray-400" />
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First name"
                className="ml-2 outline-none w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <IoPerson className="text-gray-400" />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last name"
                className="ml-2 outline-none w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <IoMail className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="ml-2 outline-none w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <IoCall className="text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="ml-2 outline-none w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <IoLockClosed className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="ml-2 outline-none w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Register As</label>
            <div className="space-y-2">
              <div className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50"
                   onClick={() => setFormData({ ...formData, role: 'candidate' })}>
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={formData.role === 'candidate'}
                  onChange={handleChange}
                  className="w-4 h-4 cursor-pointer"
                />
                <label className="ml-3 cursor-pointer flex-1">
                  <span className="font-semibold text-gray-800">Candidate</span>
                  <span className="text-sm text-gray-600 block">Job seeker / Professional</span>
                </label>
              </div>

              <div className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-purple-50"
                   onClick={() => setFormData({ ...formData, role: 'admin' })}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                  className="w-4 h-4 cursor-pointer"
                />
                <label className="ml-3 cursor-pointer flex-1">
                  <span className="font-semibold text-gray-800">Admin</span>
                  <span className="text-sm text-gray-600 block">Employer / HR Manager</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-600 font-bold hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
