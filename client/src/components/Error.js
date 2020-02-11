import React from 'react';

function Error(props) {
  return (
    <div>
      <h1>Oh no! Something didn't go quite right. Try again?</h1>
      <button name="form" onClick={ props.setView }>Go Back</button>
    </div>
  );
};

export default Error;