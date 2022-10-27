import React, { useState } from 'react';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isRegistered, setRegistrationTo ] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('(username: ' + username + ') (password: ' + password + ')');
    // send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const triggerRegistration = (e) => {
    console.log('registration clicked');
    props.triggerRegistration();
  }

  return (
    <div className="login-view">
      <h1>Login</h1>
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
      <div>Or, if you don't have an account, register 
        <a onClick={triggerRegistration}> HERE</a>
      </div>
    </div>
  );
}
