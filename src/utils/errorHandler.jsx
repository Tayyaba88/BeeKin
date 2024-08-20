const handleError = (error, customMessage = 'An error occurred.') => {
    if (error.response) {
      console.error('Response error:', error.response.data);
      return error.response.data.message || customMessage;
    } else if (error.request) {
      console.error('Request error:', error.request);
      return 'No response from the server. Please try again.';
    } else {
      console.error('Request setup error:', error.message);
      return customMessage;
    }
  };
  
  export default handleError;
  