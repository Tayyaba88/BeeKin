import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './provider/AuthProvider';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
