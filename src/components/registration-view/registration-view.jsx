import React, { useState } from 'react';
import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('(username: ' + username + ') (password: ' + password + ')');
    // send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onRegistered(username);
  };

  return (
    <div className="registration-view">
      <h1>Register</h1>
      <form>
        <label>
          Username: 
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password: 
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
