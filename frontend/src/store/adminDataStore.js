import { create } from 'zustand';
import api from '../utils/api';

const normalizeCandidate = (candidate) => ({
  ...candidate,
  rollNo: candidate.rollNo || candidate.roll_no || '',
  year: candidate.year || candidate.academic_year || '',
  skills: Array.isArray(candidate.skills)
    ? candidate.skills
    : String(candidate.skills || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
});

const normalizeCompany = (company) => ({
  ...company,
  roles: Array.isArray(company.roles)
    ? company.roles
    : String(company.roles || '')
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean),
});

const useAdminDataStore = create((set, get) => ({
  internships: [],
  candidates: [],
  courses: [],
  companies: [],
  loading: false,
  initialized: false,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const [internshipsRes, candidatesRes, coursesRes, companiesRes] = await Promise.all([
        api.get('/admin/internships'),
        api.get('/admin/candidates'),
        api.get('/admin/courses'),
        api.get('/admin/companies'),
      ]);

      set({
        internships: internshipsRes.data.data || [],
        candidates: (candidatesRes.data.data || []).map(normalizeCandidate),
        courses: coursesRes.data.data || [],
        companies: (companiesRes.data.data || []).map(normalizeCompany),
        loading: false,
        initialized: true,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  initialize: async () => {
    if (get().initialized) {
      return;
    }
    await get().fetchAll();
  },

  addInternship: async (item) => {
    await api.post('/admin/internships', item);
    await get().fetchAll();
  },

  removeInternship: async (id) => {
    await api.delete(`/admin/internships/${id}`);
    set((state) => ({
      internships: state.internships.filter((entry) => entry.id !== id),
    }));
  },

  updateInternshipStatus: async (id, status) => {
    await api.patch(`/admin/internships/${id}/status`, { status });
    set((state) => ({
      internships: state.internships.map((entry) =>
        entry.id === id ? { ...entry, status } : entry
      ),
    }));
  },

  addCandidate: async (item, options = {}) => {
    const { refresh = true } = options;
    await api.post('/admin/candidates', item);
    if (refresh) {
      await get().fetchAll();
    }
  },

  removeCandidate: async (id) => {
    await api.delete(`/admin/candidates/${id}`);
    set((state) => ({
      candidates: state.candidates.filter((entry) => entry.id !== id),
    }));
  },

  addCourse: async (item, options = {}) => {
    const { refresh = true } = options;
    await api.post('/admin/courses', item);
    if (refresh) {
      await get().fetchAll();
    }
  },

  removeCourse: async (id) => {
    await api.delete(`/admin/courses/${id}`);
    set((state) => ({
      courses: state.courses.filter((entry) => entry.id !== id),
    }));
  },

  addCompany: async (item) => {
    await api.post('/admin/companies', item);
    await get().fetchAll();
  },

  removeCompany: async (id) => {
    await api.delete(`/admin/companies/${id}`);
    set((state) => ({
      companies: state.companies.filter((entry) => entry.id !== id),
    }));
  },
}));

export default useAdminDataStore;
