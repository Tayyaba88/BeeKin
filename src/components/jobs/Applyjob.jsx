import React, { useState } from 'react';
import axios from 'axios';

const ApplyJob = ({ jobId, appliedJobs, onApplySuccess, token }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const handleApply = async () => {
    try {
      if (!resumeFile) {
        setError('Resume not found');
        return;
      }

      const formData = new FormData();
      formData.append('resume', resumeFile);

      await axios.post(`http://localhost:5000/${jobId}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });

      onApplySuccess();
      setApplicationSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Please select a PDF file');
      setResumeFile(null);
    } else {
      setResumeFile(selectedFile);
      setError(null);
      setApplicationSuccess(false);
    }
  };

  const isAlreadyApplied = appliedJobs || false;

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} disabled={isAlreadyApplied} />
      <button onClick={handleApply} disabled={isAlreadyApplied}>
        {isAlreadyApplied ? <span>Applied</span> : <span>Apply</span>}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {applicationSuccess && <p style={{ color: 'green' }}>Application successful!</p>}
    </div>
  );
};

export default ApplyJob;
