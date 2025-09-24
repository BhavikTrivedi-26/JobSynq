import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Dashboard from './pages/dashboard';
import Analytics from './pages/analytics';
import ProfileSettings from './pages/profile-settings';
import Applications from './pages/applications';
import AddApplication from './pages/add-application';
import Login from './pages/login';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AddApplication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/add-application" element={<AddApplication />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
