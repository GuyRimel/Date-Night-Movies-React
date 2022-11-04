import React, { useState }        from "react";
import axios                      from 'axios';
import PropTypes                  from "prop-types";

import { Row, Col, Form, Button } from 'react-bootstrap';
import "./registration-view.scss";

export function RegistrationView(props) {
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  // declare hooks for each input
  const [ nameErr, setNameErr ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');


  const validate = () => {
    let isReq = true;

    // every time validate is called, validation strings start empty
    setNameErr('');
    setUsernameErr('');
    setPasswordErr('');
    setEmailErr('');

    if(!name) {
      setNameErr('Name required.');
      isReq = false;
    }
    if(!username) {
      setUsernameErr('Username Required.');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long.');
      isReq = false;
    }
    if(!password) {
      setPasswordErr('Password required.');
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long.');
      isReq = false;
    }
    if(!email) {
      setEmailErr('Email required.');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('invalid email.');
      isReq = false;
    }
  
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq){
      axios.post('https://datenightmovies.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful! Please login :]');
        window.open('/', '_self'); // '_self' opens '/' in the current tab
      })
      .catch(err => {
        console.log(err);
        alert('Unable to register...');
      });
    }
  };

  const toLogin = () => {
    props.onLoggedIn(null);
    props.toggleRegister(true);
    console.log('clicked Back to Login');
  }

  return (
    <div className="register-view">
      <Row className='justify-content-center'>
        <h2 className='text-light text-center p-3 w-100'>Please Register</h2>
      </Row>
      <Row className='justify-content-center m-2'>
        <Form className='w-50'>
          <Form.Group controlId='formName' className='p-2'>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* validation errors display here */}
            {nameErr && <p className='alert alert-danger'>{nameErr}</p>}
          </Form.Group>

          <Form.Group controlId='formUsername' className='p-2'>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* validation errors display here */}
            {usernameErr && <p className='alert alert-danger'>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId='formPassword' className='p-2'>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* validation errors display here */}
            {passwordErr && <p className='alert alert-danger'>{passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId='formEmail' className='p-2'>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              {/* validation errors display here */}
              {emailErr && <p className='alert alert-danger'>{emailErr}</p>}
          </Form.Group>

          <Form.Group controlId='formBirthday' className='p-2'>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>

          <Button
            className='m-2'
            variant='warning'
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Form>
      </Row>
          <Row className='justify-content-center m-1'>
            <a
              className='text-muted'
              type="button"
              onClick={toLogin}
            >
              Click here to login with an existing account.
            </a>
          </Row>
    </div>
  );
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  Name: PropTypes.string.isRequired,
  Username: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired
};