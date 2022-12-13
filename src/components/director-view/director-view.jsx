import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "./director-view.scss";

export function DirectorView({movies}) {

	const selectDirector = () => {
		const { name } = useParams();
		return movies.find((m) => m.Director.Name === name);
	}

	return (
		<Row className="justify-content-center">
			<Col md={8}>
				<Card className="director-view mt-3 p-2">
					<Card.Title>Director</Card.Title>
					<Card.Subtitle>{selectDirector().Director.Name}</Card.Subtitle>
					<Card.Text>{selectDirector().Director.Bio}</Card.Text>
					<Link to={-1}>
						<Button variant="outline-secondary mt-2">Back</Button>
					</Link>
				</Card>
			</Col>
		</Row>
	);
}

export default DirectorView;
