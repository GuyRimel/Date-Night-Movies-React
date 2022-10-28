import React, { useState }  from 'react';
import PropTypes            from 'prop-types';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    props.toRegister();
  };


  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <label>Username: </label>
        <input
          type="text"
          onChange={e => setUsername(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
        <button
          type="submit"
          onClick={handleRegisterClick}
        >
          Register
        </button>
      </form>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toRegister: PropTypes.func.isRequired,
};