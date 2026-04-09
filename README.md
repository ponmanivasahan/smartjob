# SmartJob Portal

A comprehensive college placement management system with separate admin and candidate modules.

## 🎯 Features

### Admin Module
- Manage job postings (create, update, close)
- View all candidate profiles
- Track job applications and update statuses
- Schedule and manage interviews
- Add and manage learning resources
- View placement statistics
- Audit logging for all admin actions

### Candidate Module
- Register and build profile (college, department, CGPA)
- Browse active job listings
- Apply for jobs with resume and cover letter
- Track application status
- Schedule interviews
- Access learning resources
- Track skill development
- Get job recommendations based on skills

### Common Features
- Secure JWT-based authentication
- Role-based access control (Admin, Candidate, HR)
- Real-time statistics and dashboards
- Responsive UI with Tailwind CSS
- RESTful API architecture
- TiDB database integration

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- TiDB Server
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with TiDB credentials
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

Access the application at: `http://localhost:3000`

---

## 📚 Documentation

- [Backend Setup](backend/README.md)
- [Frontend Setup](frontend/README.md)
- [Complete Setup Guide](SETUP_GUIDE.md)
- [API Reference](backend/README.md#api-endpoints)

---

## 🔗 Important Endpoints

### Public Routes
- `GET /api/public/jobs` - Browse jobs

### Admin Routes
- `GET /api/admin/candidates` - View all candidates
- `POST /api/admin/jobs` - Create job posting
- `PATCH /api/admin/applications/:id/status` - Update application status

### Candidate Routes
- `GET /api/candidate/profile` - Get profile
- `POST /api/candidate/jobs/:jobId/apply` - Apply for job
- `GET /api/candidate/applications` - View applications
- `GET /api/candidate/learning-resources` - Access learning content

---

## 🏗️ Architecture

```
Frontend (React)           Backend (Express)        Database (TiDB)
  ├── Admin Module   <---> ├── Admin Routes   <---> ├── Jobs
  ├── Candidate UI   <---> ├── Candidate Routes <---> ├── Candidates
  ├── Auth           <---> ├── Auth Routes     <---> ├── Applications
  └── Dashboard      <---> └── Public Routes   <---> └── Interviews
```

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Tailwind CSS, Zustand, React Router
- **Backend**: Node.js, Express.js, JWT
- **Database**: TiDB (MySQL Compatible)
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: Zustand
- **HTTP Client**: Axios

---

## ✨ Key Highlights

1. **Modular Design** - Separate admin and candidate modules
2. **Secure Authentication** - JWT-based protection
3. **Role-Based Access** - Admin vs Candidate permissions
4. **Comprehensive Database** - 13+ tables with relationships
5. **Responsive UI** - Mobile-friendly design
6. **RESTful API** - Clean and predictable endpoints
7. **Learning Management** - Skill development tracking
8. **Interview Scheduling** - Built-in interview management

---

## 📝 Test Credentials

### Admin Account
- Email: admin@example.com
- Password: admin123
- Role: Admin

### Candidate Account
- Email: candidate@example.com
- Password: candidate123
- Role: Candidate

(Create these by registering through the application)

---

## 📞 Support

For issues and questions:
1. Check the [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Review backend/README.md or frontend/README.md
3. Check TiDB documentation

---

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🚀**
