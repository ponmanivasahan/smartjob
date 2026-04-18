import React from 'react';
import { IoBriefcaseOutline, IoBusinessOutline, IoCalendarOutline, IoPersonCircleOutline } from 'react-icons/io5';
import useAdminDataStore from '../../../store/adminDataStore';

const RECENT_ACTIVITIES = [
  { id: 1, message: '3 candidates applied to Frontend Intern', time: '12 min ago' },
  { id: 2, message: 'Interview scheduled for Data Analyst role', time: '40 min ago' },
  { id: 3, message: 'New company added to campus drive', time: '2 hrs ago' },
];

const OverviewPage = () => {
  const internships = useAdminDataStore((state) => state.internships);
  const candidates = useAdminDataStore((state) => state.candidates);
  const companies = useAdminDataStore((state) => state.companies);

  const totalApplications = internships.reduce((sum, job) => sum + Number(job.applications || 0), 0);
  const scheduledInterviews = Math.max(12, Math.ceil(candidates.length * 0.35));

  const stats = [
    {
      id: 'applications',
      title: 'Applications Sent',
      value: totalApplications,
      icon: IoBriefcaseOutline,
      tint: 'text-emerald-500',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      id: 'interviews',
      title: 'Interviews Scheduled',
      value: scheduledInterviews,
      icon: IoCalendarOutline,
      tint: 'text-sky-500',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
    },
    {
      id: 'views',
      title: 'Company Visited',
      value: companies.length,
      icon: IoBusinessOutline,
      tint: 'text-orange-500',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.id} className={`bg-white rounded-2xl border ${card.border} p-4 shadow-sm`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{card.title}</p>
                      <p className={`mt-1 text-5xl font-semibold ${card.tint}`}>{card.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.tint} flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Vacancy Stats</h3>
              <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 p-1 text-xs">
                <span className="px-2 py-1 rounded-lg bg-white text-slate-700">Application Sent</span>
                <span className="px-2 py-1 rounded-lg text-slate-500">Interviews</span>
                <span className="px-2 py-1 rounded-lg text-slate-500">Rejected</span>
              </div>
            </div>

            <div className="h-60 rounded-2xl bg-slate-50 border border-slate-100 p-4 relative overflow-hidden">
              <svg viewBox="0 0 900 300" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="4"
                  points="40,220 150,210 250,165 360,190 470,150 580,170 690,130 800,160"
                />
                <polyline
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  points="40,190 150,220 250,180 360,140 470,170 580,125 690,145 800,90"
                />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-slate-800">Recommended Jobs</h3>
              <button className="px-4 py-2 rounded-xl border border-violet-200 text-violet-600 text-sm font-medium bg-white">View More</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {internships.slice(0, 3).map((job) => (
                <div key={job.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <h4 className="font-semibold text-slate-800 mb-1">{job.title}</h4>
                  <p className="text-sm text-slate-500">{job.company}</p>
                  <p className="text-sm text-slate-500 mt-2">{job.location}</p>
                  <p className="text-sm font-medium text-slate-700 mt-3">{job.salary}</p>
                </div>
              ))}
              {internships.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                  No internships yet. Use Tools to add internship postings.
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm h-fit">
          <div className="flex flex-col items-center text-center border-b border-slate-100 pb-5 mb-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white flex items-center justify-center">
              <IoPersonCircleOutline size={36} />
            </div>
            <h3 className="mt-3 font-semibold text-slate-800">Admin Panel</h3>
            <p className="text-sm text-slate-500">Smart Job Portal</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Companies</span>
              <span className="font-semibold text-slate-800">{companies.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Candidates</span>
              <span className="font-semibold text-slate-800">{candidates.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Active Jobs</span>
              <span className="font-semibold text-slate-800">{internships.filter((job) => job.status === 'active').length}</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Recent Activities</h4>
            <div className="space-y-3">
              {RECENT_ACTIVITIES.map((item) => (
                <div key={item.id} className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                  <p className="text-sm text-slate-700">{item.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default OverviewPage;
