import React from 'react';
import {
  IoApps,
  IoBriefcase,
  IoPeople,
  IoBook,
  IoSettings,
  IoLogOut,
  IoClose,
  IoBusiness,
} from 'react-icons/io5';
import useAuthStore from '../../../store/authStore';

const AdminSidebar = ({ activeSection, setActiveSection, isSidebarOpen, setIsSidebarOpen }) => {
  const { logout } = useAuthStore();

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: IoApps },
    { id: 'internship', label: 'Internship', icon: IoBriefcase },
    { id: 'candidates', label: 'Candidates', icon: IoPeople },
    { id: 'resources', label: 'Learning Resources', icon: IoBook },
    { id: 'companies', label: 'Companies', icon: IoBusiness },
    { id: 'tools', label: 'Tools', icon: IoSettings },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="md:hidden absolute inset-0 bg-slate-900/35 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`absolute md:static left-0 top-0 h-full w-60 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-end">
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-500">
            <IoClose size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-white text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Icon size={16} />
                </div>
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && <div className="w-2 h-2 bg-indigo-500 rounded-full" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4 mt-auto space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-rose-50 text-rose-600 font-semibold border border-rose-100 hover:bg-rose-100 transition-colors duration-200"
          >
            <IoLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
