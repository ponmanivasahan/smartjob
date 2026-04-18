import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import AdminSidebar from '../components/AdminSidebar';
import OverviewPage from './OverviewPage';
import JobsPage from './JobsPage';
import CandidatesPage from './CandidatesPage';
import ResourcesPage from './ResourcesPage';
import SettingsPage from './SettingsPage';
import CompaniesPage from './CompaniesPage';
import useAdminDataStore from '../../../store/adminDataStore';
import useAuthStore from '../../../store/authStore';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const initialize = useAdminDataStore((state) => state.initialize);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    initialize().catch(() => {
      // Page-level actions already surface request errors via toasts where relevant.
    });
  }, [initialize]);

  const renderPageContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewPage />;
      case 'internship':
        return <JobsPage />;
      case 'candidates':
        return <CandidatesPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'companies':
        return <CompaniesPage />;
      case 'tools':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  const sectionTitle = {
    overview: 'Dashboard',
    internship: 'Internships',
    candidates: 'Candidates',
    resources: 'Learning Resources',
    companies: 'Companies',
    tools: 'Tools',
  };

  const displayName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'Admin User';

  return (
    <div className="h-[100dvh] bg-[#eef1f7]">
      <div className="h-full w-full bg-[#f7f8fc] overflow-hidden">
        <header className="h-16 px-4 md:px-7 bg-white border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold">Q</div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-slate-800">BIT</p>
                <p className="text-[10px] text-slate-400 -mt-1">Job Portal</p>
              </div>
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-800 truncate">{sectionTitle[activeSection] || 'Dashboard'}</h1>
          </div>

          <div className="hidden md:flex items-center w-full max-w-md">
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                placeholder="Search something here..."
                className="w-full h-10 rounded-full bg-slate-100 border border-slate-200 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right leading-tight">
                <p className="text-sm font-semibold text-slate-800">{displayName}</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center font-semibold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="relative flex h-[calc(100%-64px)]">
          <AdminSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar p-4 md:p-6">
            {renderPageContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
