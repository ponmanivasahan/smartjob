-- ============================================
-- SmartJob Portal - Sample Data
-- Run this after schema.sql
-- ============================================

USE smartjob;

-- Insert sample admin user
-- Email: admin@smartjob.com
-- Password: Admin@123
INSERT INTO users (email, password, first_name, last_name, role, phone) VALUES
('admin@smartjob.com', '$2b$10$uXXed6.SBqTpqWjZbVKaeuSLDG7.b0zCJX7rBJYg3.2bO.qSf0uWm', 'Admin', 'User', 'admin', '+1-555-0001');

-- Insert sample candidate user
-- Email: candidate@smartjob.com
-- Password: Candidate@123
INSERT INTO users (email, password, first_name, last_name, role, phone) VALUES
('candidate@smartjob.com', '$2b$10$9yYxe5KqQFzlPwvl2v.z3OXgTPJoYuM6P8vn5P5Jxz8QaBQJ5P7I.', 'John', 'Doe', 'candidate', '+1-555-0002');

-- Create candidate profile for user 2
INSERT INTO candidate_profiles (user_id, bio, location, education, experience) VALUES
(2, 'Passionate software developer with 3 years of experience', 'San Francisco, CA', 'BS in Computer Science', 3);

-- Insert sample skills
INSERT INTO skills (name, category, description) VALUES
('Python', 'programming', 'Python programming language'),
('JavaScript', 'programming', 'JavaScript programming language'),
('React', 'frontend', 'React.js framework'),
('Node.js', 'backend', 'Node.js runtime'),
('MySQL', 'database', 'MySQL database'),
('REST API', 'backend', 'REST API development'),
('AWS', 'cloud', 'Amazon Web Services'),
('Docker', 'devops', 'Docker containerization');

-- ============================================
-- LOGIN CREDENTIALS
-- ============================================
-- ADMIN USER:
-- Email: admin@smartjob.com
-- Password: Admin@123
-- Role: admin

-- CANDIDATE USER:
-- Email: candidate@smartjob.com
-- Password: Candidate@123
-- Role: candidate
-- ============================================
