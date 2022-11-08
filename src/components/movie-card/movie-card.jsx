import React from "react";
import PropTypes from "prop-types";

import { Card, Button } from "react-bootstrap";
import "./movie-card.scss";

export default class MovieCard extends React.Component {
  render() {
    const { movie, setSelectedMovie } = this.props;

    return (
      <Card className="movie-card m-2">
        <Card.Img src={movie.ImagePath} alt="card image" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button variant="success" onClick={() => setSelectedMovie(movie)}>
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
