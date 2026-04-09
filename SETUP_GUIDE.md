# SmartJob Portal - Complete Setup Guide

## 🚀 Project Overview

SmartJob Portal is a full-stack college placement management system with separate Admin and Candidate modules.

### Key Features
- ✅ Admin Dashboard - Manage jobs, candidates, applications, interviews
- ✅ Candidate Dashboard - Track applications, learning progress, interviews
- ✅ Job Management - Post, update, close job listings
- ✅ Application Management - Track and manage job applications
- ✅ Interview Scheduling - Schedule and manage interviews
- ✅ Learning Resources - Curated learning paths for skill development
- ✅ Skill Tracking - Manage candidate skills and proficiency levels
- ✅ Authentication - JWT-based secure authentication

---

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **TiDB** running locally or on a server
- **Git** (optional)

---

## 🔧 TiDB Setup

### Option 1: Docker Setup (Recommended)

```bash
# Pull TiDB image
docker run -d \
  --name tidb-server \
  -p 4000:4000 \
  -p 10080:10080 \
  tidbcloud/tidb:latest

# Verify TiDB is running
mysql -h 127.0.0.1 -P 4000 -u root -p -e "SELECT 1"
```

### Option 2: Direct Installation

Download and install from [TiDB Official Site](https://docs.pingcap.com/tidb/stable/quick-start-with-tidb)

### Create Database

```bash
# Connect to TiDB
mysql -h localhost -P 4000 -u root

# Run schema file
mysql -h localhost -P 4000 -u root < backend/src/config/tidbSchema.sql
```

---

## 🏗️ Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create `.env` file in backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=4000
DB_USER=root
DB_PASSWORD=
DB_NAME=smartjob_db

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 3. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

✅ Backend running at: `http://localhost:5000`

Test health: `curl http://localhost:5000/api/health`

---

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create `.env` file in frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Server

```bash
npm start
```

✅ Frontend running at: `http://localhost:3000`

---

## 🧪 Testing the Application

### Admin Registration & Login

1. Go to `http://localhost:3000/register`
2. Register with:
   - Email: `admin@example.com`
   - Password: `password123`
   - Role: Select "admin"
3. Login at `http://localhost:3000/login`
4. Access Admin Dashboard at `/admin/dashboard`

### Candidate Registration & Login

1. Go to `http://localhost:3000/register`
2. Register with:
   - Email: `candidate@example.com`
   - Password: `password123`
   - Role: Select "candidate"
3. Login
4. Access Candidate Dashboard at `/candidate/dashboard`

---

## 📡 API Endpoints Reference

### Authentication (Public)
```
POST   /api/auth/register        Create new account
POST   /api/auth/login           Login user
GET    /api/profile              Get current user profile
```

### Admin Routes (Protected - Admin Only)
```
GET    /api/admin/candidates           Get all candidates
GET    /api/admin/candidates/:id       Get candidate profile
GET    /api/admin/jobs                 Get all jobs
POST   /api/admin/jobs                 Create job
PUT    /api/admin/jobs/:id             Update job
PATCH  /api/admin/jobs/:id/close       Close job
GET    /api/admin/jobs/:jobId/applications    Get job applications
PATCH  /api/admin/applications/:id/status     Update application status
POST   /api/admin/interviews           Schedule interview
PATCH  /api/admin/interviews/:id       Update interview
POST   /api/admin/learning-resources   Add learning resource
```

### Candidate Routes (Protected - Candidate Only)
```
GET    /api/candidate/profile          Get candidate profile
PUT    /api/candidate/profile          Update profile
POST   /api/candidate/skills           Add skill
GET    /api/candidate/skills           Get candidate skills
POST   /api/candidate/jobs/:jobId/apply    Apply for job
GET    /api/candidate/applications     Get applications
GET    /api/candidate/learning-resources   Get learning resources
POST   /api/candidate/learning-resources/:id/start   Start learning
GET    /api/candidate/learning-progress    Get learning progress
PATCH  /api/candidate/learning-progress/:id    Update progress
GET    /api/candidate/interviews       Get interviews
```

### Public Routes
```
GET    /api/public/jobs                Get available jobs
GET    /api/public/jobs/:jobId         Get job details
```

---

## 🗄️ Database Schema

### Tables
- **users** - Admin, Candidates, HR accounts
- **candidate_profiles** - Detailed candidate information
- **skills** - Available skills in system
- **candidate_skills** - Skills associated with candidates
- **learning_resources** - Educational content
- **candidate_learning_progress** - Candidate learning tracking
- **jobs** - Job postings
- **job_applications** - Job applications
- **interviews** - Interview scheduling
- **placement_recommendations** - Skill-based job recommendations
- **audit_logs** - Admin activity tracking

---

## 📂 Project Structure

```
smartjob/
├── backend/
│   ├── src/
│   │   ├── config/           Database & configuration
│   │   ├── controllers/      Business logic
│   │   ├── middleware/       Authentication & middleware
│   │   ├── models/           Data models
│   │   ├── routes/           API endpoints
│   │   └── index.js          Server entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/       Reusable UI components
    │   ├── pages/           Full page components
    │   ├── modules/
    │   │   ├── admin/       Admin module
    │   │   └── candidate/   Candidate module
    │   ├── store/           Zustand state management
    │   ├── utils/           Helper functions
    │   ├── App.js           Main app
    │   └── index.js         Entry point
    ├── public/
    ├── tailwind.config.js
    ├── package.json
    └── README.md
```

---

## 🛠️ Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
# Try different port: PORT=5001 npm run dev

# Check database connection
mysql -h localhost -P 4000 -u root
```

### Frontend Shows Blank Page
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### TiDB Connection Error
```bash
# Verify TiDB is running
mysql -h 127.0.0.1 -P 4000 -u root

# Reset password if locked
mysql -h 127.0.0.1 -P 4000 -u root
SET PASSWORD FOR 'root'@'%' = 'newpassword';
```

---

## 📝 Sample API Usage

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123",
    "first_name": "Admin",
    "last_name": "User",
    "role": "admin",
    "phone": "9876543210"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Post a Job (Admin)
```bash
curl -X POST http://localhost:5000/api/admin/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "company_name": "Google",
    "job_title": "Software Engineer",
    "description": "Great opportunity",
    "salary_min": 500000,
    "salary_max": 1000000,
    "location": "Bangalore",
    "job_type": "full-time",
    "experience_required": 0,
    "required_skills": ["JavaScript", "React", "Node.js"]
  }'
```

---

## 🎯 Next Steps

1. ✅ Set up TiDB database
2. ✅ Install backend dependencies
3. ✅ Configure .env files
4. ✅ Start backend server
5. ✅ Install frontend dependencies
6. ✅ Start frontend server
7. ✅ Register and test both admin & candidate portals

---

## 📞 Support & Documentation

- Backend Docs: See `backend/README.md`
- Frontend Docs: See `frontend/README.md`
- TiDB Docs: https://docs.pingcap.com/
- React Docs: https://react.dev/

Enjoy! 🎉
