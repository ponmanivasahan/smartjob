# Smart Job Portal Frontend

## Setup Instructions

### 1. Installation

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start the Development Server

```bash
npm start
```

The frontend will be available at: `http://localhost:3000`

## Features

### For Candidates
- User registration and login
- Profile management - College, Department, CGPA
- Browse and apply for jobs
- Track application status
- View interview schedules
- Access learning resources
- Track skill development

### For Admins
- Admin dashboard with statistics
- Manage job postings
- View all candidates
- Manage job applications
- Schedule and track interviews
- Add and manage learning resources
- Monitor placement statistics

## Folder Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── modules/        # Feature modules
│   │   ├── admin/      # Admin module
│   │   └── candidate/  # Candidate module
│   ├── store/          # Zustand stores
│   ├── utils/          # Utility functions
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
└── tailwind.config.js  # Tailwind configuration
```

## Pages

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/admin/dashboard` - Admin dashboard
- `/candidate/dashboard` - Candidate dashboard
