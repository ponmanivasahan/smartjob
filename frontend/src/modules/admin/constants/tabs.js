import { IoPeople, IoBriefcase, IoAdd, IoCalendar } from 'react-icons/io5';

export const ADMIN_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'jobs', label: 'Manage Jobs' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'resources', label: 'Learning Resources' },
];

export const ADMIN_STAT_CARDS = [
  {
    id: 'candidates',
    title: 'Total Candidates',
    statKey: 'candidates',
    icon: IoPeople,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    id: 'jobs',
    title: 'Active Jobs',
    statKey: 'jobs',
    icon: IoBriefcase,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    id: 'applications',
    title: 'Applications',
    statKey: 'applications',
    icon: IoAdd,
    gradient: 'from-green-500 to-green-600',
  },
  {
    id: 'interviews',
    title: 'Interviews Scheduled',
    statKey: 'interviews',
    icon: IoCalendar,
    gradient: 'from-orange-500 to-orange-600',
  },
];
