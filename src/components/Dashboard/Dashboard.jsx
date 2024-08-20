import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ApplyJob from '../jobs/Applyjob';
import { useAuth } from '../../provider/AuthProvider';
import './Dashboard.css';
import handleError from '../../utils/errorHandler';

const Dashboard = () => {
  const { isAuthenticated, token, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState({ userDashboard: [], appliedJobs: [] });
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/dashboard', { headers: { "Authorization": `${token}` } });
      setDashboardData(response.data);
      setError(null);
    } catch (error) {
      setError(handleError(error, 'Failed to fetch dashboard data. Please try again later.'));
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        await fetchDashboardData();
      }
    };

    fetchData();
  }, [isAuthenticated, fetchDashboardData, token]);

  const handleApplySuccess = async () => {
    await fetchDashboardData();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2 className="dashboard-title">User Dashboard</h2>
        {isAuthenticated && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="jobs-container">
        <h3 className="jobs-title">All Jobs</h3>
        <ul className="jobs-list">
          {dashboardData.userDashboard.map((job) => (
            <li key={job.id} className="job-item">
              <div className="job-details">
                <h4>{job.title}</h4>
                <p>{job.description}</p>
                <p>Salary: ${job.salary}</p>
                <p>Location: {job.location}</p>
                {job.id && (
                  <Link to={`/${job.id}`} className="job-detail-link">
                    View Details
                  </Link>
                )}
              </div>
              <ApplyJob jobId={job.id} appliedJobs={job.appliedJobs} onApplySuccess={handleApplySuccess} token={token} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
