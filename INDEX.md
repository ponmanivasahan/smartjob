# 📖 SmartJob Portal - Documentation Index

## 🎯 Quick Navigation

Start here to understand and use your SmartJob Portal!

---

## 🚀 Getting Started (READ FIRST!)

### For Complete Beginners
👉 **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes!
- Prerequisites check
- Step-by-step instructions
- Create first account
- Test all features

### For Detailed Setup
👉 **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup guide
- TiDB installation options
- Backend configuration
- Frontend installation
- Testing instructions
- Troubleshooting

### Current Status
👉 **[RUNNING.md](RUNNING.md)** - How to run right now
- Backend is running ✅
- Frontend setup next
- API endpoint reference
- Common tasks

---

## 📚 Project Documentation

### Project Overview
👉 **[README.md](README.md)** - Main project readme
- Features overview
- Technology stack
- Project structure
- Key highlights

### Complete Summary
👉 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - In-depth summary
- Full feature list
- Architecture diagram
- All database tables
- Technology details

### Project Completion
👉 **[COMPLETION_REPORT.md](COMPLETION_REPORT.md)** - What was built
- Everything created (38 files)
- Current status (✅ RUNNING)
- Statistics and metrics
- Quality metrics

### File Organization
👉 **[FILE_STRUCTURE.md](FILE_STRUCTURE.md)** - File organization
- Complete directory tree
- File-by-file breakdown
- Code statistics
- Module relationships

---

## 🔧 Developer Documentation

### Backend API
👉 **[backend/README.md](backend/README.md)**
- Setup instructions
- Database schema
- API endpoints (all 40+)
- Example requests
- Environment variables

### Frontend Guide
👉 **[frontend/README.md](frontend/README.md)**
- Installation steps
- Environment setup
- Features list
- Folder structure
- Pages available

---

## 📊 Architecture & Design

### Database Schema
- **Location**: `backend/src/config/tidbSchema.sql`
- **Tables**: 13 optimized tables
- **Relationships**: Foreign keys configured
- **Indexes**: Performance optimized

### API Architecture
- **Base URL**: http://localhost:5000/api
- **Authentication**: JWT tokens
- **Access Control**: Role-based (Admin, Candidate, HR)
- **Endpoints**: 40+ RESTful endpoints

### Frontend Architecture
- **URLs**:
  - Public: http://localhost:3000
  - Admin Dashboard: /admin/dashboard
  - Candidate Dashboard: /candidate/dashboard
- **State Management**: Zustand
- **UI Framework**: Tailwind CSS

---

## 🧪 Testing & Verification

### Test Current Status

**Backend Health Check**:
```bash
curl http://localhost:5000/api/health
```

**Create Test Accounts** *(See RUNNING.md for details)*

**Admin Account**:
- Email: admin@example.com
- Password: Admin@123
- Access: /admin/dashboard

**Candidate Account**:
- Email: student@college.com
- Password: Student@123
- Access: /candidate/dashboard

---

## 📱 Features by Module

### Admin Module
Located: `frontend/src/modules/admin/AdminDashboard.js`

Features:
- 📊 Dashboard with 4 statistic cards
- 👥 View all candidates
- 💼 Manage job listings
- 📋 Track applications
- 📅 Schedule interviews
- 📚 Add learning resources

### Candidate Module
Located: `frontend/src/modules/candidate/CandidateDashboard.js`

Features:
- 👤 Complete profile
- 🔍 Browse jobs
- 📝 Apply for jobs
- 📊 Track applications
- 📚 Access learning resources
- 📅 View interviews
- 🎯 Track skills

---

## 🔑 Key Information

### Backend Server
```
Status:     ✅ RUNNING
Port:       5000
URL:        http://localhost:5000
Health:     /api/health
```

### Database
```
Type:       TiDB (MySQL Compatible)
Port:       4000
Database:   smartjob_db
User:       root
Schema:     backend/src/config/tidbSchema.sql
```

### Frontend Server
```
Status:     Ready to start
Port:       3000
Command:    npm start (from frontend directory)
URL:        http://localhost:3000
```

---

## 🎯 Common Tasks

### How to... POST A JOB (Admin)
1. Login as admin
2. Go to Admin Dashboard
3. Open "Manage Jobs" tab
4. Fill job details
5. Submit

See: RUNNING.md → Common Tasks

### How to... APPLY FOR JOB (Candidate)
1. Login as candidate
2. Go to Candidate Dashboard
3. Browse available jobs
4. Upload resume
5. Submit application

See: RUNNING.md → Common Tasks

### How to... SCHEDULE INTERVIEW (Admin)
1. View applications
2. Select a candidate
3. Click "Schedule Interview"
4. Set date/time
5. Send notification

See: RUNNING.md → Common Tasks

### How to... ADD LEARNING RESOURCE (Admin)
1. Go to Learning Resources tab
2. Add subject name
3. Add resource link
4. Set difficulty level
5. Save

See: RUNNING.md → Common Tasks

---

## 🐛 Troubleshooting

### Issue: Backend not responding
👉 See [SETUP_GUIDE.md](SETUP_GUIDE.md) - Troubleshooting section

### Issue: Frontend blank page
👉 Check [RUNNING.md](RUNNING.md) - Troubleshooting section

### Issue: Database connection error
👉 See [SETUP_GUIDE.md](SETUP_GUIDE.md) - TiDB Setup section

---

## 📋 File Reference

| Document | Purpose | Read When |
|----------|---------|-----------|
| README.md | Project overview | First |
| QUICKSTART.md | Fast setup guide | Setting up |
| SETUP_GUIDE.md | Detailed setup | Need details |
| RUNNING.md | How to run | About to start |
| PROJECT_SUMMARY.md | Features & architecture | Learning project |
| FILE_STRUCTURE.md | File organization | Understanding code |
| COMPLETION_REPORT.md | What was built | Project status |
| backend/README.md | Backend API docs | Development |
| frontend/README.md | Frontend guide | Frontend dev |

---

## 🗂️ File Structure Quick Reference

```
smartjob/
├── 📖 Documentation (you're here!)
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── SETUP_GUIDE.md
│   ├── RUNNING.md
│   ├── PROJECT_SUMMARY.md
│   └── FILE_STRUCTURE.md
│
├── 🏗️ Backend (Express API)
│   ├── src/controllers/  (business logic)
│   ├── src/routes/       (API endpoints)
│   ├── src/config/       (database)
│   └── node_modules/     (dependencies)
│
└── 🎨 Frontend (React)
    ├── src/modules/      (admin & candidate)
    ├── src/pages/        (auth pages)
    ├── src/components/   (UI components)
    └── node_modules/     (dependencies)
```

---

## 🚀 Quick Start Path

1. **First Time?**
   - Read: [QUICKSTART.md](QUICKSTART.md)
   - Time: 5 minutes
   - Gets you running immediately

2. **Need Details?**
   - Read: [SETUP_GUIDE.md](SETUP_GUIDE.md)
   - Time: 15 minutes
   - Covers all options

3. **Learning the System?**
   - Read: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
   - Read: [FILE_STRUCTURE.md](FILE_STRUCTURE.md)
   - Time: 20 minutes
   - Understand architecture

4. **Development?**
   - Read: [backend/README.md](backend/README.md)
   - Read: [frontend/README.md](frontend/README.md)
   - Time: As needed
   - API and feature details

---

## 💡 Tips

- ✅ All documentation is written for beginners
- ✅ Each guide has step-by-step instructions
- ✅ Examples provided for common tasks
- ✅ Troubleshooting sections included
- ✅ API documentation with cURL examples
- ✅ Architecture diagrams provided

---

## 🎓 Learning Order

### For Deployment
1. QUICKSTART.md → RUNNING.md → SETUP_GUIDE.md

### For Development
1. README.md → PROJECT_SUMMARY.md → backend/README.md → frontend/README.md

### For Understanding Architecture
1. PROJECT_SUMMARY.md → FILE_STRUCTURE.md → COMPLETION_REPORT.md

---

## 📞 Getting Help

**All Documentation Located At:**
- `QUICKSTART.md` - Start here
- `SETUP_GUIDE.md` - Full setup
- `RUNNING.md` - Running instructions
- `backend/README.md` - API docs
- `frontend/README.md` - UI docs

**Common Issues:**
See "Troubleshooting" sections in:
- SETUP_GUIDE.md
- RUNNING.md
- backend/README.md

---

## ✅ Verification Checklist

- [ ] Read QUICKSTART.md
- [ ] Started backend (check RUNNING.md)
- [ ] Started frontend (or ready to)
- [ ] Created test account
- [ ] Accessed admin or candidate dashboard
- [ ] Explored the portal

---

## 🎉 Ready to Go!

You have everything you need to:
- ✅ Understand the system
- ✅ Set it up correctly
- ✅ Run it successfully
- ✅ Develop features
- ✅ Deploy to production

**Start with [QUICKSTART.md](QUICKSTART.md) now!**

---

**Last Updated**: April 9, 2026
**Project Status**: ✅ COMPLETE
**Backend**: ✅ RUNNING

Enjoy your SmartJob Portal! 🚀
