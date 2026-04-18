import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const useAdminStats = () => {
  const [stats, setStats] = useState({
    candidates: 0,
    jobs: 0,
    applications: 0,
    interviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [candidatesRes, jobsRes] = await Promise.all([
        api.get('/admin/candidates'),
        api.get('/admin/jobs'),
      ]);

      setStats({
        candidates: candidatesRes.data.count || 0,
        jobs: jobsRes.data.count || 0,
        applications: 0,
        interviews: 0,
      });
    } catch (error) {
      toast.error('Failed to fetch statistics');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchStats };
};

export default useAdminStats;
