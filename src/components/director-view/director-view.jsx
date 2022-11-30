import React from "react";
import PropTypes from "prop-types";

// Import React Bootstrap Components
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// Import custom SCSS
import "./director-view.scss";
import { useHistory } from "react-router-dom";

export default DirectorView = ({ movie }) => {
  const history = useHistory();

    return (
      <Container>
        <Card className="dir-view">
          <Card.Header className="dir-view-header">Director</Card.Header>
          <Card.Body className="dir-view-title">{movie.Director.Name}</Card.Body>
          <Card.Body>{movie.Director.Bio}</Card.Body>
          <Card.Body>Birth: {movie.Director.Birth}</Card.Body>
          <Card.Footer>
            <Button
              className="dir-view-button"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }

DirectorView.proptypes = {
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Birthday: PropTypes.string,
    }).isRequired,
  };