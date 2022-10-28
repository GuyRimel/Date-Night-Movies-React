import React, { useState }    from "react";
import PropTypes              from "prop-types";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
  };

  const backToLogin = () => {
    props.onLoggedIn(null);
  }

  return (
    <div className="register-view">
      <h1>Date Night Movies!</h1>
      <h2>Register</h2>
      <form>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Birthday:</label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Register
        </button>
        <button
          type="button"
          onClick={backToLogin}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

RegistrationView.propTypes = {};