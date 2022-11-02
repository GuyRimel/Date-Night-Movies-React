import React, { useState }        from 'react';
import PropTypes                  from 'prop-types';
import axios                      from 'axios';

import { Row, Form, Button } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
      console.log('no such user!!! ' + err);
    });
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
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              className='mb-3'
              type='text'
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              className='mb-3'
              type='password'
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant='warning'
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
  toggleRegister: PropTypes.func.isRequired,
};