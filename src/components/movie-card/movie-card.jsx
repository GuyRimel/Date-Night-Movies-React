import React      from "react";
import PropTypes  from "prop-types";
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div className="movie-card">
        <img src={movie.ImagePath} />
        <h3>{movie.Title}</h3>
        <p>{movie.Description}</p>
        <button
          onClick={() => onMovieClick(movie)}
        >
          More!
        </button>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};