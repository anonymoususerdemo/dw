import React from 'react';
import Error from './Error';

function Elections(props) {
  function handleResponse() {
    // to avoid "can't use map function on value null error" react throws
    if(!props.elections && !props.error) {
      return <p>Loading...</p>
    } else if(props.error) {
      return <Error setView={ props.setView } />
    };

    // if successful
    return props.elections.length === 0 ? <NoElection /> : props.elections.map(election => <Election election={ election }/> );
  };

  return (
    <div>
      <h1>Upcoming elections</h1>
      { handleResponse() }
    </div>
  );
};

function Election(props) {
  return (
    <div className="election">
      <h1>{ props.election.description }</h1>
    </div>
  );
};

function NoElection(props) {
  return (
    <div>
      <h1>There are currently no elections in your area.</h1>
      <button name="form" onClick={ props.setView }>Go back!</button>
    </div>
  );
};

export default Elections;