import React, { useState } from 'react';
import useAdminStats from '../hooks/useAdminStats';
import { ADMIN_TABS, ADMIN_STAT_CARDS } from '../constants/tabs';
import StatCard from '../components/shared/StatCard';
import TabHeader from '../components/shared/TabHeader';
import AdminOverviewTab from '../components/tabs/AdminOverviewTab';
import AdminJobsTab from '../components/tabs/AdminJobsTab';
import AdminCandidatesTab from '../components/tabs/AdminCandidatesTab';
import AdminResourcesTab from '../components/tabs/AdminResourcesTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { stats, loading } = useAdminStats();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverviewTab />;
      case 'jobs':
        return <AdminJobsTab />;
      case 'candidates':
        return <AdminCandidatesTab />;
      case 'resources':
        return <AdminResourcesTab />;
      default:
        return <AdminOverviewTab />;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your platform, candidates, and job postings</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {ADMIN_STAT_CARDS.map((card) => (
          <StatCard
            key={card.id}
            title={card.title}
            value={loading ? '-' : stats[card.statKey]}
            icon={card.icon}
            gradient={card.gradient}
          />
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <TabHeader tabs={ADMIN_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
