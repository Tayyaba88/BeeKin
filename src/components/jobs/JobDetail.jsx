import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './JobDetail.css';

const JobDetail = () => {
  const [jobDetail, setJobDetail] = useState(null);
  const { id } = useParams();

  const fetchJobDetail = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${id}`);
      setJobDetail(response.data.job);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchJobDetail();
  }, [fetchJobDetail, id]);

  if (!jobDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="job-detail-container">
      <h2>{jobDetail.title}</h2>
      <p>{jobDetail.description}</p>
      <p>Salary: ${jobDetail.salary}</p>
      <p>Location: {jobDetail.location}</p>
    </div>
  );
};

export default JobDetail;
