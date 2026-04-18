import React, { useState } from 'react';
import useAuthStore from '../../../store/authStore';
import useCandidateStats from '../hooks/useCandidateStats';
import { CANDIDATE_TABS, CANDIDATE_STAT_CARDS } from '../constants/tabs';
import StatCard from '../components/shared/StatCard';
import TabHeader from '../components/shared/TabHeader';
import CandidateOverviewTab from '../components/tabs/CandidateOverviewTab';
import CandidateApplicationsTab from '../components/tabs/CandidateApplicationsTab';
import CandidateLearningTab from '../components/tabs/CandidateLearningTab';
import CandidateInterviewsTab from '../components/tabs/CandidateInterviewsTab';
import CandidateProfileTab from '../components/tabs/CandidateProfileTab';

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuthStore();
  const { stats, loading } = useCandidateStats(user);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CandidateOverviewTab />;
      case 'applications':
        return <CandidateApplicationsTab />;
      case 'learning':
        return <CandidateLearningTab />;
      case 'interviews':
        return <CandidateInterviewsTab />;
      case 'profile':
        return <CandidateProfileTab />;
      default:
        return <CandidateOverviewTab />;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome, {user?.first_name}!
        </h1>
        <p className="text-gray-600 mt-2">Track your job applications and learning progress</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {CANDIDATE_STAT_CARDS.map((card) => {
          const value = loading ? '-' : stats[card.statKey];
          const displayValue = card.suffix ? `${value}${card.suffix}` : value;
          
          return (
            <StatCard
              key={card.id}
              title={card.title}
              value={displayValue}
              icon={card.icon}
              gradient={card.gradient}
            />
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <TabHeader tabs={CANDIDATE_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
