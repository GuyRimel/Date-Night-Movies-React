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
    console.log('clicked Register' + username, password, email, birthday);
  };

  const toLogin = () => {
    props.onLoggedIn(null);
    props.toggleRegister(true);
    console.log('clicked Back to Login');
  }

  return (
    <div className="register-view">
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
        <a
          type="button"
          onClick={toLogin}
        >
          Click here to login with an existing account.
        </a>
      </form>
    </div>
  );
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
};