import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { logout, userUpdate } from "../../features/user-reducer";
import { useDispatch } from "react-redux";
import FavoriteMovies from "./favorite-movies";
import "./profile-view.scss";

export function ProfileView({ movies, user }) {
	const [profile, setProfile] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [usernameErr, setUsernameErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const dispatch = useDispatch();

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
			setEmailErr("Not a valid email address");
			isReq = false;
		}
		return isReq;
	};

	const getUser = () => {
		const token = localStorage.getItem("token");
		axios
			.get(`https://datenightmovies.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				const data = response.data;
				setProfile(data);
				setFavoriteMovies(data.FavoriteMovies);
				dispatch(userUpdate(data.Username));
				console.log(response.data);
			})
			.catch(function (e) {
				console.log(e);
			});
	};

	const deleteUser = () => {
		const token = localStorage.getItem("token");

		axios
				.delete(`https://datenightmovies.herokuapp.com/users/${user}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					alert("Your user account was deleted");
					localStorage.clear();
					window.open("/", "_self");
					dispatch(logout());
				})
				.catch((e) => console.log(e));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			/* Send a request to the server */
			axios
				.put(`https://datenightmovies.herokuapp.com/users/${user}`, {
					Username: username,
					Password: password,
					Email: email,
					Birthday: birthday,
				}, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
				.then((response) => {
					const data = response.data;
					console.log(data);
					getUser();
					alert("Profile is updated");
					window.open(`/users/${data.Username}`, "_self");
				})
				.catch((e) => {
					console.log(e);
					alert("Unable to update profile");
				});
		}
	};

	useEffect(() => {
			getUser();
	}, []);

	return (
		<>
			<Row>
				<Col xs={12} sm={4}>
					<Card>
						<Card.Body>
							<Card.Title>Profile</Card.Title>
							<p>Name: {profile.Username}</p>
							<p>Email: {profile.Email} </p>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} sm={8}>
					<Card>
						<Card.Body>
							<Card.Title className="text-center">Update Profile</Card.Title>
							<Form>
								<Form.Group className="mb-3" controlId="formUsername">
									<Form.Label>Username:</Form.Label>
									<Form.Control
										type="text"

										onChange={(e) => setUsername(e.target.value)}
										required
										placeholder="Enter a username"
									/>
									{usernameErr && <p>{usernameErr}</p>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="formPassword">
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type="password"
										onChange={(e) => setPassword(e.target.value)}
										required
										placeholder="Password must be 4 characters"
										minLength="4"
									/>
									{passwordErr && <p>{passwordErr}</p>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="formEmail">
									<Form.Label>Email:</Form.Label>
									<Form.Control
										type="email"
										onChange={(e) => setEmail(e.target.value)}
										required
										placeholder="Enter Email"
									/>
									{emailErr && <p>{emailErr}</p>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Birthday:</Form.Label>
									<Form.Control

										onChange={(e) => setBirthday(e.target.value)}
										placeholder="YYYY-MM-DD"
									/>
								</Form.Group>

								<Button
									variant="outline-danger"
									type="submit"
									onClick={deleteUser}
								>
									Delete Profile
								</Button>

								<Button
									className="float-end"
									variant="outline-secondary"
									type="submit"
									onClick={handleSubmit}
								>
									Submit Update
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row>
				<h5>Favorite Movies</h5>
				{movies.length === 0 ? (null) : (
				favoriteMovies.map((movieId) => {
					let movie = movies.find((m) => m._id === movieId);
					return (
						<Col
							className="d-flex align-content-stretch"
							xs={12}
							md={6}
							lg={4}
							key={movieId}
						>
							<FavoriteMovies movie={movie} />
						</Col>
					);
				})
					)}
			</Row>
		</>
	);
}

export default ProfileView;