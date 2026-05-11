import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Portal from './pages/Portal';
import About from './pages/About';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Programs from './pages/Programs';
import Research from './pages/Research';
import News from './pages/News';
import Community from './pages/Community';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import FacultyPortal from './pages/FacultyPortal';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import SearchResults from './pages/SearchResults';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoadingScreen from './components/ui/LoadingScreen';
import CookieBanner from './components/ui/CookieBanner';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />;

  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg, #1e293b)',
              color: '#f8fafc',
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
        <CookieBanner />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="departments" element={<Departments />} />
            <Route path="departments/:id" element={<DepartmentDetail />} />
            <Route path="programs" element={<Programs />} />
            <Route path="research" element={<Research />} />
            <Route path="news" element={<News />} />
            <Route path="community" element={<Community />} />
            <Route path="contact" element={<Contact />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="500" element={<ServerError />} />

            {/* Protected Student Portal */}
            <Route path="portal" element={<ProtectedRoute><Portal /></ProtectedRoute>} />

            {/* Protected Admin/Faculty Routes */}
            <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="portal/staff" element={<ProtectedRoute allowedRoles={['staff', 'admin']}><FacultyPortal /></ProtectedRoute>} />

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
