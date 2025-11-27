import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './components/properties/propertydetail';
import Aboutus from './pages/About'
import Contact from './pages/Contact'
import Login from './components/login';
import Signup from './components/signup';
import ForgotPassword from './components/forgetpassword';
import ResetPassword from './components/resetpassword';
import Footer from './components/footer';
import NotFoundPage from './components/Notfound';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import AIPropertyHub from './pages/Aiagent'
import StructuredData from './components/SEO/StructuredData';
import WebVitals from './components/WebVitals';
import PerformanceMonitor from './components/PerformanceMonitor';
import ErrorBoundary from './components/ErrorBoundary';
import NewsletterModal from './components/Newsletter/NewsletterModal';
import LiveChat from './components/LiveChat/LiveChat';
import Favorites from './pages/Favorites';
import TenantApplication from './pages/TenantApplication';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import 'react-toastify/dist/ReactToastify.css';


export const Backendurl = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <ErrorBoundary>
    <HelmetProvider>
    <AuthProvider>
    <FavoritesProvider>
    <Router>
      {/* Performance Monitoring */}
      <WebVitals />
      <PerformanceMonitor />
      
      {/* Base website structured data */}
      <StructuredData type="website" />
      <StructuredData type="organization" />
      
      {/* Newsletter Modal */}
      <NewsletterModal isOpen={showNewsletter} onClose={() => setShowNewsletter(false)} />
      
      {/* Live Chat */}
      <LiveChat />
      
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/" element={<Home setShowNewsletter={setShowNewsletter} />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/single/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ai-property-hub" element={<AIPropertyHub />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/application" element={<TenantApplication />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
    </FavoritesProvider>
    </AuthProvider>
    </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App