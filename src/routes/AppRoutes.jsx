import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInForm from '../components/Authentication/Signin/SignInForm';
import SignUpForm from '../components/Authentication/Signup/SignupForm';
import Dashboard from '../components/Dashboard/Dashboard';
import PrivateRoute from '../routes/PrivateRoute';
import JobDetail from '../components/jobs/JobDetail';
import NotFound from '../components/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/:id" element={<PrivateRoute element={<JobDetail />} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
