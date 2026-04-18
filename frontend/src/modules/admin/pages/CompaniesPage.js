import React, { useState } from 'react';
import {
  IoBusiness,
  IoCalendarOutline,
  IoLocationOutline,
  IoBriefcaseOutline,
  IoCheckmarkCircle,
  IoClose,
} from 'react-icons/io5';
import useAdminDataStore from '../../../store/adminDataStore';
import toast from 'react-hot-toast';

const CompaniesPage = () => {
  const [selected, setSelected] = useState(null);
  const companies = useAdminDataStore((state) => state.companies);
  const removeCompany = useAdminDataStore((state) => state.removeCompany);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Companies Visiting Campus</h2>
        <p className="text-gray-600">Upcoming company visits, internship roles and opening counts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Companies</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{companies.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Openings</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {companies.reduce((sum, c) => sum + Number(c.openings || 0), 0)}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Upcoming This Month</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{companies.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {companies.map((c, idx) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_auto] gap-6 items-start">
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <IoBusiness size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-semibold text-gray-800 leading-tight break-words">{c.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Campus Drive Company</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <IoLocationOutline className="text-gray-400" />
                  {c.campus || 'Campus not specified'}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <IoCalendarOutline className="text-gray-400" />
                  {c.visitingDate}
                </p>

                <p className="mt-4 text-sm text-gray-700 flex items-start gap-2">
                  <IoBriefcaseOutline className="mt-0.5 text-gray-400 shrink-0" />
                  <span className="break-words">{Array.isArray(c.roles) ? c.roles.join(', ') : String(c.roles || '')}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap lg:justify-start lg:self-center">
                <span className="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                  {c.mode || 'On Campus'}
                </span>
                <span className="px-2.5 py-1 text-xs bg-green-50 text-green-700 rounded-full border border-green-100">
                  {Number(c.openings || 0)} openings
                </span>
              </div>

              <div className="flex flex-row lg:flex-col gap-2 shrink-0 lg:w-28">
                <button
                  onClick={() => setSelected(c)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Details
                </button>
                <button
                  onClick={async () => {
                    try {
                      await removeCompany(c.id);
                      toast.success('Company removed');
                    } catch {
                      toast.error('Failed to remove company');
                    }
                  }}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        {companies.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
            No companies added yet. Use Tools to add company visits.
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-gray-100 animate-slide-up">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selected.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{selected.campus || 'Campus not specified'} • {selected.visitingDate}</p>
              </div>
              <button
                className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-500 flex items-center justify-center"
                onClick={() => setSelected(null)}
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="mt-6 border-t pt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Campus</p>
                  <p className="mt-2 text-sm text-gray-800 flex items-center gap-2"><IoLocationOutline className="text-gray-400" /> {selected.campus || 'Campus not specified'}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Visit Date</p>
                  <p className="mt-2 text-sm text-gray-800 flex items-center gap-2"><IoCalendarOutline className="text-gray-400" /> {selected.visitingDate}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Mode</p>
                  <p className="mt-2 text-sm text-gray-800 flex items-center gap-2"><IoCheckmarkCircle className="text-green-500" /> {selected.mode || 'On Campus'}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Openings</p>
                  <p className="mt-2 text-sm text-gray-800 flex items-center gap-2"><IoBriefcaseOutline className="text-gray-400" /> {Number(selected.openings || 0)} openings</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Roles Offered</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Array.isArray(selected.roles) ? selected.roles : String(selected.roles || '').split(',').map((r) => r.trim()).filter(Boolean)).map((r, i) => (
                    <div key={i} className="px-3 py-2 bg-blue-50 text-blue-900 rounded-lg border border-blue-100 text-sm font-medium">
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
