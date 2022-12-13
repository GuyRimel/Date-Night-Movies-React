import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usernameErr, setUsernameErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");

	// validate user inputs
	const validate = () => {
		let isReq = true;
		if (!username) {
			setUsernameErr("Username Required");
			isReq = false;
		} else if (username.length < 2) {
			setUsernameErr("Username must be 2 characters long");
			isReq = false;
		}
		if (!password) {
			setPasswordErr("Password Required");
			isReq = false;
		} else if (password.length < 4) {
			setPasswordErr("Password must be 4 characters long");
			isReq = false;
		}
		return isReq;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			/* Send a request to the server for authentication */
			axios
				.post("https://datenightmovies.herokuapp.com/login", {
					Username: username,
					Password: password
				})
				.then((response) => {
					const data = response.data;
					props.onLoggedIn(data);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};
	return (
			<Container className="justify-content-center">
				<Row>
					<Col>
						<Card className="login mx-auto">
							<Card.Body>
								<Card.Title className="text-center">Login</Card.Title>
								<Form>
									<Form.Group className="mb-3" controlId="formUsername">
										<Form.Label>Username:</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter Username"
											onChange={(e) => setUsername(e.target.value)}
											required
										/>
										{usernameErr && <p>{usernameErr}</p>}
									</Form.Group>

									<Form.Group className="mb-3" controlId="formPassword">
										<Form.Label>Password:</Form.Label>
										<Form.Control
											type="password"
											placeholder="Enter Password"
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
										{passwordErr && <p>{passwordErr}</p>}
									</Form.Group>

									<Button
										className="btn"
										variant="outline-secondary"
										type="submit"
										onClick={handleSubmit}
									>
										Submit
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
	);
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
