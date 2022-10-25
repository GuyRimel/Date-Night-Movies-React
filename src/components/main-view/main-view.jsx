import React          from 'react';
import axios          from 'axios';
import { MovieCard }  from '../movie-card/movie-card';
import { MovieView }  from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    // 'super()' initializes this component's state
    // it binds the 'this' keyword to 'React.Component'
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  componentDidMount() {
    axios.get('https://date-night-movies.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    
    if(movies.length === 0) {
      return <div className="main-view">Empty list! oh nooo!</div>;
    }

    return (
      <div className="main-view">
        {selectedMovie ? ( // true or false for the ternary
          <MovieView
            movie={selectedMovie}
            onBackClick={newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(movie) => {
              this.setSelectedMovie(movie);
            }}
          />
          ))
        )}
      </div>
    );
  } // end of 'render()' func
} // end of 'MainView' component
