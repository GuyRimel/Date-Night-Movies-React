import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './movie-view.scss'

export function MovieView({movies}) {

	const selectMovie = () => {
		const { id } = useParams();
		return movies.find(m => m._id === id);
	};

	const movieId = selectMovie()._id;

	const addFav = (movieId) => {
		let token = localStorage.getItem("token");
		let url = `https://seeyouatmovies.herokuapp.com/users/${localStorage.getItem(
				"user")}/movies/${movieId}`;
			axios.post(url, null, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
        alert("Your favorite movies list has been updated");
        })
      .catch((error) => {
        console.log(error);
      });
	};

	return (
		<Row>
			{selectMovie().ImagePath === undefined ? (null) : (
			<Col className="d-flex  justify-content-evenly" md={6}>
				<Card>
					<Card.Img
						className="image"
						variant="top"
						src={selectMovie().ImagePath}
					/>
					<Card.Body>
						<Card.Title>{selectMovie().Title}</Card.Title>

						<Card.Text>Description: {selectMovie().Description}</Card.Text>

						<Card.Text>Director: {selectMovie().Director.Name}</Card.Text>

						<Link to={`/directors/${selectMovie().Director.Name}`}>
							<Button variant="outline-secondary">Director Info</Button>
						</Link>

						<Card.Text>Genre: {selectMovie().Genre.Name}</Card.Text>

						<Link to={`/genre/${selectMovie().Genre.Name}`}>
							<Button variant="outline-secondary">Genre Info</Button>
						</Link>

						<Link to={-1}>
							<Button className="float-end mx-3" variant="outline-secondary">
								Back
							</Button>
						</Link>

						<Button
							className="float-end"
							variant="outline-secondary"
							onClick={() => addFav(movieId)}
						>
							Add to Favorites
						</Button>
					</Card.Body>
				</Card>
				</Col>
				)}
		</Row>
	);
  }