import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import './registration-view.scss'

export function RegistrationView(props) {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");
	const [usernameErr, setUsernameErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [emailErr, setEmailErr] = useState("");

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
		if (!email) {
			setEmailErr("Email Required");
			isReq = false;
		} else if (email.indexOf("@") === -1) {
			setEmailErr("Not a valid email address")
			isReq = false;
		}
		return isReq;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			/* Send a request to the server */
			axios
				.post("https://datenightmovies.herokuapp.com/users", {
					Username: username,
					Password: password,
					Email: email,
					Birthday: birthday
				})
				.then((res) => {
					const data = res.data;
					alert("Registration was successful, please login");
					window.open("/", "_self");
				})
				.catch((e) => {
					console.log(e);
					alert("unable to register");
				});
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
			<Col className="col-xs-8 col-sm-7 col-md-6 col-lg-5">
						<Card className="register">
						<Card.Body>
							<Card.Title className="text-center">Registration</Card.Title>
							<Form>
								<Form.Group className="mb-3" controlId="formUsername">
									<Form.Label>Username:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Username"
										onChange={(e) => setUsername(e.target.value)}
										required
										minLength="2"
									/>
									{usernameErr && <p>{usernameErr}</p>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="formPassword">
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type="password"
										placeholder="Must be 4 or more characters"
										onChange={(e) => setPassword(e.target.value)}
										required
										minLength="4"
									/>
									{passwordErr && <p>{passwordErr}</p>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="formEmail">
									<Form.Label>Email:</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter Email"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
									{emailErr && <p>{emailErr}</p>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Birthday:</Form.Label>
									<Form.Control
										type="birthday"
										placeholder="YYYY-MM-DD"
										onChange={(e) => setBirthday(e.target.value)}
									/>
								</Form.Group>

								<Button
									variant="outline-success"
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
