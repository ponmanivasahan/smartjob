const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock user database
const users = [];

exports.register = async (req, res) => {
  try {
    const { email, password, first_name, last_name, role, phone } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      first_name: first_name || '',
      last_name: last_name || '',
      role: role || 'candidate',
      phone: phone || '',
      created_at: new Date()
    };

    users.push(newUser);

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, email, role: newUser.role },
      process.env.JWT_SECRET || 'smartjob_portal_secret_key_2024',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, email, first_name, last_name, role: newUser.role },
      token
    });
  } catch (error) {
    console.error('Registration error:', error.message, error.stack);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'smartjob_portal_secret_key_2024',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role },
      token
    });
  } catch (error) {
    console.error('Login error:', error.message, error.stack);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

exports.getUserProfile = (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Profile error:', error.message);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      phone: user.phone,
      created_at: user.created_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
