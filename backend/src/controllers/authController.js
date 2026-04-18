const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Database tables are pre-created in MySQL.

exports.register = async (req, res) => {
  let connection;
  try {
    const { email, password, first_name, last_name, role, phone } = req.body;

    console.log('📝 Register attempt:', { email, role });

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    connection = await pool.getConnection();

    // Check if user exists
    const [existingUser] = await connection.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUser.length > 0) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await connection.query(
      'INSERT INTO users (email, password, first_name, last_name, role, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, first_name || '', last_name || '', role || 'candidate', phone || '']
    );

    const userId = result.insertId;
    console.log('✅ User created:', { userId, email, role });

    // If candidate, create profile
    if (role === 'candidate' || !role) {
      await connection.query(
        'INSERT INTO candidate_profiles (user_id) VALUES (?)',
        [userId]
      );
      console.log('✅ Candidate profile created:', userId);
    }

    // Generate token
    const token = jwt.sign(
      { id: userId, email, role: role || 'candidate' },
      process.env.JWT_SECRET || 'smartjob_portal_secret_key_2024',
      { expiresIn: '7d' }
    );

    console.log('✅ Token generated for:', email);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: userId, email, first_name, last_name, role: role || 'candidate' },
      token
    });
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  } finally {
    if (connection) connection.release();
  }
};

exports.login = async (req, res) => {
  let connection;
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', email);

    connection = await pool.getConnection();

    // Find user
    const [users] = await connection.query(
      'SELECT id, password, first_name, last_name, role FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Check password (supports legacy plain-text rows and upgrades them to bcrypt)
    let isPasswordValid = false;
    const isBcryptHash = typeof user.password === 'string' && user.password.startsWith('$2');

    if (isBcryptHash) {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      isPasswordValid = password === user.password;
      if (isPasswordValid) {
        const upgradedHash = await bcrypt.hash(password, 10);
        await connection.query('UPDATE users SET password = ? WHERE id = ?', [upgradedHash, user.id]);
      }
    }

    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email, role: user.role },
      process.env.JWT_SECRET || 'smartjob_portal_secret_key_2024',
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful:', email);

    res.json({
      message: 'Login successful',
      user: { id: user.id, email, first_name: user.first_name, last_name: user.last_name, role: user.role },
      token
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ error: 'Login failed', details: error.message });
  } finally {
    if (connection) connection.release();
  }
};

exports.getUserProfile = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [users] = await connection.query(
      'SELECT id, email, first_name, last_name, role, phone, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  } finally {
    if (connection) connection.release();
  }
};
