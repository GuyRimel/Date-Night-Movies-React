import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "./genre-view.scss";

export function GenreView ({movies}) {

	const selectGenre = () => {
		const { name } = useParams();
		return movies.find((m) => m.Genre.Name === name);
	}

	return (
		<Col md={8}>
			<Card className="genre-view">
				<Card.Title>Genre</Card.Title>
				<Card.Subtitle>{selectGenre().Genre.Name}</Card.Subtitle>
				<Card.Text>{selectGenre().Genre.Description}</Card.Text>
				<Link to={-1}>
					<Button variant="outline-secondary">Back</Button>
				</Link>
			</Card>
		</Col>
	);
	}
