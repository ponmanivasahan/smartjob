const express = require('express');
const db = require('../config/database');

const router = express.Router();

const ensureAdminTables = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS admin_internships (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      salary VARCHAR(255) NOT NULL,
      applications INT DEFAULT 0,
      status ENUM('active', 'closed') DEFAULT 'active',
      posted VARCHAR(100) DEFAULT 'Just now',
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS admin_candidates (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      roll_no VARCHAR(100) DEFAULT '',
      academic_year VARCHAR(50) DEFAULT '',
      department VARCHAR(255) DEFAULT '',
      semester VARCHAR(50) DEFAULT '',
      phone VARCHAR(50) DEFAULT '',
      college VARCHAR(255) DEFAULT '',
      cgpa DECIMAL(4,2) DEFAULT 0,
      skills TEXT,
      applications INT DEFAULT 0,
      status ENUM('Active', 'Shortlisted', 'Placed') DEFAULT 'Active',
      resume TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS admin_courses (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      level VARCHAR(100) DEFAULT 'Beginner',
      duration VARCHAR(100) DEFAULT '20 hours',
      enrolled INT DEFAULT 0,
      rating DECIMAL(3,1) DEFAULT 4.5,
      platform VARCHAR(255) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS admin_companies (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      visitingDate VARCHAR(100) NOT NULL,
      roles TEXT,
      campus VARCHAR(255) DEFAULT '',
      mode VARCHAR(100) DEFAULT 'On Campus',
      openings INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
};

const parseSkills = (skills) => {
  try {
    return JSON.parse(skills || '[]');
  } catch {
    return String(skills || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
};

const parseRoles = (roles) => {
  try {
    return JSON.parse(roles || '[]');
  } catch {
    return String(roles || '')
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);
  }
};

const normalizeCandidateStatus = (status) => {
  const value = String(status || '').trim().toLowerCase();
  if (value === 'shortlisted') {
    return 'Shortlisted';
  }
  if (value === 'placed' || value === 'selected' || value === 'accepted') {
    return 'Placed';
  }
  return 'Active';
};

router.use(async (req, res, next) => {
  await ensureAdminTables().catch((error) => {
    // Do not fail requests if table setup checks fail unexpectedly.
    console.error('⚠️ Admin table setup warning:', error.message);
  });
  next();
});

// Internships
router.get('/internships', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM admin_internships ORDER BY id DESC');
    res.json({ data: rows, count: rows.length });
  } catch (error) {
    next(error);
  }
});

router.post('/internships', async (req, res, next) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      applications = 0,
      status = 'active',
      posted = 'Just now',
      description = '',
    } = req.body;

    await db.query(
      'INSERT INTO admin_internships (title, company, location, salary, applications, status, posted, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, company, location, salary, applications, status, posted, description]
    );

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete('/internships/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM admin_internships WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.patch('/internships/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    await db.query('UPDATE admin_internships SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Candidates
router.get('/candidates', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM admin_candidates ORDER BY id DESC');
    const data = rows.map((row) => ({
      ...row,
      rollNo: row.roll_no,
      year: row.academic_year,
      skills: parseSkills(row.skills),
    }));
    res.json({ data, count: data.length });
  } catch (error) {
    next(error);
  }
});

router.post('/candidates', async (req, res, next) => {
  try {
    const {
      name,
      email,
      rollNo = '',
      roll_no = '',
      year = '',
      academicYear = '',
      academic_year = '',
      department = '',
      semester = '',
      sem = '',
      phone = '',
      college = '',
      cgpa = 0,
      skills = [],
      applications = 0,
      status = 'Active',
      resume = '',
    } = req.body;

    const resolvedRollNo = rollNo || roll_no;
    const resolvedYear = year || academicYear || academic_year;
    const resolvedSemester = semester || sem;
    const normalizedStatus = normalizeCandidateStatus(status);

    const normalizedSkills = JSON.stringify(
      Array.isArray(skills) ? skills : String(skills).split(',').map((s) => s.trim()).filter(Boolean)
    );

    try {
      await db.query(
        'INSERT INTO admin_candidates (name, email, roll_no, academic_year, department, semester, phone, college, cgpa, skills, applications, status, resume) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          name,
          email,
          resolvedRollNo,
          resolvedYear,
          department,
          resolvedSemester,
          phone,
          college,
          cgpa,
          normalizedSkills,
          applications,
          normalizedStatus,
          resume,
        ]
      );
    } catch (error) {
      // Backward compatibility for older admin_candidates schemas without academic columns.
      if (error.code === 'ER_BAD_FIELD_ERROR') {
        await db.query(
          'INSERT INTO admin_candidates (name, email, phone, college, cgpa, skills, applications, status, resume) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [name, email, phone, college, cgpa, normalizedSkills, applications, normalizedStatus, resume]
        );
      } else {
        throw error;
      }
    }

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete('/candidates/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM admin_candidates WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Courses
router.get('/courses', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM admin_courses ORDER BY id DESC');
    res.json({ data: rows, count: rows.length });
  } catch (error) {
    next(error);
  }
});

router.post('/courses', async (req, res, next) => {
  try {
    const { title, category, level = 'Beginner', duration = '20 hours', enrolled = 0, rating = 4.5, platform = '' } = req.body;
    await db.query(
      'INSERT INTO admin_courses (title, category, level, duration, enrolled, rating, platform) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, category, level, duration, enrolled, rating, platform]
    );
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete('/courses/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM admin_courses WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Companies
router.get('/companies', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM admin_companies ORDER BY id DESC');
    const data = rows.map((row) => ({ ...row, roles: parseRoles(row.roles) }));
    res.json({ data, count: data.length });
  } catch (error) {
    next(error);
  }
});

router.post('/companies', async (req, res, next) => {
  try {
    const { name, visitingDate, roles = [], campus = '', mode = 'On Campus', openings = 0 } = req.body;
    await db.query(
      'INSERT INTO admin_companies (name, visitingDate, roles, campus, mode, openings) VALUES (?, ?, ?, ?, ?, ?)',
      [name, visitingDate, JSON.stringify(Array.isArray(roles) ? roles : String(roles).split(',').map((r) => r.trim()).filter(Boolean)), campus, mode, openings]
    );
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete('/companies/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM admin_companies WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Backward compatibility aliases
router.get('/jobs', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM admin_internships ORDER BY id DESC');
    res.json({ data: rows, count: rows.length });
  } catch (error) {
    next(error);
  }
});

router.post('/jobs', async (req, res, next) => {
  try {
    const { job_title, company_name, location, description = '', salary_min, salary_max } = req.body;
    const salary = salary_min && salary_max ? `₹${salary_min} - ₹${salary_max}` : 'Not specified';
    await db.query(
      'INSERT INTO admin_internships (title, company, location, salary, applications, status, posted, description) VALUES (?, ?, ?, ?, 0, ?, ?, ?)',
      [job_title || 'Untitled Role', company_name || 'Unknown Company', location || 'Unknown Location', salary, 'active', 'Just now', description]
    );
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
