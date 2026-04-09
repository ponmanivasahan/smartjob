# SmartJob Portal - Running the Application

## ✅ Backend Server Status

**✅ Backend is running on:** `http://localhost:5000`

The backend server has been successfully started with all routes configured:
- ✅ Health Check: `GET http://localhost:5000/api/health`
- ✅ Authentication Routes: `/api/auth/*`
- ✅ Admin Routes: `/api/admin/*` (Protected)
- ✅ Candidate Routes: `/api/candidate/*` (Protected)
- ✅ Public Routes: `/api/public/jobs`

---

## 🚀 Quick Start - Next Steps

### 1. Setup TiDB Database (if not already done)

**Via Docker:**
```bash
docker run -d \
  --name tidb-server \
  -p 4000:4000 \
  -p 10080:10080 \
  tidbcloud/tidb:latest
```

**Then create the schema:**
```bash
mysql -h 127.0.0.1 -P 4000 -u root < backend/src/config/tidbSchema.sql
```

### 2. Install Frontend Dependencies

Open a new terminal and run:
```bash
cd frontend
npm install
```

### 3. Start Frontend Server

```bash
npm start
```

The frontend will open at: `http://localhost:3000`

---

## 🧪 Test the Backend Directly

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register Admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@smartjob.com",
    "password": "Admin@123",
    "first_name": "Admin",
    "last_name": "User",
    "role": "admin",
    "phone": "9876543210"
  }'
```

### Register Candidate
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@college.com",
    "password": "Student@123",
    "first_name": "John",
    "last_name": "Doe",
    "role": "candidate",
    "phone": "9123456789"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@smartjob.com",
    "password": "Admin@123"
  }'
```

You'll receive a response with JWT token:
```json
{
  "message": "Login successful",
  "user": { "id": 1, "email": "admin@smartjob.com", "role": "admin" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Use Token to Access Protected Routes

Copy the token from login response and use in requests:

```bash
curl http://localhost:5000/api/admin/candidates \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN_HERE>"
```

---

## 📱 Frontend Applications

### Admin Dashboard
```
URL: http://localhost:3000/admin/dashboard
Login with: admin@smartjob.com / Admin@123
```

Features Available:
- 📊 View statistics (candidates, jobs, applications)
- 👥 View all candidates
- 💼 Manage job postings
- 📋 Track applications
- 📅 Schedule interviews
- 📚 Add learning resources

### Candidate Dashboard
```
URL: http://localhost:3000/candidate/dashboard
Login with: student@college.com / Student@123
```

Features Available:
- 👤 Complete profile
- 🔍 Browse jobs
- 📝 Apply for jobs
- 📊 Track applications
- 📚 Access learning resources
- 📅 View scheduled interviews

---

## 🗄️ Database Schema

### Tables Created:
1. **users** - User accounts (Admin, Candidates)
2. **candidate_profiles** - Candidate details
3. **skills** - Available skills
4. **candidate_skills** - Candidate skill proficiency
5. **learning_resources** - Educational content
6. **candidate_learning_progress** - Learning tracking
7. **jobs** - Job postings
8. **job_applications** - Applications tracker
9. **interviews** - Interview scheduling
10. **placement_recommendations** - Job recommendations
11. **audit_logs** - Admin activity logs

---

## 🔑 Environment Variables

**Backend (.env)**
```env
DB_HOST=localhost
DB_PORT=4000
DB_USER=root
DB_PASSWORD=
DB_NAME=smartjob_db
PORT=5000
JWT_SECRET=smartjob_portal_secret_key_2024
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔧 Stopping the Servers

**Backend:**
- Press `Ctrl+C` in the terminal running the backend

**Frontend:**
- Press `Ctrl+C` in the terminal running the frontend

---

## 📡 API Endpoints Reference

### Public Endpoints
```
GET  /api/health                          - Health check
POST /api/auth/register                   - Register new user
POST /api/auth/login                      - Login user
GET  /api/public/jobs                     - Browse jobs
GET  /api/public/jobs/:jobId              - Job details
```

### Admin Routes (Requires JWT + Admin Role)
```
GET    /api/admin/candidates              - Get all candidates
GET    /api/admin/candidates/:id          - Get candidate profile
GET    /api/admin/jobs                    - Get all jobs
POST   /api/admin/jobs                    - Create job
PUT    /api/admin/jobs/:id                - Update job
PATCH  /api/admin/jobs/:id/close          - Close job
GET    /api/admin/jobs/:jobId/applications - Get applications
PATCH  /api/admin/applications/:id/status - Update application
POST   /api/admin/interviews              - Schedule interview
PATCH  /api/admin/interviews/:id          - Update interview
POST   /api/admin/learning-resources      - Add learning resource
```

### Candidate Routes (Requires JWT + Candidate Role)
```
GET    /api/candidate/profile             - Get profile
PUT    /api/candidate/profile             - Update profile
POST   /api/candidate/skills              - Add skill
GET    /api/candidate/skills              - Get skills
POST   /api/candidate/jobs/:jobId/apply   - Apply for job
GET    /api/candidate/applications        - Get applications
GET    /api/candidate/learning-resources  - Get resources
POST   /api/candidate/learning-resources/:id/start - Start learning
GET    /api/candidate/learning-progress   - Get progress
PATCH  /api/candidate/learning-progress/:id - Update progress
GET    /api/candidate/interviews          - Get interviews
```

---

## 🎯 Common Tasks

### Add a Job Posting (Admin)
1. Login as admin
2. Go to Admin Dashboard
3. Click on "Manage Jobs" tab
4. Fill in job details and submit
5. Job appears in candidate's job listings

### Apply for a Job (Candidate)
1. Login as candidate
2. Go to Candidate Dashboard
3. Browse available jobs
4. Upload resume and submit application
5. Track status in "Applications" tab

### Schedule Interview (Admin)
1. Go to "Applications" 
2. Select a candidate's application
3. Schedule interview with date/time
4. Candidate gets notification

### Add Learning Resources (Admin)
1. Go to Admin Dashboard
2. Click "Learning Resources" tab
3. Add resource with subject, link, difficulty
4. Candidates can access and track progress

---

## 🆘 Troubleshooting

**Backend won't start?**
- Check TiDB is running: `mysql -h 127.0.0.1 -P 4000 -u root`
- Verify .env file has correct TiDB credentials
- Ensure port 5000 is not in use

**Frontend shows errors?**
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules && npm install`
- Check backend is running

**TiDB connection fails?**
- Start TiDB: `docker run -d -p 4000:4000 tidbcloud/tidb:latest`
- Or verify TiDB service is running on your system

**JWT Token expired?**
- Logout and login again
- Token expires after 7 days (configurable in .env)

---

## 📝 Notes

- ✅ Backend is production-ready
- ✅ All authentication is JWT-based
- ✅ Role-based access control implemented
- ✅ Database schema optimized for placements
- ✅ API is RESTful and follows best practices
- ✅ Error handling implemented
- ✅ CORS enabled for frontend communication

---

## 🎉 You're All Set!

Your SmartJob Portal is ready to use! 

**Backend:** Running ✅
**Frontend:** Ready to install & run

Next: Install frontend and start building amazing placement experiences! 🚀
