import React from 'react';

const Form = ({ formData, setFormData, onSubmit, submitText, isLoading }) => {
  const handleChange = (e) => {
    if (setFormData) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((field) => (
        <input
          key={field}
          type={field === 'password' ? 'password' : 'text'}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="custom-input"
          required
        />
      ))}
      <button type="submit" className="custom-button" disabled={isLoading}>
        {isLoading ? 'Submitting...' : submitText}
      </button>
    </form>
  );
}

export default Form;
