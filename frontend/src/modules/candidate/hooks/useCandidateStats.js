import { useState, useEffect } from 'react';
import api from '../../../utils/api';

const useCandidateStats = (user) => {
  const [stats, setStats] = useState({
    appliedJobs: 0,
    shortlisted: 0,
    learningProgress: 0,
    upcomingInterviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [applicationsRes] = await Promise.all([
        api.get('/candidate/applications'),
      ]);

      setStats({
        appliedJobs: applicationsRes.data.data?.length || 0,
        shortlisted: applicationsRes.data.data?.filter(
          (app) => app.application_status === 'shortlisted'
        ).length || 0,
        learningProgress: 0,
        upcomingInterviews: 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchStats };
};

export default useCandidateStats;
