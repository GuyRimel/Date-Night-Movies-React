import React, { useState }        from 'react';
import PropTypes                  from 'prop-types';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked Login' + username, password);
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    console.log('clicked Register');
    props.toggleRegister(false);
  };


  return (
    <div className='login-view'>
      <h2 className='text-light'>Please Login</h2>
      <Row className="justify-content-center">
        <Form>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
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
      <Row className='justify-content-center'>
        <a
          className='text-muted'
          type="submit"
          onClick={handleRegisterClick}
        >
          or, click here to register a new account.
        </a>

      </Row>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
};