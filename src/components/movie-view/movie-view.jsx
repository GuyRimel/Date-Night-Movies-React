import React from "react";
import PropTypes from "prop-types";

import { Row, Col, Button, Image } from "react-bootstrap";
import "./movie-view.scss";

import { Link } from "react-router-dom";

export default class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, handleFavorite } = this.props;

    return (
      <div md={8} className="movie-view">
        <Row className="m-1">
          <Col className="movie-poster mb-2">
            <Image src={movie.ImagePath} alt="movie image" rounded />
          </Col>
        </Row>
        <Row className="movie-title">
          <Col className="mb-2">
            <h3>{movie.Title}</h3>
          </Col>
        </Row>
        <Row className="movie-description">
          <Col>
            <div className="font-weight-bold">Description:</div>
            <div className="mb-2">{movie.Description}</div>
          </Col>
        </Row>
        <Row className="movie-director">
          <Col>
            <div className="font-weight-bold">Director:</div>
            <div className="mb-2">
              <Link to={`/directors/${movie.Director.Name}`}>
                {movie.Director.Name}
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="movie-genre">
          <Col>
            <div className="font-weight-bold">Genre: </div>
            <div className="mb-2">
              <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
            </div>
          </Col>
        </Row>
        <Col>
          <Button
            className="my-4 ml-2"
            variant="outline-primary"
            onClick={() => handleFavorite(movie._id, "add")}
          >
            Add to favorite ❤ Movies
          </Button>
          <Button
            className="mt-2 mr-2 mb-2"
            variant="warning"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Col>
      </div>
    );
  }
}

// propTypes will throw an error if the data isn't the right "shape"
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
