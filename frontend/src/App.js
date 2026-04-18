import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './modules/admin/pages/AdminDashboard';
import CandidateDashboard from './modules/candidate/pages/CandidateDashboard';
import useAuthStore from './store/authStore';

const AppRoutes = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showNavbar = user && location.pathname !== '/login' && !isAdminRoute;

  return (
    <>
      <Toaster position="top-right" />
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Candidate Routes */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute requiredRole="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
