import React, { useState }        from 'react';
import PropTypes                  from 'prop-types';
import axios                      from 'axios';

import { Row, Form, Button } from 'react-bootstrap';
import './login-view.scss';

export default function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // declare a hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;

    setUsernameErr('');
    setPasswordErr('');

    if(!username) {
      setUsernameErr('Username is required.');
      isReq = false;
    } else if(username.length < 3) {
      setUsernameErr('Username must be at least 3 characters long.');
      isReq = false;
    }
    if(!password) {
      setPasswordErr('Password is required.');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long.');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      // Send a request to the server for authentication
      axios.post('https://datenightmovies.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(err => {
        console.log('wrong username or password!!! ' + err);
      });
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    console.log('clicked Register');
    props.toggleRegister(false);
  };


  return (
    <div className='login-view'>
      <Row className='justify-content-center'>
        <h2 className='text-light text-center p-3 w-100'>Please Login</h2>
      </Row>
      <Row className='justify-content-center m-2'>
        <Form>
          <Form.Group controlId='formUsername' className='p-2'>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type='text'
              placeholder='Username Here'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {/* validation errors display here */}
            {usernameErr && <p className='alert alert-danger'>{usernameErr}</p>}
          </Form.Group>
          <Form.Group controlId='formPassword' className='p-2'>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type='password'
              placeholder='Password Here'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {/* validation errors display here */}
            {passwordErr && <p className='alert alert-danger'>{passwordErr}</p>}
          </Form.Group>
          <Button
            className='m-2'
            variant='success'
            type='submit'
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form>      
      </Row>
      <Row className='justify-content-center m-1'>
        <a
          className='text-muted'
          type='submit'
          onClick={handleRegisterClick}
        >
          Click here to register a new account.
        </a>
      </Row>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};