const BASE_URL = 'process.env.REACT_APP_BASE_URL';

export const createJob = async (jobData) => {
  const response = await fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response.json();
};

export const getAllJobs = async () => {
  const response = await fetch(`${BASE_URL}/`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response.json();
};
