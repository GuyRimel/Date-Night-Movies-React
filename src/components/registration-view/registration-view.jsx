import React, { useState }    from "react";
import PropTypes              from "prop-types";
import "./registration-view.scss";
import { Row, Col, Form, Button } from 'react-bootstrap';

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
      <Row className='justify-content-center'>
        <h2 className='text-light text-center p-3 w-100'>Please Register</h2>
      </Row>
      <Row className='justify-content-center m-2'>
        <Form>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              className='mb-3'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              className='mb-3'
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              className='mb-3'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              className='mb-3'
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button
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
};