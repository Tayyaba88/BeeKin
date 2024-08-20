import React from 'react';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 Not Found</h1>
      <p>Oops! It seems like you've wandered into the unknown.</p>
      <p>Don't worry, even the lost numbers find their way back sometimes!</p>
      <img
        src="https://media.giphy.com/media/26gR1RvPptG9yajNe/giphy.gif"
        alt="Lost cat searching for the way back"
        style={{ maxWidth: '100%', maxHeight: '300px', margin: '20px' }}
      />
      <p>Go back to safety by clicking <a href="/signin">here</a>.</p>
    </div>
  );
};

export default NotFound;
