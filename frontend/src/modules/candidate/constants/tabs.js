import { IoBriefcase, IoBook, IoCheckmark, IoCalendar } from 'react-icons/io5';

export const CANDIDATE_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'applications', label: 'Applications' },
  { id: 'learning', label: 'Learning' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'profile', label: 'Profile' },
];

export const CANDIDATE_STAT_CARDS = [
  {
    id: 'appliedJobs',
    title: 'Jobs Applied',
    statKey: 'appliedJobs',
    icon: IoBriefcase,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    id: 'shortlisted',
    title: 'Shortlisted',
    statKey: 'shortlisted',
    icon: IoCheckmark,
    gradient: 'from-green-500 to-green-600',
  },
  {
    id: 'learning',
    title: 'Learning Progress',
    statKey: 'learningProgress',
    icon: IoBook,
    gradient: 'from-purple-500 to-purple-600',
    suffix: '%',
  },
  {
    id: 'interviews',
    title: 'Upcoming Interviews',
    statKey: 'upcomingInterviews',
    icon: IoCalendar,
    gradient: 'from-orange-500 to-orange-600',
  },
];
