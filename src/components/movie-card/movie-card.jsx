import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		return (
			<CardGroup>
				<Card className="my-1">
					<Card.Img variant="top" src={movie.ImagePath} />
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
						<Card.Text>{movie.Description}</Card.Text>
					</Card.Body>
					<Link to={`/movies/${movie._id}`}>
						<Button className="float-end mx-3" variant="outline-secondary">
							Open
						</Button>
					</Link>
				</Card>
			</CardGroup>
		);
	}
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })
};
