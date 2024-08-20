import React, { useState } from 'react';
import { signIn } from '../../../api/api';
import { useAuth } from '../../../provider/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import Form from '../../../utils/Form';
import './SignInForm.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { login, errorHandler, Loader, error, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (formData) => {
    Loader(true);

    try {
      const response = await signIn(formData);

      const token = response.token;

      await login(token);

      navigate('/dashboard');
    } catch (error) {
      errorHandler('Incorrect email or password');
    } finally {
      Loader(false);
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <Form
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        submitText="Sign In"
        isLoading={isLoading}
      />
      <p className="signup-message">
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
};

export default SignInForm;
