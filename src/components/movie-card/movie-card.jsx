import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
        <Card className="mt-4 movie-card">
          <Card.Img variant="top" src={movie.ImagePath} className="movie-card-img"/>
						<Container className="movie-card-container" fluid>
							<Row className="align-items-center w-100 p-0 m-0">
            <Card.Title className="col movie-card-title">{movie.Title}</Card.Title>
            <Link to={`/movies/${movie._id}`} className="col-md-4">
              <Button className="w-100 bg-green">
                Open
              </Button>
            </Link>
							</Row>
          <Card.Body className="movie-card-body">
            <Card.Text>{movie.Description}</Card.Text>

          </Card.Body>
						</Container>
        </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }),
};
