// SignUpForm.js

import React, { useState } from 'react';
import { signUp } from '../../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../provider/AuthProvider';
import Form from '../../../utils/Form';
import './SignupForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { login, errorHandler, Loader, error, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    Loader(true);
    try {
      const response = await signUp(formData);
      console.log('Sign-up successful:', response);
      const token = response.token;
      await login(token);
      navigate('/dashboard');

    } catch (error) {
      console.error('Sign-up failed:', error);
      if (error.response && error.response.status === 400) {
        errorHandler('Email is already registered. Please use a different email.');
      } else {
        errorHandler('Sign-up failed. Please try again later.');
      }
    } finally {
      Loader(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <Form
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        submitText="Sign Up"
        isLoading={isLoading}
      />
      <p className="login-message">
        Already have an account? <Link to="/signin" className="link">Sign in here</Link>.
      </p>
    </div>
  );
};

export default SignUpForm;
