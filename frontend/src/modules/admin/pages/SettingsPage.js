import React, { useState } from 'react';
import { IoCheckmark, IoClose, IoBusiness, IoPeople, IoBriefcase, IoBook } from 'react-icons/io5';
import * as XLSX from 'xlsx';
import useAdminDataStore from '../../../store/adminDataStore';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [pendingExcelCandidates, setPendingExcelCandidates] = useState([]);

  const addCompany = useAdminDataStore((state) => state.addCompany);
  const addCandidate = useAdminDataStore((state) => state.addCandidate);
  const fetchAll = useAdminDataStore((state) => state.fetchAll);
  const addInternship = useAdminDataStore((state) => state.addInternship);
  const addCourse = useAdminDataStore((state) => state.addCourse);

  const [companyForm, setCompanyForm] = useState({
    name: '',
    campus: '',
    visitingDate: '',
    roles: '',
    openings: 0,
    mode: 'On Campus',
  });

  const [candidateForm, setCandidateForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    cgpa: '',
    skills: '',
    resume: '',
  });

  const [internshipForm, setInternshipForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
  });

  const [courseForm, setCourseForm] = useState({
    title: '',
    category: 'Frontend',
    level: 'Beginner',
    duration: '20 hours',
    platform: '',
  });

  const showSuccess = (message) => {
    setSaveSuccess(message);
    setTimeout(() => setSaveSuccess(''), 2200);
  };

  const readCell = (row, keys) => {
    for (const key of keys) {
      const value = row[key];
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        return String(value).trim();
      }
    }
    return '';
  };

  const handleCandidateExcelUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) {
        return;
      }

      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      if (!rows.length) {
        toast.error('Excel sheet is empty');
        return;
      }

      const preparedCandidates = [];
      const skippedRows = [];

      rows.forEach((row, index) => {
        const rowNumber = index + 2;
        const name = readCell(row, ['name', 'Name']);
        const rollNo = readCell(row, ['roll no', 'Roll No', 'rollNo', 'RollNo', 'roll_no', 'Roll_No']);
        const year = readCell(row, ['year', 'Year']);
        const department = readCell(row, ['department', 'Department']);
        const semester = readCell(row, ['semester', 'Semester', 'sem', 'Sem']);

        if (!name || !rollNo || !year || !department || !semester) {
          skippedRows.push(rowNumber);
          return;
        }

        const generatedEmail = `${rollNo.toLowerCase().replace(/\s+/g, '')}@smartjob.local`;

        preparedCandidates.push({
          name,
          email: generatedEmail,
          rollNo,
          year,
          department,
          semester,
          phone: '',
          college: '',
          cgpa: Number(readCell(row, ['cgpa', 'CGPA']) || 0),
          skills: [],
          resume: '',
          status: readCell(row, ['status', 'Status']) || 'Active',
          applications: 0,
        });
      });

      if (preparedCandidates.length > 0) {
        setPendingExcelCandidates(preparedCandidates);
        toast.success(`${preparedCandidates.length} row(s) ready. Click Add to save.`);
      }

      if (skippedRows.length > 0) {
        const previewRows = skippedRows.slice(0, 5).join(', ');
        const suffix = skippedRows.length > 5 ? ', ...' : '';
        toast.error(`Skipped ${skippedRows.length} row(s). Missing required fields in rows: ${previewRows}${suffix}`);
      }

      if (preparedCandidates.length === 0) {
        toast.error('No valid candidate rows were imported');
      }
    };

    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  const toolsCards = [
    {
      key: 'company',
      title: 'Company Management',
      desc: 'Add company visits to Companies page',
      icon: IoBusiness,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      key: 'candidate',
      title: 'Candidate Management',
      desc: 'Add candidates to Candidates page',
      icon: IoPeople,
      color: 'text-green-600 bg-green-50 border-green-100',
    },
    {
      key: 'internship',
      title: 'Internship Management',
      desc: 'Add internship posts to Internship page',
      icon: IoBriefcase,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      key: 'course',
      title: 'Course Management',
      desc: 'Add courses to Learning Resources page',
      icon: IoBook,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      key: 'resources',
      title: 'Resources Management',
      desc: 'Add learning resources to Learning Resources page',
      icon: IoBook,
      color: 'text-violet-700 bg-violet-50 border-violet-100',
    },
  ];

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Tools</h2>
        <p className="text-gray-600">Use the cards below to add data to each specific page</p>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl shadow-sm animate-slide-down">
          <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
            <IoCheckmark size={18} className="text-white" />
          </div>
          <span className="font-semibold">{saveSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {toolsCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => setActiveModal(card.key)}
              className="text-left bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${card.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{card.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeModal === 'company' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCompany(companyForm);
              setCompanyForm({ name: '', campus: '', visitingDate: '', roles: '', openings: 0, mode: 'On Campus' });
              setActiveModal(null);
              showSuccess('Company added to Companies page');
            }}
            className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Add Company</h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-gray-500"><IoClose size={20} /></button>
            </div>
            <div className="space-y-3 mt-3 max-h-[calc(90vh-110px)] overflow-y-auto pr-1 custom-scrollbar">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
              <input required value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} placeholder="Company Name" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Campus</label>
              <input required value={companyForm.campus} onChange={(e) => setCompanyForm({ ...companyForm, campus: e.target.value })} placeholder="Campus" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Visiting Date</label>
              <input required type="date" value={companyForm.visitingDate} onChange={(e) => setCompanyForm({ ...companyForm, visitingDate: e.target.value })} className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Roles (comma separated)</label>
              <input required value={companyForm.roles} onChange={(e) => setCompanyForm({ ...companyForm, roles: e.target.value })} placeholder="Roles (comma separated)" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Openings</label>
              <input required type="number" value={companyForm.openings} onChange={(e) => setCompanyForm({ ...companyForm, openings: e.target.value })} placeholder="Openings" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
            </div>
            </div>
          </form>
        </div>
      )}

      {activeModal === 'candidate' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                if (pendingExcelCandidates.length > 0) {
                  for (const candidate of pendingExcelCandidates) {
                    await addCandidate(candidate, { refresh: false });
                  }
                  await fetchAll();
                  setPendingExcelCandidates([]);
                  setActiveModal(null);
                  showSuccess('Candidates added to Candidates page');
                  return;
                }

                await addCandidate({
                  ...candidateForm,
                  phone: candidateForm.phone || '',
                  college: candidateForm.college || '',
                  cgpa: Number(candidateForm.cgpa || 0),
                  skills: candidateForm.skills || [],
                  resume: candidateForm.resume || '',
                  status: candidateForm.status || 'Active',
                  applications: Number(candidateForm.applications || 0),
                });
                setCandidateForm({ name: '', email: '', phone: '', college: '', cgpa: '', skills: '', resume: '' });
                setActiveModal(null);
                showSuccess('Candidate added to Candidates page');
              } catch (error) {
                toast.error(error.response?.data?.details || error.response?.data?.error || 'Failed to add candidate(s)');
              }
            }}
            className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Add Candidate</h3>
              <button type="button" onClick={() => { setPendingExcelCandidates([]); setActiveModal(null); }} className="text-gray-500"><IoClose size={20} /></button>
            </div>
            <div className="space-y-3 mt-3 max-h-[calc(90vh-110px)] overflow-y-auto pr-1 custom-scrollbar">
            {pendingExcelCandidates.length > 0 && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                {pendingExcelCandidates.length} Excel row(s) ready to save. Click Add to store them.
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Candidate Name</label>
              <input required={pendingExcelCandidates.length === 0} value={candidateForm.name} onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })} placeholder="Candidate Name" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input required={pendingExcelCandidates.length === 0} type="email" value={candidateForm.email} onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })} placeholder="Email" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
              <input value={candidateForm.phone} onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })} placeholder="Phone" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">College</label>
              <input value={candidateForm.college} onChange={(e) => setCandidateForm({ ...candidateForm, college: e.target.value })} placeholder="College" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CGPA</label>
              <input value={candidateForm.cgpa} onChange={(e) => setCandidateForm({ ...candidateForm, cgpa: Number(e.target.value) })} placeholder="CGPA" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Skills (comma separated)</label>
              <input value={candidateForm.skills} onChange={(e) => setCandidateForm({ ...candidateForm, skills: e.target.value })} placeholder="Skills (comma separated)" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Resume Summary</label>
              <textarea value={candidateForm.resume} onChange={(e) => setCandidateForm({ ...candidateForm, resume: e.target.value })} placeholder="Resume summary" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div className="rounded-lg border border-dashed border-blue-300 bg-blue-50 p-3">
              <p className="text-sm font-semibold text-blue-800 mb-2">Or upload Excel sheet (.xlsx/.xls)</p>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleCandidateExcelUpload}
                className="w-full text-sm text-gray-700"
              />
              <p className="text-xs text-gray-600 mt-2">Required columns: name, roll no, year, department, semester (optional: cgpa, status). Other details are auto-filled from candidate defaults.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => { setPendingExcelCandidates([]); setActiveModal(null); }} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
            </div>
            </div>
          </form>
        </div>
      )}

      {activeModal === 'internship' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addInternship(internshipForm);
              setInternshipForm({ title: '', company: '', location: '', salary: '', description: '' });
              setActiveModal(null);
              showSuccess('Internship added to Internship page');
            }}
            className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Add Internship</h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-gray-500"><IoClose size={20} /></button>
            </div>
            <div className="space-y-3 mt-3 max-h-[calc(90vh-110px)] overflow-y-auto pr-1 custom-scrollbar">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Role Title</label>
              <input required value={internshipForm.title} onChange={(e) => setInternshipForm({ ...internshipForm, title: e.target.value })} placeholder="Role Title" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
              <input required value={internshipForm.company} onChange={(e) => setInternshipForm({ ...internshipForm, company: e.target.value })} placeholder="Company" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <input required value={internshipForm.location} onChange={(e) => setInternshipForm({ ...internshipForm, location: e.target.value })} placeholder="Location" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Salary</label>
              <input required value={internshipForm.salary} onChange={(e) => setInternshipForm({ ...internshipForm, salary: e.target.value })} placeholder="Salary" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea value={internshipForm.description} onChange={(e) => setInternshipForm({ ...internshipForm, description: e.target.value })} placeholder="Description" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
            </div>
            </div>
          </form>
        </div>
      )}

      {activeModal === 'course' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCourse(courseForm);
              setCourseForm({ title: '', category: 'Frontend', level: 'Beginner', duration: '20 hours', platform: '' });
              setActiveModal(null);
              showSuccess('Course added to Learning Resources page');
            }}
            className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Add Course</h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-gray-500"><IoClose size={20} /></button>
            </div>
            <div className="space-y-3 mt-3 max-h-[calc(90vh-110px)] overflow-y-auto pr-1 custom-scrollbar">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Course Title</label>
              <input required value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} placeholder="Course Title" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <input required value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })} placeholder="Category" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Level</label>
              <input required value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })} placeholder="Level" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
              <input required value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} placeholder="Duration" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Platform</label>
              <input required value={courseForm.platform} onChange={(e) => setCourseForm({ ...courseForm, platform: e.target.value })} placeholder="Platform" className="w-full border px-3 py-2 rounded-lg" />
            </div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
            </div>
            </div>
          </form>
        </div>
      )}

      {activeModal === 'resources' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await addCourse({
                  ...courseForm,
                  enrolled: Number(courseForm.enrolled || 0),
                  rating: Number(courseForm.rating || 0),
                });
                setCourseForm({ title: '', category: 'Frontend', level: 'Beginner', duration: '20 hours', platform: '' });
                setActiveModal(null);
                showSuccess('Resource added to Learning Resources page');
              } catch {
                toast.error('Failed to add resource(s)');
              }
            }}
            className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Add Resources</h3>
              <button type="button" onClick={() => setActiveModal(null)} className="text-gray-500"><IoClose size={20} /></button>
            </div>

            <div className="space-y-3 mt-3 max-h-[calc(90vh-110px)] overflow-y-auto pr-1 custom-scrollbar">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Resource Title</label>
                <input required value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} placeholder="Resource Title" className="w-full border px-3 py-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <input required value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })} placeholder="Category" className="w-full border px-3 py-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Level</label>
                <input required value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })} placeholder="Level" className="w-full border px-3 py-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
                <input required value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} placeholder="Duration" className="w-full border px-3 py-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Platform</label>
                <input required value={courseForm.platform} onChange={(e) => setCourseForm({ ...courseForm, platform: e.target.value })} placeholder="Platform" className="w-full border px-3 py-2 rounded-lg" />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
