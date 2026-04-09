# 🚀 QuickStart - SmartJob Portal

## Get Started in 5 Minutes!

### Prerequisites Check
- [x] Node.js installed
- [x] TiDB running (or about to start)
- [x] Backend dependencies installed ✅
- [x] Frontend dependencies installed ✅

---

## Step 1️⃣: Start TiDB Database

```bash
# Option A: Docker (easiest)
docker run -d -p 4000:4000 tidbcloud/tidb:latest

# Option B: Already installed?
# Just verify it's running
mysql -h 127.0.0.1 -P 4000 -u root -e "SELECT 1"
```

---

## Step 2️⃣: Create Database Schema

Open a terminal and run:

```bash
mysql -h 127.0.0.1 -P 4000 -u root < backend/src/config/tidbSchema.sql
```

✅ Your database is ready!

---

## Step 3️⃣: Backend is Already Running! ✅

The backend server is already started on:
```
http://localhost:5000
```

Check it's working:
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Server is running"}
```

---

## Step 4️⃣: Start Frontend (New Terminal)

```bash
cd frontend
npm start
```

This will:
- Install a dev server
- Open browser automatically
- Show frontend on `http://localhost:3000`

---

## Step 5️⃣: Create Your First Account

1. Open `http://localhost:3000`
2. Click "Register"
3. Fill in details:
   ```
   Email: admin@example.com
   Password: Admin@123
   First Name: Admin
   Last Name: User
   Role: admin (select from dropdown)
   ```
4. Click "Register"
5. You'll be redirected to login
6. Login with same credentials

---

## 🎮 Explore Admin Dashboard

After login, you'll see:
- 📊 Dashboard with statistics
- 👥 View candidates
- 💼 Create/manage jobs
- 📋 View applications
- 📅 Schedule interviews
- 📚 Add learning resources

---

## 🎓 Create a Candidate Account

1. Logout (top right)
2. Click "Register"
3. Register as candidate:
   ```
   Email: student@college.com
   Password: Student@123
   First Name: John
   Last Name: Doe
   Role: candidate
   ```
4. Login with candidate credentials

---

## 🎯 Test Candidate Features

After login as candidate:

1. **View Profile Tab**
   - See your profile info
   - Update college, CGPA, etc.

2. **Browse Jobs** (if admin posted any)
   - See job listings
   - Click to view details

3. **Apply for Jobs**
   - Upload resume
   - Write cover letter
   - Submit application

4. **View Applications**
   - Track all applications
   - See status updates

---

## 📡 Test API Directly (Optional)

### Register Admin via API
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@admin.com",
    "password": "Admin@123",
    "first_name": "API",
    "last_name": "Admin",
    "role": "admin",
    "phone": "9876543210"
  }'
```

### Login via API
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@admin.com",
    "password": "Admin@123"
  }'
```

Copy the `token` from response, then:

### Post a Job via API
```bash
curl -X POST http://localhost:5000/api/admin/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <PASTE_TOKEN_HERE>" \
  -d '{
    "company_name": "Google",
    "job_title": "Software Engineer",
    "description": "Great opportunity",
    "salary_min": 500000,
    "salary_max": 1000000,
    "location": "Bangalore",
    "job_type": "full-time",
    "experience_required": 0,
    "required_skills": ["JavaScript", "React"]
  }'
```

---

## 🧪 Complete User Flow

### Admin Flow
```
1. Register as Admin
2. Login → Admin Dashboard
3. Post a Job
4. View Candidates
5. Check Applications
6. Schedule Interview
7. Add Learning Resource
```

### Candidate Flow
```
1. Register as Candidate
2. Login → Candidate Dashboard
3. Update Profile
4. Add Skills
5. Browse Jobs
6. Apply for Job
7. Track Applications
8. View Interviews
9. Access Learning Resources
```

---

## 🛠️ Common Issues & Fixes

**Q: "Cannot connect to TiDB"**
```bash
# Start Docker container
docker run -d -p 4000:4000 tidbcloud/tidb:latest

# Verify connection
mysql -h 127.0.0.1 -P 4000 -u root -e "SELECT 1"
```

**Q: "Frontend shows blank page"**
```bash
# Clear cache and restart
cd frontend
npm cache clean --force
npm start
```

**Q: "Backend not responding"**
```bash
# Restart backend
cd backend
node src/index.js

# Verify
curl http://localhost:5000/api/health
```

**Q: "Forgot to import schema"**
```bash
# Import now
mysql -h 127.0.0.1 -P 4000 -u root < backend/src/config/tidbSchema.sql
```

---

## 📚 Useful Links

- Backend API Docs: See `backend/README.md`
- Frontend Guide: See `frontend/README.md`
- Full Setup: See `SETUP_GUIDE.md`
- How to Run: See `RUNNING.md`
- Project Summary: See `PROJECT_SUMMARY.md`

---

## ✅ Success Checklist

- [ ] TiDB running
- [ ] Database schema created
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 3000)
- [ ] Admin account created
- [ ] Candidate account created
- [ ] Admin dashboard accessible
- [ ] Candidate dashboard accessible

---

## 🎉 You're Ready!

Your SmartJob Portal is ready to use!

**URLs:**
- 🏠 Frontend: http://localhost:3000
- ⚙️ Backend API: http://localhost:5000
- 💾 Database: localhost:4000

**Test Accounts:**
- Admin: admin@example.com / Admin@123
- Candidate: student@college.com / Student@123

---

## 🚀 Next Steps

1. ✅ Explore the admin panel
2. ✅ Create some jobs
3. ✅ Test candidate features
4. ✅ Schedule interviews
5. ✅ Add learning resources

**Enjoy your SmartJob Portal!** 🎓💼

---

**Need Help?**
- Check the documentation files
- Review API endpoints in backend/README.md
- Check browser console for errors
- Check terminal for server errors

**Happy Coding!** 🚀
